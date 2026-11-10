import type { MouseEvent } from "react";

// Canhão de Sondas: o botão dá um "coice", uma sonda luminosa é disparada para baixo
// e a página viaja até o alvo. Com "reduzir movimento", só rola até o alvo.
export function launchProbe(e: MouseEvent<HTMLElement>, targetId: string) {
  const target = document.getElementById(targetId);
  if (!target) return;
  e.preventDefault();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.scrollIntoView();
    return;
  }

  const btn = e.currentTarget;
  const r = btn.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;

  btn.animate(
    [{ transform: "translateY(0)" }, { transform: "translateY(-5px)" }, { transform: "translateY(0)" }],
    { duration: 260, easing: "ease-out" }
  );

  const flash = document.createElement("div");
  flash.setAttribute("aria-hidden", "true");
  flash.style.cssText = `position:fixed;left:${x - 30}px;top:${y - 30}px;width:60px;height:60px;border-radius:9999px;border:2px solid #ffb03b;z-index:90;pointer-events:none`;
  document.body.appendChild(flash);
  flash
    .animate([{ transform: "scale(0.3)", opacity: 1 }, { transform: "scale(1.8)", opacity: 0 }], { duration: 450, easing: "ease-out" })
    .finished.finally(() => flash.remove());

  const probe = document.createElement("div");
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText = `position:fixed;left:${x - 4}px;top:${y - 4}px;width:8px;height:8px;background:#ffd86b;z-index:90;pointer-events:none;box-shadow:0 0 12px 4px #ff9a2b, 0 -10px 0 -1px rgba(255,154,43,.7), 0 -20px 0 -2px rgba(255,154,43,.4), 0 -30px 0 -3px rgba(255,154,43,.2)`;
  document.body.appendChild(probe);
  probe
    .animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        { transform: `translate(${window.innerWidth * 0.12}px, ${window.innerHeight}px) scale(0.6)`, opacity: 0.9 },
      ],
      { duration: 650, easing: "cubic-bezier(0.5, 0, 0.9, 0.6)" }
    )
    .finished.finally(() => probe.remove());

  setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 320);
}
