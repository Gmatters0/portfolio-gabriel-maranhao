import { cn } from "@/lib/utils";

export type Sprite = { rows: string[]; palette: Record<string, string> };

// Converte um sprite em texto (1 caractere = 1 pixel) em SVG nítido, juntando pixels
// vizinhos da mesma cor em um único retângulo para manter o DOM leve.
function toRects(sprite: Sprite) {
  const rects: { x: number; y: number; w: number; fill: string }[] = [];
  sprite.rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      const fill = sprite.palette[ch];
      if (!fill) {
        x++;
        continue;
      }
      let w = 1;
      while (row[x + w] === ch) w++;
      rects.push({ x, y, w, fill });
      x += w;
    }
  });
  return rects;
}

function size(sprite: Sprite) {
  return { cols: Math.max(...sprite.rows.map((r) => r.length)), rows: sprite.rows.length };
}

// Um ou dois quadros; com dois, alternam em degrau (efeito "frame a frame" de pixel art).
export function PixelSprite({
  frames,
  scale = 4,
  fluid = false,
  frameDuration = 0.5,
  className,
  label,
}: {
  frames: Sprite[];
  scale?: number;
  fluid?: boolean;
  frameDuration?: number;
  className?: string;
  label?: string;
}) {
  const { cols, rows } = size(frames[0]);
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("relative inline-block", className)}
      style={fluid ? { width: "100%", aspectRatio: `${cols} / ${rows}` } : { width: cols * scale, height: rows * scale }}
    >
      {frames.map((sprite, i) => (
        <svg
          key={i}
          viewBox={`0 0 ${cols} ${rows}`}
          width="100%"
          height="100%"
          shapeRendering="crispEdges"
          className="absolute inset-0"
          style={
            frames.length > 1
              ? {
                  animation: `${i === 0 ? "flame-a" : "flame-b"} ${frameDuration}s steps(1) infinite`,
                }
              : undefined
          }
        >
          {toRects(sprite).map((r, k) => (
            <rect key={k} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
          ))}
        </svg>
      ))}
    </span>
  );
}
