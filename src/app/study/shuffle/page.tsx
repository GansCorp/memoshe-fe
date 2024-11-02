'use client';

import React, { useState } from 'react';
import { Select, SelectItem, Button } from "@nextui-org/react";
import { Chapter, Flashcard } from '@/types';
import { FlashcardStudy } from '@/components/flashcards/FlashcardStudy';
import { ZipUploader } from '@/components/flashcards/ZipUploader';
import { ZipDownloader } from '@/components/flashcards/ZipDownloader';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ShuffleStudyPage() {
  const { t } = useLanguage();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("all");

  const shuffleCards = () => {
    let cardsToShuffle = [...flashcards];
    
    if (selectedValue !== "all") {
      const [type, id] = selectedValue.split(':');
      cardsToShuffle = flashcards.filter(card => {
        if (type === 'chapter') return card.chapterId === id;
        if (type === 'subchapter') return card.subchapterId === id;
        return true;
      });
    }

    // Fisher-Yates shuffle
    for (let i = cardsToShuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsToShuffle[i], cardsToShuffle[j]] = [cardsToShuffle[j], cardsToShuffle[i]];
    }

    setShuffledCards(cardsToShuffle);
  };

  const handleJsonUpload = (newChapters: Chapter[], newFlashcards: Flashcard[]) => {
    setChapters(newChapters);
    setFlashcards(newFlashcards);
    setShuffledCards([]); // Reset shuffled cards
    setSelectedValue("all"); // Reset selection
  };

  const renderSelectItems = () => {
    const items = [
      <SelectItem key="all" value="all">
        {t('allCategories')}
      </SelectItem>
    ];

    chapters.forEach(chapter => {
      items.push(
        <SelectItem key={`chapter-${chapter.id}`} value={`chapter:${chapter.id}`}>
          {chapter.title}
        </SelectItem>
      );

      chapter.subchapters?.forEach(subchapter => {
        items.push(
          <SelectItem key={`subchapter-${subchapter.id}`} value={`subchapter:${subchapter.id}`}>
            ↳ {subchapter.title}
          </SelectItem>
        );
      });
    });

    return items;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{t('shuffleMode')}</h1>
      
      <div className="flex gap-4 mb-6">
        <ZipUploader onUpload={handleJsonUpload} />
        <ZipDownloader chapters={chapters} flashcards={flashcards} />
      </div>
      
      <div className="mb-6 flex gap-4">
        <Select
          label={t('selectCategory')}
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          className="bg-blue-50"
        >
          {renderSelectItems()}
        </Select>
        
        <Button 
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={shuffleCards}
        >
          {t('startShuffle')}
        </Button>
      </div>

      <div className="grid gap-4">
        {shuffledCards.map((flashcard) => (
          <FlashcardStudy
            key={flashcard.id}
            flashcard={flashcard}
            isShuffleMode
          />
        ))}
      </div>
    </div>
  );
} 