import { flushSync } from "react-dom";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void>; finished: Promise<void> };
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Envolve uma troca de tema/accent na View Transitions API: a tela nova é revelada
 * com um wipe da direita pra esquerda (clip-path animado, ver globals.css), com um
 * brilho acompanhando a borda do wipe (drop-shadow no próprio pseudo-elemento da
 * transição — precisa estar ali porque a API renderiza os retratos antigo/novo numa
 * camada acima de qualquer elemento normal da página, então um <div> decorativo comum
 * ficaria escondido atrás deles). Cai para troca instantânea em navegadores sem
 * suporte à API ou com "prefers-reduced-motion".
 */
export function withThemeTransition(update: () => void) {
  const doc = document as ViewTransitionDocument;

  if (!doc.startViewTransition || prefersReducedMotion()) {
    update();
    return;
  }

  doc.startViewTransition(() => {
    flushSync(update);
  });
}
