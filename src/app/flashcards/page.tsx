'use client';

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardBody } from "@nextui-org/react";
import { ChapterCreator } from '@/components/flashcards/ChapterCreator';
import { FlashcardCreator } from '@/components/flashcards/FlashcardCreator';
import { Flashcard } from '@/components/flashcards/Flashcard';
import { Chapter, Flashcard as FlashcardType } from '@/types';
import { generateId } from '@/utils/idGenerator';
import { ZipUploader } from '@/components/flashcards/ZipUploader';
import { ZipDownloader } from '@/components/flashcards/ZipDownloader';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FlashcardsPage() {
  const { t } = useLanguage();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [selectedSubchapter, setSelectedSubchapter] = useState<string | null>(null);

  const handleCreateChapter = (title: string) => {
    if (chapters.some(chapter => chapter.title === title)) {
      alert(t('chapterExists'));
      return;
    }

    const newChapter: Chapter = {
      id: generateId(),
      title,
      subchapters: []
    };
    setChapters([...chapters, newChapter]);
  };

  const handleCreateSubchapter = (chapterId: string, title: string) => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (chapter?.subchapters?.some(sub => sub.title === title)) {
      alert(t('subchapterExists'));
      return;
    }

    const newChapters = chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          subchapters: [...(chapter.subchapters || []), { id: generateId(), title }]
        };
      }
      return chapter;
    });
    setChapters(newChapters);
  };

  const handleCreateFlashcard = (key: string, values: { type: 'text' | 'audio' | 'picture', content: string }[]) => {
    if (!selectedChapter) {
      alert(t('selectChapterFirst'));
      return;
    }

    const existingCards = flashcards.filter(card => {
      if (selectedSubchapter) {
        return card.subchapterId === selectedSubchapter;
      }
      return card.chapterId === selectedChapter && !card.subchapterId;
    });

    if (existingCards.some(card => card.key === key)) {
      alert(t('keyExists'));
      return;
    }

    const newFlashcard: FlashcardType = {
      id: generateId(),
      key,
      values,
      chapterId: selectedChapter,
      subchapterId: selectedSubchapter || undefined
    };
    setFlashcards([...flashcards, newFlashcard]);
  };

  const handleJsonUpload = (newChapters: Chapter[], newFlashcards: FlashcardType[]) => {
    setChapters(newChapters);
    setFlashcards(newFlashcards);
    setSelectedChapter(null);
    setSelectedSubchapter(null);
  };

  const handleDeleteFlashcard = (id: string) => {
    if (window.confirm(t('confirmDelete'))) {
      setFlashcards(flashcards.filter(f => f.id !== id));
    }
  };

  const handlePlayAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

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

  const handleEditChapter = (chapterId: string, newTitle: string) => {
    if (chapters.some(chapter => chapter.title === newTitle && chapter.id !== chapterId)) {
      alert(t('chapterExists'));
      return;
    }

    const newChapters = chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return { ...chapter, title: newTitle };
      }
      return chapter;
    });
    setChapters(newChapters);
  };

  const handleEditSubchapter = (chapterId: string, subchapterId: string, newTitle: string) => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (chapter?.subchapters?.some(sub => sub.title === newTitle && sub.id !== subchapterId)) {
      alert(t('subchapterExists'));
      return;
    }

    const newChapters = chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          subchapters: chapter.subchapters?.map(sub => {
            if (sub.id === subchapterId) {
              return { ...sub, title: newTitle };
            }
            return sub;
          })
        };
      }
      return chapter;
    });
    setChapters(newChapters);
  };

  const handleDeleteChapter = (chapterId: string) => {
    if (!window.confirm(t('confirmDeleteChapter'))) {
      return;
    }

    const newChapters = chapters.filter(c => c.id !== chapterId);
    const newFlashcards = flashcards.filter(f => f.chapterId !== chapterId);
    
    setChapters(newChapters);
    setFlashcards(newFlashcards);
    if (selectedChapter === chapterId) {
      setSelectedChapter(null);
      setSelectedSubchapter(null);
    }
  };

  const handleDeleteSubchapter = (chapterId: string, subchapterId: string) => {
    if (!window.confirm(t('confirmDeleteSubchapter'))) {
      return;
    }

    const newChapters = chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          subchapters: chapter.subchapters?.filter(sub => sub.id !== subchapterId)
        };
      }
      return chapter;
    });

    const newFlashcards = flashcards.filter(f => f.subchapterId !== subchapterId);
    
    setChapters(newChapters);
    setFlashcards(newFlashcards);
    if (selectedSubchapter === subchapterId) {
      setSelectedSubchapter(null);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <div className="flex gap-4 mb-6">
          <ZipUploader onUpload={handleJsonUpload} />
          <ZipDownloader chapters={chapters} flashcards={flashcards} />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardBody>
                <ChapterCreator
                  chapters={chapters}
                  onCreateChapter={handleCreateChapter}
                  onCreateSubchapter={handleCreateSubchapter}
                  onSelectChapter={setSelectedChapter}
                  onSelectSubchapter={setSelectedSubchapter}
                  onEditChapter={handleEditChapter}
                  onEditSubchapter={handleEditSubchapter}
                  onDeleteChapter={handleDeleteChapter}
                  onDeleteSubchapter={handleDeleteSubchapter}
                  selectedChapter={selectedChapter}
                  selectedSubchapter={selectedSubchapter}
                />
              </CardBody>
            </Card>
          </div>

          <div className="md:col-span-2">
            {selectedChapter && (
              <FlashcardCreator
                onSave={handleCreateFlashcard}
                chapterId={selectedChapter}
                subchapterId={selectedSubchapter || undefined}
              />
            )}

            <div className="grid gap-4">
              {getFilteredFlashcards().map((flashcard) => (
                <Flashcard
                  key={flashcard.id}
                  flashcard={flashcard}
                  onDelete={handleDeleteFlashcard}
                  onPlayAudio={handlePlayAudio}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
