import type { Metadata } from "next";
import "./globals.css";
import { AppThemeProvider } from "./providers";

export const metadata: Metadata = {
  title: "Outcome",
  description: "Is your AI actually moving your life forward?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}

