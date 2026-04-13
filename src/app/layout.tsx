import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RaiseLead - Gestao de Leads e Trafego Pago",
  description:
    "Sistema completo de gestao de leads com guia de trafego pago, templates por nicho e dashboard inteligente. Organize seus leads e aprenda a criar campanhas no Meta Ads.",
  keywords: [
    "leads",
    "trafego pago",
    "meta ads",
    "gestao de leads",
    "CRM",
    "marketing digital",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
