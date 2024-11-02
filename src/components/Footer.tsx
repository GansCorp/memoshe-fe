'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-blue-900 py-4 text-center text-blue-200">
      {t('footerText')}
    </footer>
  );
}
