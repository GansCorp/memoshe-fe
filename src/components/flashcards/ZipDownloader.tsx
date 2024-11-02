'use client';

import React from 'react';
import { Button } from "@nextui-org/react";
import { FaDownload } from "react-icons/fa";
import { Chapter, Flashcard } from '@/types';
import JSZip from 'jszip';
import { useLanguage } from '@/contexts/LanguageContext';

interface ZipDownloaderProps {
  chapters: Chapter[];
  flashcards: Flashcard[];
}

export const ZipDownloader: React.FC<ZipDownloaderProps> = ({ chapters, flashcards }) => {
  const { t } = useLanguage();

  const handleDownload = async () => {
    const zip = new JSZip();
    
    // Tambahkan file JSON ke dalam ZIP
    zip.file('chapters.json', JSON.stringify(chapters, null, 2));
    zip.file('flashcards.json', JSON.stringify(flashcards, null, 2));
    
    // Generate ZIP file
    const content = await zip.generateAsync({ type: 'blob' });
    
    // Download file
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards-data.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button 
      className="bg-blue-500 hover:bg-blue-600 text-white"
      variant="ghost"
      startContent={<FaDownload />}
      onClick={handleDownload}
    >
      {t('downloadZip')}
    </Button>
  );
}; 