"use client";

import { useEffect, useRef, useState } from "react";

type Flight = { id: number; top: number; left: number };

// Estrela cadente que cruza o céu de vez em quando. Clicar nela "faz um pedido":
// aparece uma mensagem e a página rola até o contato.
export function ShootingStar() {
  const [flight, setFlight] = useState<Flight | null>(null);
  const [toast, setToast] = useState(false);
  const id = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = (delay: number) => {
      timer = setTimeout(() => {
        if (!document.hidden) {
          setFlight({ id: ++id.current, top: 8 + Math.random() * 28, left: 55 + Math.random() * 35 });
        }
        schedule(18000 + Math.random() * 22000);
      }, delay);
    };
    schedule(6000);
    return () => clearTimeout(timer);
  }, []);

  function wish() {
    setFlight(null);
    setToast(true);
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setToast(false), 4200);
  }

  return (
    <>
      {flight && (
        <button
          key={flight.id}
          type="button"
          onClick={wish}
          onAnimationEnd={() => setFlight(null)}
          aria-label="Estrela cadente: clique para fazer um pedido"
          className="fixed z-[70] flex h-6 w-28 cursor-pointer items-center justify-start p-0"
          style={{
            top: `${flight.top}vh`,
            left: `${flight.left}vw`,
            transform: "rotate(-24deg)",
            animation: "shooting-star 1.6s ease-in forwards",
          }}
        >
          <span className="block size-1.5 bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.8)]" />
          <span className="block h-px flex-1 bg-gradient-to-r from-white/80 to-transparent" />
        </button>
      )}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 border-2 border-border-strong bg-card px-5 py-3 font-mono text-xs tracking-wide text-foreground shadow-[4px_4px_0_0_rgba(0,0,0,0.55)]"
          style={{ animation: "fade-in 0.25s ease-out" }}
        >
          ✦ Pedido feito. Que tal começar por uma conversa?
        </div>
      )}
    </>
  );
}
