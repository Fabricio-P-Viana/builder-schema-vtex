import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "./ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "VTEX Schema Builder - Construtor Visual de Schemas JSON",
    template: "%s | VTEX Schema Builder"
  },
  description: "Ferramenta visual poderosa para criar e gerenciar schemas JSON do VTEX IO. Interface intuitiva, preview em tempo real, suporte para tipos complexos e campos condicionais.",
  keywords: [
    "VTEX",
    "VTEX IO",
    "JSON Schema",
    "Schema Builder",
    "Construtor de Schema",
    "VTEX Store Framework",
    "Componentes VTEX",
    "TypeScript",
    "React",
    "Next.js"
  ],
  authors: [
    {
      name: "Fabricio P. Viana",
      url: "https://github.com/Fabricio-P-Viana"
    }
  ],
  creator: "Fabricio P. Viana",
  publisher: "Fabricio P. Viana",
  metadataBase: new URL("https://builder-schema-vtex.vercel.app"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "VTEX Schema Builder - Construtor Visual de Schemas JSON",
    description: "Crie schemas JSON para VTEX IO de forma visual e intuitiva. Preview em tempo real, validação integrada e suporte para tipos complexos.",
    siteName: "VTEX Schema Builder",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
  },
  manifest: "/manifest.json",
  category: "technology",
  applicationName: "VTEX Schema Builder",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VTEX Schema Builder"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className="antialiased min-h-screen flex flex-col justify-between bg-background text-foreground"
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
