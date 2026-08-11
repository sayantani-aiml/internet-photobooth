import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Internet Photobooth",
  description: "Four photos. One tiny memory.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
