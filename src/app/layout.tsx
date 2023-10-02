import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { i18n, Locale } from "../../i18n.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inloggning- STRATO Webmail",
  description: "Strato webmail",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

interface ILang {
  lang: Locale;
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: ILang;
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
