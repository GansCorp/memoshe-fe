'use client';

import React, { useState, useCallback } from 'react';
import { FlashcardCreator } from '@/components/flashcards/FlashcardCreator';
import { Flashcard } from '@/components/flashcards/Flashcard';
import { Flashcard as FlashcardType } from '@/types';
import { Button, Input, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);

  const handleSaveFlashcard = useCallback((flashcard: FlashcardType) => {
    setFlashcards(prevFlashcards => [...prevFlashcards, flashcard]);
  }, []);

  const handleDownloadFlashcards = useCallback(() => {
    const flashcardsJson = JSON.stringify(flashcards, (key, value) =>
      typeof value === 'object' && value !== null ? { ...value, id: undefined } : value
    );
    const blob = new Blob([flashcardsJson], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'flashcards.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, [flashcards]);

  const handleUploadFlashcards = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const flashcardsJson = e.target?.result as string;
          const parsedData = JSON.parse(flashcardsJson);

          const normalizeFlashcard = (card: any): FlashcardType => {
            return {
              id: Math.random().toString(36).substr(2, 9),
              key: card.key || '',
              values: Object.values(card.values || {}).map((value: any) => ({
                type: value.type || 'text',
                content: value.content || ''
              }))
            };
          };

          const flashcardsWithIds = Object.values(parsedData).map(normalizeFlashcard);

          setFlashcards(flashcardsWithIds);
        } catch (error) {
          console.error('Error saat parsing flashcards:', error);
        }
      };
      reader.readAsText(file);
    }
  }, []);

  const handleDeleteFlashcard = useCallback((id: string) => {
    setFlashcards(prevFlashcards => prevFlashcards.filter(flashcard => flashcard.id !== id));
  }, []);

  const handlePlayAudio = useCallback((audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play();
  }, []);

  const router = useRouter();

  const handleBackToHome = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="flex flex-col flex-grow container mx-auto p-8">
      <Card className="mb-8 bg-gray-800 shadow-xl border border-gray-700">
        <CardHeader className="flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl font-bold text-blue-400">Flashcards</h1>
          <div className="flex space-x-4">
            <Button color="primary" onClick={handleDownloadFlashcards}>
              Download Flashcards
            </Button>
            <Input 
              type="file" 
              onChange={handleUploadFlashcards} 
              className="max-w-xs bg-gray-700 text-gray-200"
            />
            <Button color="primary" onClick={handleBackToHome}>Back to Home</Button>
          </div>
        </CardHeader>
        <Divider className="bg-gray-700" />
        <CardBody className="bg-gray-800">
          <FlashcardCreator onSave={handleSaveFlashcard} onPlayAudio={handlePlayAudio} />
        </CardBody>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {flashcards.map((flashcard) => (
          <Flashcard 
            key={flashcard.id} 
            flashcard={flashcard} 
            onDelete={handleDeleteFlashcard} 
            onPlayAudio={handlePlayAudio}
          />
        ))}
      </div>
      
      {flashcards.length > 0 && (
        <Card className="mt-8 bg-gray-800 border border-gray-700">
          <CardHeader>
            <h2 className="text-xl font-semibold text-blue-300">Flashcards Data</h2>
          </CardHeader>
          <CardBody>
            <pre className="bg-gray-900 p-4 rounded-md overflow-auto max-h-60 text-gray-300">
              {JSON.stringify(flashcards, null, 2)}
            </pre>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
