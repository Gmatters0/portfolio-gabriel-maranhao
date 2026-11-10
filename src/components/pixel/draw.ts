// Mini-ferramenta para desenhar pixel art por formas (retângulos, elipses, linhas) em código.
// As coordenadas são "lógicas"; `k` define quantos pixels reais cada unidade tem, então as
// formas são rasterizadas em resolução k× mais fina (curvas e sombras mais suaves).
export const RES = 2;

export class Grid {
  cells: string[][];
  readonly W: number;
  readonly H: number;

  constructor(
    public w: number,
    public h: number,
    public k = RES
  ) {
    this.W = w * k;
    this.H = h * k;
    this.cells = Array.from({ length: this.H }, () => Array(this.W).fill("."));
  }

  private set(x: number, y: number, c: string) {
    x = Math.round(x);
    y = Math.round(y);
    if (x >= 0 && x < this.W && y >= 0 && y < this.H) this.cells[y][x] = c;
  }

  /** Um "pixel lógico" (bloco k×k). */
  put(x: number, y: number, c: string) {
    const x0 = Math.round(x) * this.k;
    const y0 = Math.round(y) * this.k;
    for (let j = 0; j < this.k; j++) for (let i = 0; i < this.k; i++) this.set(x0 + i, y0 + j, c);
  }

  /** Um pixel real, em coordenadas finas. */
  dot(fx: number, fy: number, c: string) {
    this.set(fx, fy, c);
  }

  rect(x0: number, y0: number, x1: number, y1: number, c: string) {
    for (let y = y0 * this.k; y < (y1 + 1) * this.k; y++)
      for (let x = x0 * this.k; x < (x1 + 1) * this.k; x++) this.set(x, y, c);
  }

  /** Elipse com 4 tons: luz (canto superior esquerdo), base, meio-tom e sombra. */
  ell(cx: number, cy: number, rx: number, ry: number, base: string, light = base, dark = base, mid = base) {
    const k = this.k;
    const fcx = cx * k + (k - 1) / 2;
    const fcy = cy * k + (k - 1) / 2;
    const frx = rx * k + (k - 1) / 2;
    const fry = ry * k + (k - 1) / 2;
    for (let y = Math.floor(fcy - fry); y <= Math.ceil(fcy + fry); y++)
      for (let x = Math.floor(fcx - frx); x <= Math.ceil(fcx + frx); x++) {
        const dx = (x - fcx) / frx;
        const dy = (y - fcy) / fry;
        if (dx * dx + dy * dy <= 1) {
          const s = dx * 0.7 + dy * 0.7;
          this.set(x, y, s < -0.5 ? light : s > 0.62 ? dark : s > 0.3 ? mid : base);
        }
      }
  }

  line(x0: number, y0: number, x1: number, y1: number, c: string, t = 1) {
    const k = this.k;
    const fx0 = x0 * k;
    const fy0 = y0 * k;
    const fx1 = x1 * k;
    const fy1 = y1 * k;
    const n = Math.max(Math.abs(fx1 - fx0), Math.abs(fy1 - fy0), 1);
    for (let i = 0; i <= n; i++) {
      const x = fx0 + ((fx1 - fx0) * i) / n;
      const y = fy0 + ((fy1 - fy0) * i) / n;
      for (let a = 0; a < t * k; a++) for (let b = 0; b < k; b++) this.set(x + b, y + a, c);
    }
  }

  rows() {
    return this.cells.map((r) => r.join(""));
  }
}

export function shade(hex: string, f: number) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number) => Math.max(0, Math.min(255, Math.round(v * f)));
  return `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => ch(v).toString(16).padStart(2, "0")).join("")}`;
}
