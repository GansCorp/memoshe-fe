'use client';

import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { Chapter, Flashcard } from '@/types';
import { FlashcardStudy } from '@/components/flashcards/FlashcardStudy';
import { ZipUploader } from '@/components/flashcards/ZipUploader';
import { ZipDownloader } from '@/components/flashcards/ZipDownloader';
import { useLanguage } from '@/contexts/LanguageContext';

export default function OrderedStudyPage() {
  const { t } = useLanguage();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [selectedSubchapter, setSelectedSubchapter] = useState<string | null>(null);

  useEffect(() => {
    // Ambil data dari localStorage atau API
    const savedChapters = JSON.parse(localStorage.getItem('chapters') || '[]');
    const savedFlashcards = JSON.parse(localStorage.getItem('flashcards') || '[]');
    setChapters(savedChapters);
    setFlashcards(savedFlashcards);
  }, []);

  const getFilteredFlashcards = () => {
    return flashcards.filter(card => {
      if (selectedSubchapter) {
        return card.subchapterId === selectedSubchapter;
      }
      if (selectedChapter) {
        return card.chapterId === selectedChapter;
      }
      return true;
    });
  };

  const handleJsonUpload = (newChapters: Chapter[], newFlashcards: Flashcard[]) => {
    setChapters(newChapters);
    setFlashcards(newFlashcards);
    // Reset selections
    setSelectedChapter(null);
    setSelectedSubchapter(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{t('orderedMode')}</h1>
      
      <div className="flex gap-4 mb-6">
        <ZipUploader onUpload={handleJsonUpload} />
        <ZipDownloader chapters={chapters} flashcards={flashcards} />
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Accordion className="bg-blue-50 rounded-lg">
            {chapters.map((chapter) => (
              <AccordionItem 
                key={chapter.id} 
                title={chapter.title}
                className="border-b border-blue-200"
              >
                <div className="flex flex-col gap-2">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    variant="flat"
                    onClick={() => {
                      setSelectedChapter(chapter.id);
                      setSelectedSubchapter(null);
                    }}
                  >
                    {t('allCards')}
                  </Button>
                  {chapter.subchapters?.map((subchapter) => (
                    <Button
                      key={subchapter.id}
                      className="bg-blue-400 hover:bg-blue-500 text-white"
                      variant="flat"
                      onClick={() => {
                        setSelectedChapter(chapter.id);
                        setSelectedSubchapter(subchapter.id);
                      }}
                    >
                      {subchapter.title}
                    </Button>
                  ))}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="md:col-span-2">
          <div className="grid gap-4">
            {getFilteredFlashcards().map((flashcard) => (
              <FlashcardStudy
                key={flashcard.id}
                flashcard={flashcard}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 