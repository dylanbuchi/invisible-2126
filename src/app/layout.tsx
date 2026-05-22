import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INVISIBLE // 2126",
  description:
    "Identity redacted. Work preserved. A classified future archive of anonymous human-built software systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
