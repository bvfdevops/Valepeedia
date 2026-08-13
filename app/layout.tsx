import type { Metadata } from "next";
import { Jost, Playfair_Display } from "next/font/google";

import { InlineScript } from "@/components/ui/inline-script";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const DAISY_FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Cg fill='%23fdf9f6' stroke='%23e9c9c8' stroke-width='2'%3E%3Cellipse cx='30' cy='14' rx='6' ry='13'/%3E%3Cellipse cx='30' cy='14' rx='6' ry='13' transform='rotate(45 30 30)'/%3E%3Cellipse cx='30' cy='14' rx='6' ry='13' transform='rotate(90 30 30)'/%3E%3Cellipse cx='30' cy='14' rx='6' ry='13' transform='rotate(135 30 30)'/%3E%3Cellipse cx='30' cy='14' rx='6' ry='13' transform='rotate(180 30 30)'/%3E%3Cellipse cx='30' cy='14' rx='6' ry='13' transform='rotate(225 30 30)'/%3E%3Cellipse cx='30' cy='14' rx='6' ry='13' transform='rotate(270 30 30)'/%3E%3Cellipse cx='30' cy='14' rx='6' ry='13' transform='rotate(315 30 30)'/%3E%3C/g%3E%3Ccircle cx='30' cy='30' r='7' fill='%23d9a875'/%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: {
    default: "Valepeedia — Reportajes y crónicas",
    template: "%s — Valepeedia",
  },
  description:
    "Portafolio de reportajes y crónicas de Valepeedia: investigación, derechos humanos, medio ambiente, sociedad y cultura.",
  icons: { icon: DAISY_FAVICON },
};

const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem('valepeedia-theme') || 'minimalista';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-theme="minimalista"
      className={`${playfair.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <body>
        <InlineScript html={themeInitScript} />
        {children}
      </body>
    </html>
  );
}
