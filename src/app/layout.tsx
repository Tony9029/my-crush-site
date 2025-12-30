import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Dùng font Inter chuẩn của Google
import "./globals.css";

// Cấu hình font chữ
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Góc nhỏ của Bé",
  description: "Trang web dành tặng người thương",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
