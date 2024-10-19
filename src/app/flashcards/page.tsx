'use client';

import React, { useState } from 'react';
import { FlashcardCreator } from '@/components/flashcards/FlashcardCreator';
import { Flashcard } from '@/components/flashcards/Flashcard';
import { Flashcard as FlashcardType } from '@/types';

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);

  const handleSaveFlashcard = (flashcard: FlashcardType) => {
    setFlashcards([...flashcards, flashcard]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flashcards</h1>
      <FlashcardCreator onSave={handleSaveFlashcard} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {flashcards.map((flashcard) => (
          <Flashcard key={flashcard.id} flashcard={flashcard} />
        ))}
      </div>
    </div>
  );
}