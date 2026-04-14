import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nebula AI Lab - 治愈系互动素材库",
  description: "Nebula AI Lab 提供高质量治愈系4K素材、互动游戏过场视频、剧本杀氛围素材、AI动态壁纸，支持个人和商业授权。",
  keywords: ["互动素材", "游戏过场素材", "剧本杀素材", "AI动态壁纸", "治愈系视频", "4K素材", "商用授权"],
  authors: [{ name: "Nebula Assets" }],
  openGraph: {
    title: "Nebula AI Lab - 治愈系互动素材库",
    description: "高质量治愈系4K素材、互动游戏过场视频、剧本杀氛围素材、AI动态壁纸，支持商用授权。",
    url: "https://nebula-assets.vercel.app",
    siteName: "Nebula AI Lab",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nebula AI Lab - 治愈系互动素材库",
    description: "高质量治愈系4K素材、互动游戏过场视频、剧本杀氛围素材、AI动态壁纸，支持商用授权。",
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
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
