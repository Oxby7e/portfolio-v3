import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Siddhesh Dabholkar | Software Engineer",
  description: "Software Engineer specializing in building scalable, high-performance web applications and cross platform app.",
  keywords: ["Software Engineer", "React", "Next.js", "Node.js", "Full Stack Developer", "Siddhesh Dabholkar"],
  authors: [{ name: "Siddhesh Dabholkar" }],
  openGraph: {
    title: "Siddhesh Dabholkar | Software Engineer",
    description: "Software Engineer specializing in building scalable, high-performance web applications and cross platform app.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
