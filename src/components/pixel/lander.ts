import { Grid } from "./draw";
import type { Sprite } from "./pixel-sprite";

// Nave original inspirada na Hearthian de Outer Wilds (não é o sprite oficial),
// desenhada por formas em resolução fina (ver Grid).
function build(glow: boolean): Sprite {
  const g = new Grid(64, 44);

  // pernas + sapatas
  g.line(30, 32, 20, 41, "R", 2);
  g.line(34, 32, 48, 41, "R", 2);
  g.line(33, 33, 30, 40, "r", 1);
  g.ell(19, 42, 4, 1, "O", "o", "p", "q");
  g.ell(49, 42, 4, 1, "O", "o", "p", "q");
  g.ell(30, 41, 3, 1, "O", "o", "p", "q");
  // antena parabólica
  g.line(14, 9, 22, 15, "O", 1);
  g.ell(11, 6, 6, 2, "O", "o", "p", "q");
  g.ell(11, 6.6, 3, 0.8, "p", "p", "p", "p");
  // tanques e esferas
  g.rect(36, 3, 41, 13, "G");
  g.rect(36, 3, 37, 13, "g");
  g.rect(38, 3, 38, 13, "w");
  g.ell(47, 9, 5, 5, "N", "m", "n", "M");
  g.ell(54, 17, 4, 4, "E", "f", "e", "F");
  // casco traseiro
  g.rect(40, 13, 52, 31, "C");
  g.rect(40, 13, 52, 14, "w");
  g.rect(40, 29, 52, 31, "c");
  g.rect(40, 22, 52, 22, "R");
  g.rect(40, 25, 52, 25, "R");
  g.rect(46, 13, 46, 31, "c");
  // casco central
  g.rect(22, 14, 40, 32, "C");
  g.rect(22, 14, 40, 15, "W");
  g.rect(22, 27, 40, 28, "c");
  g.rect(22, 29, 40, 32, "d");
  g.rect(21, 13, 22, 33, "r");
  g.rect(30, 14, 30, 32, "c");
  g.line(23, 20, 39, 20, "O");
  g.line(23, 26, 39, 26, "O");
  // portinholas
  g.ell(25, 17, 2, 1, "O", "o", "p", "q");
  g.ell(25, 29, 2, 1, "O", "o", "p", "q");
  g.ell(28, 23, 1, 1, "p", "p", "p", "p");
  // bocais e hub
  g.ell(58, 21, 4, 3, "G", "w", "g", "H");
  g.rect(53, 19, 56, 23, "G");
  g.rect(56, 18, 58, 24, "g");
  g.ell(45, 24, 3, 3, "G", "w", "g", "H");
  g.rect(42, 22, 45, 26, "g");
  g.rect(50, 27, 55, 33, "G");
  g.rect(50, 33, 56, 34, "g");
  g.rect(51, 27, 53, 30, "B");
  g.put(52, 31, "b");
  g.ell(50, 22, 5, 5, "w", "W", "c", "x");
  // domo dourado
  g.ell(14, 23, 12, 12, "O", "o", "p", "q");
  g.ell(10, 18, 3, 2, "o", "o", "o", "o");
  g.ell(9, 17, 1, 1, "y", "y", "y", "y");
  g.rect(23, 12, 24, 34, "r");

  if (glow) {
    g.ell(62, 21, 1.2, 1.6, "Y", "y", "Y", "Y");
    g.ell(44, 28, 1, 1, "Y", "y", "Y", "Y");
    g.ell(53, 36, 1.2, 1, "Y", "y", "Y", "Y");
  }

  return {
    rows: g.rows(),
    palette: {
      O: "#e0952b", o: "#ffd27a", p: "#c07a22", q: "#8f5414", y: "#fff1c8",
      C: "#e9d8c4", c: "#bfa98f", d: "#8f7d68", W: "#f5efe6", x: "#9aa3b0",
      R: "#c07a55", r: "#8a4f33",
      G: "#4a4f5c", g: "#2a2e38", w: "#cfd6df", H: "#3a3f4a",
      N: "#e0521c", n: "#b03a12", m: "#ff8a52", M: "#c94418",
      E: "#2f9e48", e: "#1f6e32", f: "#5fce78", F: "#26853c",
      B: "#2f6fd1", b: "#6fa3ff",
      Y: "#ffb03b",
    },
  };
}

export const lander: Sprite[] = [build(false), build(true)];
