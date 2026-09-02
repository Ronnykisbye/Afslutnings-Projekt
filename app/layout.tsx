import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mit AU-afgangsprojekt",
  description: "Privat projektværksted til AU-afgangsprojektet i informationsteknologi.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
