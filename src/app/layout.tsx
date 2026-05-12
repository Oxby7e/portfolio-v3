import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayan Modak | Software Engineer",
  description: "Software Engineer specializing in building scalable, high-performance web applications and cross platform app.",
  keywords: ["Software Engineer", "React", "Next.js", "Node.js", "Full Stack Developer", "Ayan Modak"],
  authors: [{ name: "Ayan Modak" }],
  openGraph: {
    title: "Ayan Modak | Software Engineer",
    description: "Software Engineer specializing in building scalable, high-performance web applications and cross platform app.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayan Modak | Software Engineer",
    description: "Software Engineer specializing in building scalable, high-performance web applications and cross platform app.",
  },
  other: {
    "google-site-verification": "hJ_Lh6_YxS52LqV5Q1C9t1zJ-P_b-t1k-K_a-c_k",
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
