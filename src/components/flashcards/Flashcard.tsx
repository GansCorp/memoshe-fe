import React, { useRef, useState } from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { Flashcard as FlashcardType } from '@/types';
import { useDrag } from 'react-dnd';
import { FaPlay, FaTrash } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

interface FlashcardProps {
  flashcard: FlashcardType;
  onDelete: (id: string) => void;
  onPlayAudio: (audioUrl: string) => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard, onDelete, onPlayAudio }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FLASHCARD',
    item: { id: flashcard.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(ref);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const { t } = useLanguage();

  return (
    <div
      ref={ref}
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        transition: 'opacity 0.3s',
      }}
    >
      <Card 
        className="mb-4 bg-blue-50 shadow-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 hover:bg-blue-100"
      >
        <CardBody>
          <div 
            onClick={handleFlip}
            className="w-full"
          >
            <div
              style={{
                transition: 'transform 0.6s',
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
              }}
            >
              <div style={{
                backfaceVisibility: 'hidden',
                position: isFlipped ? 'absolute' : 'relative',
                width: '100%',
                height: '100%',
              }}>
                <h3 className="text-lg font-semibold mb-2 text-blue-800">{flashcard.key}</h3>
              </div>
              <div style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                position: isFlipped ? 'relative' : 'absolute',
                width: '100%',
                height: '100%',
              }}>
                {flashcard.values.map((value, index) => (
                  <div key={index} className="mb-2">
                    {value.type === 'text' && <p className="text-blue-700">{value.content}</p>}
                    {value.type === 'audio' && (
                      <Button 
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                        startContent={<FaPlay />}
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlayAudio(value.content);
                        }}
                      >
                        {t('playAudio')}
                      </Button>
                    )}
                    {value.type === 'picture' && (
                      <img src={value.content} alt="Flashcard content" className="max-w-full h-auto rounded-lg" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white"
              startContent={<FaTrash />}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(flashcard.id);
              }}
            >
              {t('delete')}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
