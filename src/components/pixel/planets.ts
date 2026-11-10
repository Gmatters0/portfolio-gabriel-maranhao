import { Grid, RES, shade } from "./draw";
import type { Sprite } from "./pixel-sprite";

// Corpos celestes do sistema de Outer Wilds redesenhados em pixel art própria (versões simplificadas,
// não os sprites oficiais). Desenhados em resolução RES× (raios em pixels reais = raio lógico × RES);
// quem exibe divide a escala por RES para manter o tamanho na tela.

const hash = (x: number, y: number) => ((x * 73856093) ^ (y * 19349663)) >>> 0;
const rnd = (x: number, y: number) => (hash(x, y) % 100) / 100;

// Disco em pixels reais. `paint` recebe a posição normalizada (u, v em -1..1) e um fator de luz `s`.
function disc(rLogical: number, padLogical: number, paint: (u: number, v: number, s: number, x: number, y: number) => string) {
  const r = rLogical * RES;
  const size = 2 * r + 1 + padLogical * RES * 2;
  const g = new Grid(size, size, 1);
  const c = (size - 1) / 2;
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const dx = x - c;
      const dy = y - c;
      if (dx * dx + dy * dy <= r * r + r * 0.4) g.put(x, y, paint(dx / r, dy / r, (dx + dy) / (r * 1.4), x, y));
    }
  return { g, c, r, size };
}

// 4 tons por material: luz, base, meio-tom, sombra.
const tone = (s: number, [l, b, m, d]: string) => (s < -0.5 ? l : s > 0.55 ? d : s > 0.22 ? m : b);

function sun(): Sprite {
  const { g, c, r } = disc(8, 3, (u, v, s) => {
    const w = Math.sin(u * 7 + v * 4) + Math.cos(v * 6 - u * 2.5);
    if (w > 1.15) return "r";
    if (w < -1) return "W";
    return tone(s, "wyoO");
  });
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2;
    const len = (k % 3 === 0 ? 5 : 3) + (k % 2);
    for (let i = 0; i < len; i++) {
      const rr = r + 1 + i;
      g.put(c + Math.cos(a) * rr, c + Math.sin(a) * rr, i > len - 2 ? "r" : "o");
      g.put(c + Math.cos(a + 0.03) * rr, c + Math.sin(a + 0.03) * rr, i > len - 2 ? "r" : "o");
    }
  }
  return { rows: g.rows(), palette: { W: "#fff6c4", w: "#ffeb8a", y: "#ffd34d", o: "#ff9a2b", O: "#e8752a", r: "#e8452c" } };
}

// Gêmeos da Ampulheta na diagonal: um no alto à esquerda, outro embaixo à direita, ponte de areia entre eles.
function hourglass(): Sprite {
  const g = new Grid(24, 24);
  g.line(7, 7, 16, 16, "s", 3);
  g.line(8, 7, 17, 16, "S", 1);
  g.ell(6.5, 6.5, 5.5, 5.5, "a", "A", "c", "b");
  g.ell(17, 17, 5.5, 5.5, "e", "E", "c", "f");
  return {
    rows: g.rows(),
    palette: { a: "#c06a3a", A: "#e3955f", b: "#9a512c", c: "#5e3020", e: "#a8552e", E: "#d07a48", f: "#843f22", s: "#d9b36a", S: "#f0d595" },
  };
}

// Gêmeo de Cinzas (areia) e Gêmeo de Brasa (rocha avermelhada), separados para o sistema binário.
function ashTwin(): Sprite {
  const { g } = disc(7, 1, (u, v, s, x, y) => {
    const dune = Math.sin(u * 9 + v * 3) > 0.6;
    return dune ? tone(s, "fFdb") : tone(s + (rnd(x, y) - 0.5) * 0.15, "FdbB");
  });
  return { rows: g.rows(), palette: { F: "#f3cf8c", f: "#ffe1a3", d: "#d9a95f", b: "#b8833f", B: "#7a5126" } };
}

function emberTwin(): Sprite {
  const { g } = disc(7, 1, (u, v, s, x, y) => {
    const crack = Math.abs(Math.sin(u * 8 - v * 5)) < 0.12;
    if (crack && s < 0.5) return "y";
    return tone(s + (rnd(x, y) - 0.5) * 0.2, "lomd");
  });
  return { rows: g.rows(), palette: { l: "#e8865a", o: "#c4532f", m: "#9a3d24", d: "#5e2418", y: "#ffb03b" } };
}

function timberHearth(): Sprite {
  const { g } = disc(7, 1, (u, v, s) => {
    const river = Math.abs(v * 7 - 2.4 * Math.sin((u * 7) / 2.1)) < 0.8 && u > -0.86 && u < 0.72;
    if (river) return s > 0.4 ? "B" : "b";
    if (v < -0.82 && Math.abs(u) < 0.45) return "k";
    return tone(s, "Lgmd");
  });
  return { rows: g.rows(), palette: { L: "#8fd27a", g: "#4c9a4a", m: "#3a7f3e", d: "#2a5c2e", b: "#4b8fd6", B: "#2f64a8", k: "#9aa3b8" } };
}

function attlerock(): Sprite {
  const { g } = disc(3, 1, (u, v, s) => (Math.hypot(u + 0.3, v + 0.3) < 0.28 || Math.hypot(u - 0.4, v - 0.35) < 0.22 ? "D" : tone(s, "lbmd")));
  return { rows: g.rows(), palette: { l: "#c3c7d1", b: "#a9adb8", m: "#8a8f9c", d: "#5f6370", D: "#6f7380" } };
}

function brittleHollow(): Sprite {
  const { g } = disc(7, 1, (u, v, s, x, y) => {
    const cell = 5;
    const crack = (x + (Math.floor(y / cell) % 2) * 3) % cell === 0 || y % cell === 0;
    if (v < -0.78) return s < 0 ? "W" : "w";
    if (crack) return "k";
    return tone(s, "lbmd");
  });
  return { rows: g.rows(), palette: { l: "#9aa2e0", b: "#7a82c4", m: "#636ba8", d: "#4a5186", k: "#343a66", w: "#c6d4f5", W: "#eef4ff" } };
}

function lantern(): Sprite {
  const { g } = disc(4, 1, (u, v, s, x, y) => (rnd(x, y) > 0.78 ? "y" : s > 0.35 ? (rnd(x, y) > 0.5 ? "k" : "K") : tone(s, "yorr")));
  return { rows: g.rows(), palette: { y: "#ffd86b", o: "#ff8a2b", r: "#e8452c", k: "#3a3a45", K: "#55505a" } };
}

function giantsDeep(): Sprite {
  const { g } = disc(8, 1, (u, v, s) => {
    const w = v * 8 + 1.8 * Math.sin(u * 4.4) + 0.9 * Math.sin(u * 10 + v * 8);
    const band = Math.floor(w / 2.2) % 2 === 0;
    if (s > 0.6) return band ? "D" : "E";
    if (s > 0.3) return band ? "m" : "M";
    return band ? "g" : "l";
  });
  return { rows: g.rows(), palette: { g: "#2f9e6e", l: "#7ee0b0", m: "#268a5e", M: "#5cc495", D: "#1b6b4c", E: "#238059" } };
}

function darkBramble(): Sprite {
  const { g, c, r } = disc(7, 4, (u, v, s, x, y) => {
    const vine = Math.abs(Math.sin(u * 6 + Math.cos(v * 5) * 2)) < 0.25;
    return vine ? tone(s, "TtbB") : rnd(x, y) > 0.6 ? "t" : tone(s, "tbdD");
  });
  for (let k = 0; k < 7; k++) {
    const a = (k / 7) * Math.PI * 2 + 0.3;
    for (let i = r - 2; i <= r + 8; i++) {
      const w = Math.max(1, Math.round((r + 8 - i) / 3));
      for (let j = -w; j <= w; j++) {
        const px = c + Math.cos(a) * i - Math.sin(a) * j;
        const py = c + Math.sin(a) * i + Math.cos(a) * j;
        g.put(px, py, j < 0 ? "j" : "i");
      }
    }
  }
  return { rows: g.rows(), palette: { T: "#a3794a", t: "#8a6238", b: "#6b4a2e", d: "#4a3220", D: "#33231a", B: "#3d2a1c", i: "#7fc7e8", j: "#cfeeff" } };
}

function interloper(): Sprite {
  const W = 36 * RES;
  const H = 16 * RES;
  const g = new Grid(W, H, 1);
  for (let x = 7 * RES; x < W - 1; x++) {
    const t = (x - 7 * RES) / (W - 8 * RES);
    const cy = (11 - t * 6) * RES;
    const hw = 3.2 * RES * (1 - t);
    for (let y = Math.floor(cy - hw); y <= Math.ceil(cy + hw); y++) {
      const d = Math.abs(y - cy) / Math.max(hw, 0.5);
      if (d <= 1) g.put(x, y, d < 0.35 && t < 0.75 ? "l" : t < 0.45 ? "m" : d < 0.6 ? "m" : "d");
    }
  }
  const nucleus = new Grid(10, 10);
  nucleus.ell(4.5, 4.5, 4, 4, "n", "w", "s", "N");
  nucleus.rows().forEach((row, y) =>
    [...row].forEach((ch, x) => ch !== "." && g.put(x + 1 * RES, y + 6.5 * RES, ch))
  );
  return { rows: g.rows(), palette: { n: "#5aa9e6", N: "#3f8bd0", w: "#d6f0ff", s: "#2a6fc9", l: "#8fdcff", m: "#4ab0f0", d: "#2a6fc9" } };
}

// Lua Quântica: disco lilás-acinzentado com névoa em espiral e partículas soltas ao redor.
function quantumMoon(): Sprite {
  const { g, c, r } = disc(6, 3, (u, v, s, x, y) => {
    const swirl = Math.sin(Math.atan2(v, u) * 3 + Math.hypot(u, v) * 7) > 0.55;
    return swirl ? (s < 0 ? "f" : "F") : tone(s + (rnd(x, y) - 0.5) * 0.2, "lbmd");
  });
  for (let k = 0; k < 26; k++) {
    const a = rnd(k, 7) * Math.PI * 2;
    const d = r + 2 + rnd(k, 3) * 5;
    g.put(c + Math.cos(a) * d, c + Math.sin(a) * d, rnd(k, 11) > 0.5 ? "f" : "F");
  }
  return { rows: g.rows(), palette: { l: "#d9d2ea", b: "#b3a9cc", m: "#8f86ad", d: "#625b80", f: "#f2eeff", F: "#a99bd6" } };
}

export const planets = {
  quantumMoon: quantumMoon(),
  sun: sun(),
  hourglass: hourglass(),
  ashTwin: ashTwin(),
  emberTwin: emberTwin(),
  timberHearth: timberHearth(),
  attlerock: attlerock(),
  brittleHollow: brittleHollow(),
  lantern: lantern(),
  giantsDeep: giantsDeep(),
  darkBramble: darkBramble(),
  interloper: interloper(),
};

export type PlanetKind = keyof typeof planets;
export { RES, shade };
