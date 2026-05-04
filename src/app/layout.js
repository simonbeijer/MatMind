import { Geist, Fraunces } from "next/font/google";
import "./globals.css";
import ConditionalFooter from "./components/conditionalFooter";
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: "--font-sans-raw",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-serif-raw",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata = {
  title: "MatMind — Train Smarter, Roll Better",
  description: "Personalized training, mindset, and recovery plans for Brazilian Jiu-Jitsu athletes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Commit+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${fraunces.variable} antialiased`}
      >
          {children}
          <ConditionalFooter />
          <Analytics />
      </body>
    </html>
  );
}
