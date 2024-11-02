'use client';

import React from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function StudyPage() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <h1>{t('studyMode')}</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:scale-105 transition-transform bg-blue-50">
          <CardBody className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">{t('orderedMode')}</h2>
            <p className="text-blue-600 mb-4">
              {t('orderedDescription')}
            </p>
            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => router.push('/study/ordered')}
            >
              {t('startStudy')}
            </Button>
          </CardBody>
        </Card>

        <Card className="hover:scale-105 transition-transform bg-blue-50">
          <CardBody className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Mode Shuffle</h2>
            <p className="text-blue-600 mb-4">
              Pelajari kartu secara acak dengan pilihan kategori yang berbeda.
            </p>
            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => router.push('/study/shuffle')}
            >
              Mulai Shuffle
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
} 