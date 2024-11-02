import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foodai",
  description: "Reducing Food Waste with AI-Powered Sourcing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
