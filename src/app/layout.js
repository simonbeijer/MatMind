import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalFooter from "./components/conditionalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MatMind - AI-Powered Jiu-Jitsu Development",
  description: "Personalized training, mindset, and recovery plans for Brazilian Jiu-Jitsu athletes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {children}
          <ConditionalFooter />
      </body>
    </html>
  );
}
