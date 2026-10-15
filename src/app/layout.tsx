import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopHeader } from '@/components/layout/TopHeader';
import { SplashScreen } from '@/components/common/SplashScreen';

export const metadata: Metadata = {
  title: 'VanRakshak — Acoustic TinyML & LoRa Forest Monitoring Grid',
  description:
    'Cyber-physical forest monitoring platform utilizing edge TinyML acoustic inference and Sub-GHz LoRa telemetry for illegal logging detection.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SplashScreen durationMs={3500} />
        <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
          <Sidebar />
          <div
            style={{
              marginLeft: 'var(--sidebar-width)',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              backgroundColor: 'var(--bg-base)',
            }}
          >
            <TopHeader />
            <main
              style={{
                flex: 1,
                padding: '24px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
