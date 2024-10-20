import React, { useRef, useState } from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { Flashcard as FlashcardType } from '@/types';
import { useDrag } from 'react-dnd';
import { FaPlay, FaTrash } from 'react-icons/fa';

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

  return (
    <div
      ref={ref}
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        transition: 'opacity 0.3s',
      }}
    >
      <Card 
        className="mb-4 bg-white shadow-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        isPressable
        onPress={handleFlip}
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
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{flashcard.key}</h3>
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
                  {value.type === 'text' && <p className="text-gray-700">{value.content}</p>}
                  {value.type === 'audio' && (
                    <Button 
                      color="primary" 
                      startContent={<FaPlay />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayAudio(value.content);
                      }}
                    >
                      Play Audio
                    </Button>
                  )}
                  {value.type === 'picture' && (
                    <img src={value.content} alt="Flashcard content" className="max-w-full h-auto rounded-lg" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <Button 
            color="danger" 
            startContent={<FaTrash />}
            className="mt-4"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(flashcard.id);
            }}
          >
            Delete
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};
