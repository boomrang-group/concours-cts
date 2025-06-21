import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import MainLayout from '@/components/layout/main-layout';
import { AuthProvider } from '@/context/auth-context';

export const metadata: Metadata = {
  title: 'BantuChamp',
  description: 'Bantudemy – Campus de Talents & de Savoir',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <MainLayout>
            {children}
          </MainLayout>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
