'use client';

import React, { useState } from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { Flashcard as FlashcardType } from '@/types';
import { FaPlay } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

interface FlashcardStudyProps {
  flashcard: FlashcardType;
  isShuffleMode?: boolean;
}

export const FlashcardStudy: React.FC<FlashcardStudyProps> = ({ 
  flashcard, 
  isShuffleMode = false 
}) => {
  const { t } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(isShuffleMode);
  const [isRevealed, setIsRevealed] = useState(!isShuffleMode);

  const handleFlip = () => {
    if (!isRevealed && isShuffleMode) return;
    setIsFlipped(!isFlipped);
  };

  const handleReveal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRevealed(true);
  };

  const playAudio = (audioUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <Card 
      className="mb-4 bg-blue-50 shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 hover:bg-blue-100"
      onClick={handleFlip}
    >
      <CardBody>
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
            {!isRevealed && isShuffleMode ? (
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleReveal}
              >
                {t('showAnswer')}
              </Button>
            ) : (
              flashcard.values.map((value, index) => (
                <div key={index} className="mb-2">
                  {value.type === 'text' && <p className="text-blue-700">{value.content}</p>}
                  {value.type === 'audio' && (
                    <Button 
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      startContent={<FaPlay />}
                      onClick={(e) => playAudio(value.content, e)}
                    >
                      {t('playAudio')}
                    </Button>
                  )}
                  {value.type === 'picture' && (
                    <img 
                      src={value.content} 
                      alt="Flashcard content" 
                      className="max-w-full h-auto rounded-lg shadow-md"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}; 