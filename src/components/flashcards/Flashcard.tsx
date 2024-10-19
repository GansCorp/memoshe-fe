import React, { useState } from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { Flashcard as FlashcardType } from '../../types';

interface FlashcardProps {
  flashcard: FlashcardType;
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Card className="w-64 h-40 cursor-pointer" isPressable onPress={() => setIsFlipped(!isFlipped)}>
      <CardBody className="flex items-center justify-center">
        {isFlipped ? (
          <div>
            {flashcard.values.map((value, index) => (
              <div key={index}>
                {value.type === 'text' && <p>{value.content}</p>}
                {value.type === 'picture' && <img src={value.content} alt="Flashcard" className="max-h-24" />}
                {value.type === 'audio' && <audio src={value.content} controls />}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg font-bold">{flashcard.key}</p>
        )}
      </CardBody>
    </Card>
  );
};