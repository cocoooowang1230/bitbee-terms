import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bitbee-hi-money-terms.erin-hk14.chatgpt.site"),
  title: "Bitbee × hi!錢錢｜理財文章分享任務活動條款",
  description: "公開分享1次，獲得0.000001 Honey。每月最多12次、最高可拿0.000012 Honey。查看參加方式與完整活動條款。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Bitbee × hi!錢錢｜理財文章分享任務",
    description: "公開分享1次，獲得0.000001 Honey。每月最多12次、最高可拿0.000012 Honey。",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Bitbee × hi!錢錢理財文章分享任務" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitbee × hi!錢錢｜理財文章分享任務",
    description: "公開分享1次，獲得0.000001 Honey。每月最多12次、最高可拿0.000012 Honey。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
