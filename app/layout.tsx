import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";


export const metadata: Metadata = {
  title: "Kivver - AI Powered Learning Platform",
  description: "Kivver is a AI powered Learning platform for Pakistani People to help them learn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-nunito antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
