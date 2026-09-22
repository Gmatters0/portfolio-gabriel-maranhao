"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Carousel({
  slides,
  slideClassName,
  className,
}: {
  slides: ReactNode[];
  slideClassName?: string;
  className?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [snapCount, setSnapCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSnapCount(emblaApi.scrollSnapList().length);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza o estado inicial com a API do Embla (padrão oficial da lib), seguido da subscrição aos eventos
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={className}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex">
          {slides.map((slide, i) => (
            <div key={i} className={cn("min-w-0 shrink-0 grow-0 pl-4", slideClassName)}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir para o item ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === selectedIndex ? "w-6 bg-[var(--accent-on-bg)]" : "w-1.5 bg-border"
              )}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Anterior"
            disabled={!canScrollPrev}
            onClick={() => emblaApi?.scrollPrev()}
            className="flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-on-bg)] disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Próximo"
            disabled={!canScrollNext}
            onClick={() => emblaApi?.scrollNext()}
            className="flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-on-bg)] disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
