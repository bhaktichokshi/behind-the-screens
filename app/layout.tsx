import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Bhakti Chokshi",
  description:
    "Bhakti Chokshi — a diary-desk mosaic of engineering, writing, art, karate, math, psychology, and practice.",
  metadataBase: new URL("https://behind-the-screens.dev"),
  openGraph: {
    title: "Bhakti Chokshi",
    description: "A diary-desk mosaic.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
