import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AccentProvider } from "@/components/providers/accent-provider";
import { accentInitScript } from "@/lib/accent-init";
import { Header } from "@/components/classic/layout/header";
import { Footer } from "@/components/classic/layout/footer";
import { Loader } from "@/components/classic/loader";
import { portfolio } from "@/data";

const hanken = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
      className={`${hanken.variable} ${bricolage.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: accentInitScript("blue") }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AccentProvider>
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
