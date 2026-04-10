import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nebula Assets 素材库 - 免费4K影视素材",
  description: "Nebula Assets 提供高质量免费4K影视素材、AI生成视频、自然风光、城市航拍等商用级视频资源，完全免费，支持个人和商业用途。",
  keywords: ["4K视频素材", "免费素材库", "AI视频", "影视素材", "商用素材", "自然风光", "航拍视频"],
  authors: [{ name: "Nebula Assets" }],
  openGraph: {
    title: "Nebula Assets 素材库 - 免费4K影视素材",
    description: "高质量免费4K影视素材、AI生成视频、自然风光、城市航拍等商用级视频资源，完全免费。",
    url: "https://nebula-assets.vercel.app",
    siteName: "Nebula Assets",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nebula Assets 素材库 - 免费4K影视素材",
    description: "高质量免费4K影视素材、AI生成视频、自然风光、城市航拍等商用级视频资源，完全免费。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
