import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import './globals.css';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
        <LanguageProvider>
          <Header />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
