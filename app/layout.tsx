import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"


const karla = Karla({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ['latin'],
    variable: "--font-karla"
})
export const metadata: Metadata = {
  title: "PollPulse",
  description: "A modern voting system simplified",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={karla.className + ' h-screen overflow-hidden'}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
      {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
