'use client';

import React from 'react';
import { Button } from "@nextui-org/react";
import { FaUpload } from "react-icons/fa";
import JSZip from 'jszip';
import { useLanguage } from '@/contexts/LanguageContext';

interface ZipUploaderProps {
  onUpload: (chapters: any[], flashcards: any[]) => void;
}

export const ZipUploader: React.FC<ZipUploaderProps> = ({ onUpload }) => {
  const { t } = useLanguage();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const zip = new JSZip();
      const contents = await zip.loadAsync(file);
      
      const chaptersFile = contents.file('chapters.json');
      const flashcardsFile = contents.file('flashcards.json');
      
      if (!chaptersFile || !flashcardsFile) {
        alert('Format ZIP tidak valid. Pastikan file berisi chapters.json dan flashcards.json');
        return;
      }

      const chaptersJson = await chaptersFile.async('string');
      const flashcardsJson = await flashcardsFile.async('string');

      const chapters = JSON.parse(chaptersJson);
      const flashcards = JSON.parse(flashcardsJson);

      onUpload(chapters, flashcards);
    } catch (error) {
      alert('Error membaca file ZIP');
      console.error(error);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".zip"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="zip-upload"
      />
      <label htmlFor="zip-upload">
        <Button 
          as="span"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          variant="ghost"
          startContent={<FaUpload />}
        >
          {t('uploadZip')}
        </Button>
      </label>
    </div>
  );
}; 