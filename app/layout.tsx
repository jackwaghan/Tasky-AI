import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";

const GeistSans = Geist({
  variable: "--font-geist-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
});
const GeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management",
  description: "Task Planner for the Teams and Developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistMono.variable} ${GeistSans.variable} overflow-hidden`}
      >
        <ThemeProvider
          attribute="class"
          themes={["light", "dark"]}
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
