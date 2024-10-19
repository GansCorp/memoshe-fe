import React, { useState } from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { Flashcard as FlashcardType } from '../../types';
import { FaVolumeUp, FaTrash, FaSync } from 'react-icons/fa';

interface FlashcardProps {
  flashcard: FlashcardType;
  onDelete: (id: string) => void;
  onPlayAudio: (audioUrl: string) => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard, onDelete, onPlayAudio }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const audioValue = flashcard.values.find(value => value.type === 'audio');

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(flashcard.id);
  };
  
  return (
    <Card 
      className="w-72 h-48 relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      isPressable
    >
      <div className={`w-full h-full transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
        <CardBody className="flex items-center justify-center p-6">
          {isFlipped ? (
            <div className="text-gray-200 rotate-y-180 flex flex-col items-center justify-center h-full">
              {flashcard.values.find(value => value.type === 'picture') && (
                <img 
                  src={flashcard.values.find(value => value.type === 'picture')?.content} 
                  alt="Flashcard" 
                  className="max-h-24 rounded-md mx-auto mb-2"
                />
              )}
              <div className="flex flex-wrap justify-center">
                {flashcard.values
                  .filter(v => v.type === 'text')
                  .slice(0, 2)
                  .map((textValue, textIndex) => (
                    <p key={textIndex} className="text-sm px-1 max-w-[50%] text-center">{textValue.content}</p>
                  ))}
              </div>
              {flashcard.values.find(value => value.type === 'audio') && (
                <audio 
                  src={flashcard.values.find(value => value.type === 'audio')?.content} 
                  controls 
                  className="w-full mt-2" 
                  onPlay={() => onPlayAudio(flashcard.values.find(value => value.type === 'audio')?.content || '')}
                />
              )}
            </div>
          ) : (
            <p className="text-2xl font-bold text-blue-400">{flashcard.key}</p>
          )}
        </CardBody>
      </div>
      
      <div className="absolute top-2 right-2 flex space-x-2">
        {audioValue && (
          <Button
            isIconOnly
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
            onPress={(e: any) => {
              e.stopPropagation();
              onPlayAudio(audioValue.content);
            }}
          >
            <FaVolumeUp />
          </Button>
        )}
        <Button
          isIconOnly
          className="bg-green-600 hover:bg-green-700 text-white"
          size="sm"
          onPress={() => setIsFlipped(!isFlipped)}
        >
          <FaSync />
        </Button>
      </div>

      <Button 
        isIconOnly
        onClick={handleDelete}
        className="absolute bottom-2 right-2 bg-red-600 hover:bg-red-700 text-white w-8 h-8 min-w-0 p-0"
      >
        <FaTrash size={14} />
      </Button>
    </Card>
  );
};
