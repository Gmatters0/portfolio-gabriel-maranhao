"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

export type ConstellationItem = {
  key: string;
  title: string;
  description: string;
  icon?: ReactNode;
};

const XS = [14, 46, 18, 50, 24];
const STAR_Y = 34;

// Cada pilar é uma estrela; as linhas entre elas se desenham conforme o scroll e o hover
// acende a estrela e as ligações com as vizinhas.
export function PillarConstellation({ items }: { items: ConstellationItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const [pts, setPts] = useState<{ x: number; y: number }[]>([]);
  const [hover, setHover] = useState<number | null>(null);
  const [lit, setLit] = useState(1);
  const n = items.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 26 });
  useMotionValueEvent(p, "change", (v) => setLit(Math.min(n, Math.floor((v + 0.02) * (n - 1)) + 1)));

  useLayoutEffect(() => {
    const measure = () =>
      setPts(rows.current.map((r, i) => ({ x: XS[i % XS.length], y: (r?.offsetTop ?? 0) + STAR_Y })));
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [n]);

  const path = pts.map((q, i) => `${i ? "L" : "M"}${q.x} ${q.y}`).join(" ");

  return (
    <div ref={ref} className="relative">
      <svg aria-hidden className="pointer-events-none absolute top-0 left-0 h-full w-16 overflow-visible">
        {pts.length > 1 && (
          <>
            <path d={path} fill="none" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="2 4" />
            <motion.path d={path} fill="none" stroke="var(--accent-on-bg)" strokeWidth="1.5" style={{ pathLength: p }} />
            {hover !== null && hover > 0 && (
              <line x1={pts[hover - 1].x} y1={pts[hover - 1].y} x2={pts[hover].x} y2={pts[hover].y} stroke="var(--accent-on-bg)" strokeWidth="2.5" />
            )}
            {hover !== null && hover < n - 1 && (
              <line x1={pts[hover].x} y1={pts[hover].y} x2={pts[hover + 1].x} y2={pts[hover + 1].y} stroke="var(--accent-on-bg)" strokeWidth="2.5" />
            )}
          </>
        )}
        {pts.map((q, i) => {
          const on = i < lit || hover === i;
          const big = hover === i;
          const fill = on ? "var(--accent-on-bg)" : "var(--muted-faint)";
          return (
            <g
              key={i}
              style={{
                transform: `translate(${q.x}px, ${q.y}px) scale(${big ? 1.7 : on ? 1.15 : 0.9})`,
                transition: "transform 0.2s ease",
              }}
            >
              {on && <circle r="11" fill="var(--accent-on-bg)" opacity={big ? 0.3 : 0.14} />}
              <rect x="-2" y="-2" width="4" height="4" fill={fill} />
              <rect x="-1" y="-6" width="2" height="3" fill={fill} />
              <rect x="-1" y="3" width="2" height="3" fill={fill} />
              <rect x="-6" y="-1" width="3" height="2" fill={fill} />
              <rect x="3" y="-1" width="3" height="2" fill={fill} />
            </g>
          );
        })}
      </svg>

      {items.map((item, i) => {
        return (
          <motion.div
            key={item.key}
            ref={(el) => {
              rows.current[i] = el;
            }}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            tabIndex={0}
            className="border-t border-border py-6 pl-20 outline-none last:border-b focus-visible:bg-[var(--accent-soft)]"
          >
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs text-muted-faint">{String(i + 1).padStart(2, "0")}</span>
              {item.icon}
              <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">{item.title}</h3>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
