"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { withThemeTransition } from "@/lib/view-transition";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Alternar tema claro/escuro"
      onClick={() =>
        withThemeTransition(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
      }
      className="text-foreground/70 hover:text-foreground"
    >
      {/* Ambos os ícones são renderizados; a classe `dark:` (aplicada pelo script
          anti-flash do next-themes antes da hidratação) decide qual aparece,
          evitando o padrão de "mounted flag" e o mismatch de hidratação. */}
      <Sun className="hidden size-4 dark:block" />
      <Moon className="size-4 dark:hidden" />
    </Button>
  );
}
