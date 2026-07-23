import type { Metadata, Viewport } from 'next';
import './globals.css';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: 'ChipFlow - 芯片设计流程可视化监控平台',
  description: '面向半导体工程师的芯片设计流程可视化监控平台',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
