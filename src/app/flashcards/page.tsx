'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { FlashcardCreator, DroppableArea } from '@/components/flashcards/FlashcardCreator';
import { Flashcard as FlashcardComponent } from '@/components/flashcards/Flashcard';
import { ChapterCreator } from '@/components/flashcards/ChapterCreator';
import { Flashcard, Chapter } from '@/types';
import { Button, Input, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import JSZip from 'jszip';

export default function FlashcardsPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const handleSaveChapter = useCallback((newChapter: Chapter) => {
    setChapters(prevChapters => [...prevChapters, newChapter]);
  }, []);

  useEffect(() => {
    console.log('Updated chapters:', chapters);
  }, [chapters]);

  const handleSaveFlashcard = useCallback((flashcard: Omit<Flashcard, 'chapterId' | 'subchapterId'>, chapterId: string, subchapterId?: string) => {
    setFlashcards(prevFlashcards => [...prevFlashcards, { ...flashcard, chapterId, subchapterId }]);
  }, []);

  const handleDeleteFlashcard = useCallback((id: string) => {
    setFlashcards(prevFlashcards => prevFlashcards.filter(flashcard => flashcard.id !== id));
  }, []);

  const handlePlayAudio = useCallback((audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play();
  }, []);

  const handleMoveFlashcard = useCallback((flashcardId: string, newChapterId: string, newSubchapterId?: string) => {
    setFlashcards(prevFlashcards =>
      prevFlashcards.map(flashcard =>
        flashcard.id === flashcardId
          ? { ...flashcard, chapterId: newChapterId, subchapterId: newSubchapterId }
          : flashcard
      )
    );
  }, []);

  const router = useRouter();

  const handleBackToHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleExport = useCallback(async () => {
    const zip = new JSZip();

    // Tambahkan data JSON ke ZIP
    const data = {
      chapters,
      flashcards
    };
    zip.file("flashcards_data.json", JSON.stringify(data, null, 2));

    // Fungsi untuk mengunduh file dan menambahkannya ke ZIP
    const addFileToZip = async (url: string, filename: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const blob = await response.blob();
        zip.file(filename, blob);
      } catch (error) {
        console.error(`Failed to add file ${filename}:`, error);
      }
    };

    // Tambahkan semua file media ke ZIP
    const mediaPromises = flashcards.flatMap(flashcard =>
      flashcard.values
        .filter(value => value.type === 'audio' || value.type === 'picture')
        .map(value => {
          const extension = value.type === 'audio' ? '.mp3' : '.jpg';
          const filename = `media/${flashcard.id}_${value.type}${extension}`;
          return addFileToZip(value.content, filename);
        })
    );

    // Tunggu semua file media selesai ditambahkan
    await Promise.all(mediaPromises);

    // Generate ZIP file
    const content = await zip.generateAsync({type: "blob"});

    // Unduh ZIP file
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'flashcards_export.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [chapters, flashcards]);

  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        try {
          const result = e.target?.result;
          if (!result || typeof result === 'string') {
            throw new Error('Invalid file content');
          }

          const zip = await JSZip.loadAsync(result);
          
          // Baca dan parse file JSON
          const jsonFile = zip.file("flashcards_data.json");
          if (!jsonFile) throw new Error("JSON file not found in ZIP");
          const jsonContent = await jsonFile.async("string");
          const data = JSON.parse(jsonContent);
          
          setChapters(data.chapters);
          
          // Proses flashcards
          const importedFlashcards = await Promise.all(data.flashcards.map(async (flashcard: Flashcard) => {
            const newValues = await Promise.all(flashcard.values.map(async (value) => {
              if (value.type === 'audio' || value.type === 'picture') {
                const extension = value.type === 'audio' ? '.mp3' : '.jpg';
                const filename = `media/${flashcard.id}_${value.type}${extension}`;
                const file = zip.file(filename);
                if (file) {
                  const blob = await file.async("blob");
                  const newUrl = URL.createObjectURL(blob);
                  return { ...value, content: newUrl };
                }
              }
              return value;
            }));
            return { ...flashcard, values: newValues };
          }));
          
          setFlashcards(importedFlashcards);
          alert('Data berhasil diimpor!');
        } catch (error) {
          console.error('Error importing data:', error);
          alert(`Terjadi kesalahan saat mengimpor data: ${(error as Error).message}`);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col flex-grow container mx-auto p-8">
        <Card className="mb-8 bg-gray-800 shadow-xl border border-gray-700">
          <CardHeader className="flex justify-between items-center px-6 py-4">
            <h1 className="text-3xl font-bold text-blue-400">Flashcards</h1>
            <div className="flex space-x-2">
              <Button color="primary" onClick={handleExport}>Export</Button>
              <label className="cursor-pointer">
                <Button color="secondary" as="span">Import</Button>
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleImport}
                  style={{ display: 'none' }}
                  onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                />
              </label>
              <Button color="primary" onClick={handleBackToHome}>Back to Home</Button>
            </div>
          </CardHeader>
          <Divider className="bg-gray-700" />
          <CardBody className="bg-gray-800">
            <ChapterCreator onSave={handleSaveChapter} />
            <FlashcardCreator 
              onSave={handleSaveFlashcard}
              onPlayAudio={handlePlayAudio}
              chapters={chapters}
            />
          </CardBody>
        </Card>
        
        <Card className="mb-8 bg-gray-800 shadow-xl border border-gray-700">
          <CardHeader>
            <h2 className="text-xl font-semibold text-blue-300">Flashcards tanpa Bab</h2>
          </CardHeader>
          <CardBody>
            <DroppableArea
              chapterId=""
              onDrop={(droppedFlashcardId) => 
                handleMoveFlashcard(droppedFlashcardId, '')
              }
            />
            {flashcards
              .filter(f => !f.chapterId)
              .map(flashcard => (
                <FlashcardComponent
                  key={flashcard.id}
                  flashcard={flashcard}
                  onDelete={handleDeleteFlashcard}
                  onPlayAudio={handlePlayAudio}
                />
              ))}
          </CardBody>
        </Card>

        {chapters.map(chapter => (
          <Card key={chapter.id} className="mb-8 bg-gray-800 shadow-xl border border-gray-700">
            <CardHeader>
              <h2 className="text-xl font-semibold text-blue-300">{chapter.title}</h2>
            </CardHeader>
            <CardBody>
              {chapter.subchapters && chapter.subchapters.length > 0 ? (
                chapter.subchapters.map(subchapter => (
                  <div key={subchapter.id} className="mb-4">
                    <h3 className="text-xl font-semibold text-blue-300 mb-2">{subchapter.title}</h3>
                    <DroppableArea
                      chapterId={chapter.id}
                      subchapterId={subchapter.id}
                      onDrop={(droppedFlashcardId, chapterId, subchapterId) => 
                        handleMoveFlashcard(droppedFlashcardId, chapterId, subchapterId)
                      }
                    />
                    {flashcards
                      .filter(f => f.chapterId === chapter.id && f.subchapterId === subchapter.id)
                      .map(flashcard => (
                        <FlashcardComponent
                          key={flashcard.id}
                          flashcard={flashcard}
                          onDelete={handleDeleteFlashcard}
                          onPlayAudio={handlePlayAudio}
                        />
                      ))}
                  </div>
                ))
              ) : (
                <div className="mb-4">
                  <DroppableArea
                    chapterId={chapter.id}
                    subchapterId={undefined}
                    onDrop={(droppedFlashcardId, chapterId) => 
                      handleMoveFlashcard(droppedFlashcardId, chapterId)
                    }
                  />
                  {flashcards
                    .filter(f => f.chapterId === chapter.id && !f.subchapterId)
                    .map(flashcard => (
                      <FlashcardComponent
                        key={flashcard.id}
                        flashcard={flashcard}
                        onDelete={handleDeleteFlashcard}
                        onPlayAudio={handlePlayAudio}
                      />
                    ))}
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </DndProvider>
  );
}
