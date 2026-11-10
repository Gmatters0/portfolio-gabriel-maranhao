import { Grid } from "./draw";
import type { Sprite } from "./pixel-sprite";

// Fogueira original em resolução fina: pedras, troncos cruzados e chama em camadas.
// `sway` desloca a chama para gerar os dois quadros da animação.
function fire(sway: number): Sprite {
  const g = new Grid(26, 24);

  // chama: camadas de fora para dentro
  const layers: [number, string][] = [
    [1, "r"],
    [0.78, "o"],
    [0.52, "y"],
    [0.26, "w"],
  ];
  const cx = 13;
  const base = 17;
  const height = 15;
  for (const [scale, c] of layers) {
    const h = height * (0.55 + scale * 0.45);
    for (let fy = 0; fy < h * g.k; fy++) {
      const t = fy / (h * g.k);
      const half = 5.4 * scale * Math.sin(Math.min(1, (1 - t) * 1.25) * Math.PI * 0.62) * g.k;
      const off = sway * Math.sin(t * Math.PI * 1.4) * 1.6 * g.k * t;
      const fcx = cx * g.k + off;
      for (let fx = Math.floor(fcx - half); fx <= Math.ceil(fcx + half); fx++) g.dot(fx, base * g.k - fy, c);
    }
  }
  // brasa embaixo
  g.ell(13, 17, 6, 1.4, "o", "y", "r", "r");

  // troncos cruzados
  g.line(5, 18, 21, 21, "b", 2);
  g.line(5, 21, 21, 18, "b", 2);
  g.line(5, 18, 21, 21, "B", 1);
  g.ell(5, 19.5, 1.4, 1.4, "t", "t", "B", "B");
  g.ell(21, 19.5, 1.4, 1.4, "t", "t", "B", "B");

  // pedras
  for (const [x, y, r] of [
    [2, 21, 2],
    [7, 22.5, 1.8],
    [13, 23, 1.6],
    [19, 22.5, 1.8],
    [24, 21, 2],
  ] as const)
    g.ell(x, y, r, r * 0.8, "K", "L", "k", "k");

  return {
    rows: g.rows(),
    palette: {
      r: "#e8452c", o: "#ff8a2b", y: "#ffd86b", w: "#fff4c2",
      b: "#7a4a2e", B: "#3d2414", t: "#c59a6a",
      k: "#5d6684", K: "#7c84a0", L: "#a7aec4",
    },
  };
}

export const campfire: Sprite[] = [fire(1), fire(-1)];
