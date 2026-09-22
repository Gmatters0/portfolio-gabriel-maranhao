import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { FadeInStagger, FadeInStaggerItem } from "@/components/motion/fade-in";

export type NumberedListItem = {
  key: string;
  title: string;
  description: string;
  icon?: LucideIcon;
};

export function NumberedList({ items }: { items: NumberedListItem[] }) {
  return (
    <FadeInStagger className="flex flex-col">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <FadeInStaggerItem key={item.key}>
            <div className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 border-t border-border py-6 transition-[padding] duration-300 last:border-b hover:pl-2 sm:gap-8">
              <span className="pt-1 font-mono text-sm text-muted-faint transition-colors group-hover:text-[var(--accent-on-bg)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon className="size-4 shrink-0 text-[var(--accent-on-bg)]" />}
                  <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ArrowRight className="mt-1 size-4 shrink-0 text-muted-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent-on-bg)]" />
            </div>
          </FadeInStaggerItem>
        );
      })}
    </FadeInStagger>
  );
}
