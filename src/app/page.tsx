'use client';

import React from 'react';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-100 mb-4">
          {t('welcomeTitle')}
        </h1>
        <p className="text-xl text-blue-200 mb-8">
          {t('welcomeSubtitle')}
        </p>
        <Button
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => router.push('/flashcards')}
        >
          {t('getStarted')}
        </Button>
      </div>
    </div>
  );
}
