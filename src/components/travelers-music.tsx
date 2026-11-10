"use client";

import { Music, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Música dos viajantes: cover sintetizado (Web Audio) de "Travelers", de Andrew Prahlow (Outer Wilds),
// transcrito da partitura "Traveller Themes". Como no jogo, começa com o banjo do Riebeck e cada
// viajante entra quando você visita a seção dele. Desligada por padrão.
const MEMBERS = [
  { id: "base", name: "Riebeck", inst: "o banjo" },
  { id: "sobre", name: "Gabbro", inst: "a flauta" },
  { id: "projetos", name: "Solanum", inst: "o piano" },
  { id: "experiencia", name: "Chert", inst: "a percussão" },
  { id: "servicos", name: "Feldspar", inst: "a gaita" },
  { id: "contato", name: "Esker", inst: "o apito" },
] as const;
type Layer = (typeof MEMBERS)[number]["id"];

const BPM = 92;
const STEP = 60 / BPM / 2; // colcheia
const LOOP = 16 * 8; // 16 compassos em 4/4, contados em colcheias
const MASTER = 0.2;

// [colcheia de início no loop, nota MIDI escrita, duração em colcheias]
type Note = [number, number, number];

// Riff do banjo (Riebeck), que o apito (Esker) dobra duas oitavas acima. Compassos ímpares:
// nota grave + G B G; pares alternam C B A G A B G e C B A G A B D B. Graves: C D E D.
const RIFF: Note[] = (() => {
  const roots = [60, 62, 64, 62];
  const out: Note[] = [];
  for (let bar = 0; bar < 16; bar++) {
    const s = bar * 8;
    if (bar % 2 === 0) {
      out.push([s, roots[(bar / 2) % 4], 2], [s + 2, 67, 2], [s + 4, 71, 3], [s + 7, 67, 1]);
    } else {
      out.push([s, 72, 1], [s + 1, 71, 1], [s + 2, 69, 1], [s + 3, 67, 1], [s + 4, 69, 1], [s + 5, 71, 1]);
      if (bar % 4 === 1) out.push([s + 6, 67, 2]);
      else out.push([s + 6, 74, 1], [s + 7, 71, 1]);
    }
  }
  return out;
})();

// Flauta baixo (Gabbro): notas longas que seguem o baixo, com G–A no compasso 8.
const FLUTE: Note[] = [
  [0, 60, 16], [16, 62, 16], [32, 64, 16], [48, 62, 8], [56, 67, 4], [60, 69, 4],
  [64, 60, 16], [80, 62, 16], [96, 64, 16], [112, 62, 16],
];

// Gaita (Feldspar), escrita uma oitava abaixo do som real.
const HARMONICA: Note[] = [
  [0, 74, 16], [16, 67, 16], [32, 64, 16], [48, 57, 16],
  [64, 54, 16], [80, 54, 16], [96, 54, 16], [112, 54, 16],
];

// Piano (Solanum): a melodia principal, com notas ligadas entre compassos.
const PIANO: Note[] = (() => {
  const bars: [number, number, number][][] = [
    [[0, 67, 3], [3, 62, 3], [6, 67, 3]],
    [[1, 62, 3], [4, 67, 2], [6, 69, 2]],
    [[0, 67, 3], [3, 66, 3], [6, 67, 3]],
    [[1, 66, 3], [4, 76, 2], [6, 74, 2]],
    [[0, 67, 3], [3, 62, 3], [6, 59, 3]],
    [[1, 67, 3], [4, 60, 2], [6, 59, 2]],
    [[0, 69, 3], [3, 71, 3], [6, 69, 3]],
    [[1, 71, 3], [4, 69, 1], [5, 71, 1], [6, 74, 1], [7, 71, 1]],
    [[0, 67, 3], [3, 62, 3], [6, 67, 3]],
    [[1, 62, 3], [4, 67, 2], [6, 69, 2]],
    [[0, 67, 3], [3, 69, 3], [6, 67, 3]],
    [[1, 69, 3], [4, 67, 2], [6, 66, 2]],
    [[0, 67, 3], [3, 62, 3], [6, 59, 3]],
    [[1, 67, 3], [4, 60, 2], [6, 59, 2]],
    [[0, 69, 3], [3, 71, 3], [6, 69, 3]],
    [[1, 71, 3], [4, 69, 1], [5, 71, 1], [6, 74, 1], [7, 71, 1]],
  ];
  return bars.flatMap((notes, bar) => notes.map(([s, m, l]): Note => [bar * 8 + s, m, l]));
})();

// Mão esquerda do piano: semínimas em C, C, D, D, E, E, D, D (duas vezes).
const PIANO_BASS: Note[] = [48, 48, 50, 50, 52, 52, 50, 50, 48, 48, 50, 50, 52, 52, 50, 50].flatMap((m, bar) =>
  [0, 2, 4, 6].map((s): Note => [bar * 8 + s, m, 2])
);

// Percussão (Chert): congas num ciclo de 4 compassos; tambor de moldura alterna 2 padrões.
const CONGA_A = [1, 2, 4, 6, 7];
const CONGA_B = [1, 5, 7];
const CONGAS = [CONGA_A, [], CONGA_A, CONGA_B];
const FRAME = [
  [0, 2, 3, 4, 5],
  [0, 3, 4, 6],
];

const byStep = (notes: Note[]) => {
  const map = new Map<number, Note[]>();
  for (const n of notes) map.set(n[0], [...(map.get(n[0]) ?? []), n]);
  return map;
};
const AT = {
  riff: byStep(RIFF),
  flute: byStep(FLUTE),
  harmonica: byStep(HARMONICA),
  piano: byStep(PIANO),
  pianoBass: byStep(PIANO_BASS),
};

const hz = (m: number) => 440 * 2 ** ((m - 69) / 12);

type Voice = {
  type: OscillatorType;
  freq: number;
  t: number;
  dur: number;
  gain: number;
  attack?: number;
  /** segura o volume e solta no fim (sopros); sem isso, decai como corda/tecla */
  sustain?: boolean;
  cutoff?: number;
  /** filtro que fecha depois do ataque, como uma corda beliscada */
  pluck?: boolean;
  vibrato?: number;
  glideFrom?: number;
};

function voice(ctx: AudioContext, out: AudioNode, v: Voice) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = v.type;
  if (v.glideFrom) {
    osc.frequency.setValueAtTime(v.glideFrom, v.t);
    osc.frequency.exponentialRampToValueAtTime(v.freq, v.t + 0.07);
  } else {
    osc.frequency.value = v.freq;
  }

  const a = v.attack ?? 0.008;
  const end = v.t + v.dur;
  g.gain.setValueAtTime(0, v.t);
  g.gain.linearRampToValueAtTime(v.gain, v.t + a);
  if (v.sustain) {
    g.gain.setValueAtTime(v.gain, Math.max(v.t + a, end - 0.18));
    g.gain.exponentialRampToValueAtTime(0.0001, end);
  } else {
    g.gain.exponentialRampToValueAtTime(0.0001, end);
  }

  let node: AudioNode = osc;
  if (v.cutoff || v.pluck) {
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    if (v.pluck) {
      f.frequency.setValueAtTime(4200, v.t);
      f.frequency.exponentialRampToValueAtTime(700, v.t + 0.22);
    } else {
      f.frequency.value = v.cutoff!;
    }
    osc.connect(f);
    node = f;
  }
  if (v.vibrato) {
    const lfo = ctx.createOscillator();
    const depth = ctx.createGain();
    lfo.frequency.value = 5;
    depth.gain.value = v.freq * v.vibrato;
    lfo.connect(depth).connect(osc.frequency);
    lfo.start(v.t);
    lfo.stop(end);
  }
  node.connect(g).connect(out);
  osc.start(v.t);
  osc.stop(end + 0.05);
}

function drum(ctx: AudioContext, out: AudioNode, buf: AudioBuffer, t: number, kind: "conga" | "frame") {
  const conga = kind === "conga";
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.frequency.setValueAtTime(conga ? 260 : 120, t);
  osc.frequency.exponentialRampToValueAtTime(conga ? 190 : 55, t + (conga ? 0.08 : 0.2));
  g.gain.setValueAtTime(conga ? 0.3 : 0.5, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + (conga ? 0.16 : 0.3));
  osc.connect(g).connect(out);
  osc.start(t);
  osc.stop(t + 0.35);

  // "tapa" da mão na pele
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = conga ? 3200 : 1400;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(conga ? 0.1 : 0.06, t);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  src.connect(f).connect(ng).connect(out);
  src.start(t);
  src.stop(t + 0.06);
}

let lastWhistle = 0;

function playStep(ctx: AudioContext, out: AudioNode, buf: AudioBuffer, layers: Set<Layer>, step: number, t: number) {
  const s = step % LOOP;
  const bar = Math.floor(s / 8);
  const beat = s % 8;
  const len = (n: number) => n * STEP;

  // Riebeck: banjo (uma oitava abaixo do escrito)
  for (const [, m, l] of AT.riff.get(s) ?? []) {
    voice(ctx, out, { type: "sawtooth", freq: hz(m - 12), t, dur: Math.max(0.45, len(l)), gain: 0.11, pluck: true });
    voice(ctx, out, { type: "triangle", freq: hz(m), t, dur: 0.3, gain: 0.04 });
  }

  if (layers.has("sobre")) {
    for (const [, m, l] of AT.flute.get(s) ?? [])
      voice(ctx, out, { type: "sine", freq: hz(m), t, dur: len(l), gain: 0.13, attack: 0.15, sustain: true, vibrato: 0.005 });
  }

  if (layers.has("projetos")) {
    for (const [, m, l] of AT.piano.get(s) ?? []) {
      voice(ctx, out, { type: "triangle", freq: hz(m), t, dur: Math.max(1.1, len(l) + 0.4), gain: 0.12 });
      voice(ctx, out, { type: "sine", freq: hz(m + 12), t, dur: 0.5, gain: 0.025 });
    }
    for (const [, m] of AT.pianoBass.get(s) ?? [])
      voice(ctx, out, { type: "triangle", freq: hz(m), t, dur: 0.9, gain: 0.14 });
  }

  if (layers.has("experiencia")) {
    if (CONGAS[bar % 4].includes(beat)) drum(ctx, out, buf, t, "conga");
    if (FRAME[bar % 2].includes(beat)) drum(ctx, out, buf, t, "frame");
  }

  if (layers.has("servicos")) {
    for (const [, m, l] of AT.harmonica.get(s) ?? [])
      voice(ctx, out, { type: "square", freq: hz(m + 12), t, dur: len(l), gain: 0.022, attack: 0.3, sustain: true, cutoff: 1600, vibrato: 0.004 });
  }

  // Esker: apito de êmbolo, o riff do banjo duas oitavas acima, deslizando entre as notas
  if (layers.has("contato")) {
    for (const [, m, l] of AT.riff.get(s) ?? []) {
      const freq = hz(m + 12);
      voice(ctx, out, { type: "sine", freq, t, dur: len(l) * 0.95, gain: 0.04, attack: 0.02, sustain: true, glideFrom: lastWhistle || undefined });
      lastWhistle = freq;
    }
  }
}

export function TravelersMusic() {
  const [on, setOn] = useState(false);
  const [unlocked, setUnlocked] = useState<Layer[]>(["base"]);
  const [news, setNews] = useState<string | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const bufRef = useRef<AudioBuffer | null>(null);
  const layersRef = useRef(new Set<Layer>(["base"]));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepRef = useRef(0);
  const nextRef = useRef(0);
  const onRef = useRef(false);

  // Cada seção visitada desbloqueia um viajante (mesmo com o som desligado).
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id as Layer;
          if (!e.isIntersecting || layersRef.current.has(id)) continue;
          layersRef.current.add(id);
          setUnlocked([...layersRef.current]);
          const m = MEMBERS.find((x) => x.id === id);
          if (m && onRef.current) setNews(`${m.name} entrou com ${m.inst}`);
        }
      },
      // faixa no meio da tela: funciona até para seções mais altas que a viewport
      { rootMargin: "-40% 0px -40% 0px" }
    );
    for (const m of MEMBERS) {
      const el = document.getElementById(m.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!news) return;
    const t = setTimeout(() => setNews(null), 3200);
    return () => clearTimeout(t);
  }, [news]);

  useEffect(() => {
    const onVis = () => {
      const ctx = ctxRef.current;
      if (!ctx || !onRef.current) return;
      if (document.hidden) void ctx.suspend();
      else void ctx.resume();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      if (timerRef.current) clearInterval(timerRef.current);
      void ctxRef.current?.close();
    };
  }, []);

  const start = async () => {
    if (!ctxRef.current) {
      const ctx = new AudioContext();
      const comp = ctx.createDynamicsCompressor();
      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(comp).connect(ctx.destination);
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      ctxRef.current = ctx;
      masterRef.current = master;
      bufRef.current = buf;
    }
    const ctx = ctxRef.current;
    const master = masterRef.current!;
    await ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(MASTER, ctx.currentTime, 0.3);
    stepRef.current = 0;
    nextRef.current = ctx.currentTime + 0.1;
    timerRef.current = setInterval(() => {
      while (nextRef.current < ctx.currentTime + 0.15) {
        playStep(ctx, master, bufRef.current!, layersRef.current, stepRef.current, nextRef.current);
        stepRef.current++;
        nextRef.current += STEP;
      }
    }, 25);
  };

  const stop = () => {
    const ctx = ctxRef.current;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    if (!ctx || !masterRef.current) return;
    masterRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
    setTimeout(() => {
      if (!onRef.current) void ctx.suspend();
    }, 700);
  };

  const toggle = () => {
    const next = !on;
    onRef.current = next;
    setOn(next);
    if (next) void start();
    else stop();
  };

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2">
      <p
        aria-live="polite"
        className={cn(
          "border-2 border-border-strong bg-card px-3 py-1.5 font-mono text-[10px] tracking-wide text-foreground uppercase transition-opacity",
          news ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {news ?? ""}
      </p>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? "Desligar a música dos viajantes" : "Tocar a música dos viajantes"}
        title={`Viajantes: ${unlocked.length}/${MEMBERS.length} reunidos. Visite as seções para chamar os outros.`}
        className={cn(
          "flex items-center gap-2 border-2 bg-card px-3 py-2 font-mono text-[10px] tracking-widest uppercase shadow-[3px_3px_0_0_rgba(0,0,0,0.55)] transition-colors",
          on ? "border-[#ff9a2b] text-[#ffb35c]" : "border-border-strong text-muted-foreground hover:text-foreground"
        )}
      >
        {on ? <Music className="size-3.5" /> : <VolumeX className="size-3.5" />}
        Viajantes
        <span className="flex gap-0.5" aria-hidden>
          {MEMBERS.map((m) => (
            <span
              key={m.id}
              className={cn(
                "size-1.5",
                unlocked.includes(m.id) ? (on ? "bg-[#ff9a2b]" : "bg-muted-foreground") : "bg-border-strong"
              )}
            />
          ))}
        </span>
      </button>
    </div>
  );
}
