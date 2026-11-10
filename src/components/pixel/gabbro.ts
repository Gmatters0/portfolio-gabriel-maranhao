import { Grid } from "./draw";
import type { Sprite } from "./pixel-sprite";

// Hearthian descansando na rede: pixel art original inspirada no Gabbro de Outer Wilds.
const g = new Grid(42, 24);

// postes
g.rect(1, 3, 2, 23, "p");
g.rect(1, 3, 1, 23, "P");
g.rect(39, 3, 40, 23, "p");
g.rect(39, 3, 39, 23, "P");
g.rect(0, 22, 3, 23, "p");
g.rect(38, 22, 41, 23, "p");

// rede (pano com curva)
const sag = (x: number) => 7 + Math.round(8 * Math.sin(((x - 3) / 36) * Math.PI));
for (let x = 3; x <= 38; x++) {
  g.put(x, sag(x), "r");
  g.put(x, sag(x) + 1, "t");
  g.put(x, sag(x) + 2, "T");
}
g.line(3, 4, 3, 7, "r");
g.line(38, 4, 38, 7, "r");

// corpo
g.ell(26, 12, 8, 3.2, "o", "o", "O"); // tronco
g.line(33, 12, 37, 9, "o", 2); // pernas
g.rect(36, 7, 38, 8, "s"); // pés
g.ell(15, 10, 4, 4, "s", "q", "S"); // cabeça
g.put(13, 9, "k");
g.put(13, 10, "k");
g.put(16, 9, "k");
g.put(16, 10, "k");
g.put(14, 12, "S");
g.line(11, 8, 18, 5, "o", 1); // braço atrás da cabeça
g.line(18, 10, 25, 10, "w", 1); // flauta

export const gabbro: Sprite = {
  rows: g.rows(),
  palette: {
    p: "#6b4a2e",
    P: "#8f6a45",
    r: "#e0c58a",
    t: "#3a7f86",
    T: "#2a5f66",
    o: "#e0852b",
    O: "#a8581a",
    s: "#7cc07a",
    q: "#a7dfa5",
    S: "#4f8f58",
    k: "#161a2e",
    w: "#cfd6df",
  },
};
