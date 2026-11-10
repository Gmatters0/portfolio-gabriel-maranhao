import type { Metadata } from "next";
import { Philosopher, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AccentProvider, ACCENT_INIT_SCRIPT } from "@/components/providers/accent-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Loader } from "@/components/loader";
import { StarField } from "@/components/star-field";
import { ShootingStar } from "@/components/shooting-star";
import { QuantumMoon } from "@/components/quantum-moon";
import { TravelersMusic } from "@/components/travelers-music";
import { portfolio } from "@/data";

const hanken = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Substituta livre da ITC Serif Gothic (fonte de Outer Wilds, comercial). Com a licença web,
// troque por next/font/local apontando para os arquivos .woff2.
const display = Philosopher({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = "https://gabrielmaranhao.dev";
const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630 };
const title = `${portfolio.nome} | ${portfolio.headline}`;
const description = portfolio.resumo.slice(0, 155).trimEnd() + "…";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Gabriel Maranhão",
    "Gestão de Projetos",
    "Desenvolvedor de Software",
    "React",
    "TypeScript",
    "Goiânia",
  ],
  authors: [{ name: portfolio.nome }],
  // Mesmo conteúdo do portfólio clássico com outra roupagem: o clássico é a versão canônica.
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "profile",
    locale: "pt_BR",
    siteName: portfolio.nome,
    // com route groups, o app/opengraph-image.tsx da raiz não é herdado automaticamente
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${hanken.variable} ${display.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ACCENT_INIT_SCRIPT }} />
      </head>
      <body className="grain min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" forcedTheme="dark" disableTransitionOnChange>
          <AccentProvider>
            <StarField />
            <ShootingStar />
            <QuantumMoon />
            <TravelersMusic />
            <Loader />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </AccentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
