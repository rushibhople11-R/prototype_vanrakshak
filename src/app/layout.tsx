import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { SplashScreen } from '@/components/common/SplashScreen';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#090d10',
};

export const metadata: Metadata = {
  title: 'VanRakshak — Acoustic TinyML & LoRa Forest Safeguard Grid',
  description:
    'Cyber-physical forest safeguard platform utilizing edge TinyML acoustic inference and Sub-GHz LoRa telemetry for illegal logging detection.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SplashScreen durationMs={3200} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
