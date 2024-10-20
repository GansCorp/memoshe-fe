import React, { useRef } from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { Flashcard as FlashcardType } from '@/types';
import { useDrag } from 'react-dnd';

interface FlashcardProps {
  flashcard: FlashcardType;
  onDelete: (id: string) => void;
  onPlayAudio: (audioUrl: string) => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard, onDelete, onPlayAudio }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FLASHCARD',
    item: { id: flashcard.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Menggabungkan ref dari useDrag dengan ref kita sendiri
  drag(ref);

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className="mb-4 bg-gray-700 shadow-md">
        <CardBody>
          <h3 className="text-lg font-semibold mb-2">{flashcard.key}</h3>
          {flashcard.values.map((value, index) => (
            <div key={index} className="mb-2">
              {value.type === 'text' && <p>{value.content}</p>}
              {value.type === 'audio' && (
                <Button onClick={() => onPlayAudio(value.content)}>Play Audio</Button>
              )}
              {value.type === 'picture' && (
                <img src={value.content} alt="Flashcard content" className="max-w-full h-auto" />
              )}
            </div>
          ))}
          <Button color="danger" onClick={() => onDelete(flashcard.id)}>Delete</Button>
        </CardBody>
      </Card>
    </div>
  );
};
