// Fica fora do accent-provider ("use client") para que os root layouts (server) possam chamá-lo.
export const ACCENT_STORAGE_KEY = "portfolio-accent";

// Script injetado antes da hidratação para aplicar o accent salvo sem "flash" de cor errada.
// Cada modo do site tem seu accent padrão (o clássico é azul; a Expedição, laranja).
export const accentInitScript = (fallback: "blue" | "green" | "orange" | "red") =>
  `(function(){try{var a=localStorage.getItem("${ACCENT_STORAGE_KEY}");var v=(a==="blue"||a==="green"||a==="orange"||a==="red")?a:"${fallback}";document.documentElement.setAttribute("data-accent",v);}catch(e){}})();`;
