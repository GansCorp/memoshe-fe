'use client';

import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useLanguage } from '@/contexts/LanguageContext';
import { FaGlobe } from 'react-icons/fa';

const languages = {
  id: '🇮🇩 Indonesia',
  en: '🇬🇧 English',
  ja: '🇯🇵 日本語',
  ko: '🇰🇷 한국어'
};

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="light" 
          startContent={<FaGlobe />}
          className="text-blue-100 hover:text-blue-300"
        >
          {languages[language].split(' ')[0]}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Language Selection"
        onAction={(key) => setLanguage(key as keyof typeof languages)}
      >
        {Object.entries(languages).map(([key, value]) => (
          <DropdownItem key={key}>
            {value}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
} 