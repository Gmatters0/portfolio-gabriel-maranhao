import { FadeIn } from "@/components/motion/fade-in";
import { TypingText } from "@/components/typing-text";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <FadeIn className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <TypingText
        text={eyebrow}
        className="font-mono text-xs font-medium tracking-widest text-[var(--accent-on-bg)] uppercase"
      />
      <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </FadeIn>
  );
}
