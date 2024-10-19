import React, { useState } from 'react';
import { Input, Button, Textarea, Card, CardBody, CardFooter } from "@nextui-org/react";
import { Flashcard } from '../../types';
import { FaPlus, FaImage, FaMusic, FaTrash } from 'react-icons/fa';

interface FlashcardCreatorProps {
  onSave: (flashcard: Flashcard) => void;
  onPlayAudio: (audioUrl: string) => void;
}

export const FlashcardCreator: React.FC<FlashcardCreatorProps> = ({ onSave }) => {
  const [key, setKey] = useState('');
  const [values, setValues] = useState<Array<{ type: "audio" | "picture" | "text"; content: string }>>([{ type: 'text', content: '' }]);

  const handleSave = () => {
    const newFlashcard: Flashcard = {
      id: Date.now().toString(),
      key,
      values,
    };
    onSave(newFlashcard);
    setKey('');
    setValues([{ type: 'text', content: '' }]);
  };

  const handleDeleteValue = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  const handleImageAsValue = () => {
    setValues([...values, { type: 'picture', content: '' }]);
  };

  const handleAudioAsValue = () => {
    setValues([...values, { type: 'audio', content: '' }]);
  };

  return (
    <Card className="bg-gray-800 border border-gray-700 shadow-md">
      <CardBody className="space-y-4">
        <Input
          label="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="bg-gray-700 text-gray-200"
        />
        {values
          .sort((a, b) => {
            if (a.type === 'picture' || a.type === 'audio') return -1;
            if (b.type === 'picture' || b.type === 'audio') return 1;
            return 0;
          })
          .map((value, index) => {
            const isMediaType = value.type === 'picture' || value.type === 'audio';
            const displayIndex = isMediaType ? '' : index - values.filter(v => v.type === 'picture' || v.type === 'audio').length + 1;

            return (
              <div key={index} className="flex items-center space-x-2">
                {value.type === 'picture' || value.type === 'audio' ? (
                  <div className="flex flex-col items-start w-full">
                    <label className="mb-2 text-gray-300">{value.type === 'picture' ? 'Gambar' : 'Audio'}</label>
                    {value.content ? (
                      <img src={value.content} alt="Gambar" className="max-w-xs max-h-40 mb-2 rounded-md" />
                    ) : null}
                    <input
                      type="file"
                      accept={value.type === 'picture' ? "image/*" : "audio/*"}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const newValues = [...values];
                            newValues[index].content = event.target?.result as string;
                            setValues(newValues);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="text-gray-300 bg-gray-700 rounded-md p-2 w-full"
                    />
                  </div>
                ) : (
                  <Textarea
                    label={`Value ${displayIndex}`}
                    value={value.content}
                    onChange={(e) => {
                      const newValues = [...values];
                      newValues[index].content = e.target.value;
                      setValues(newValues);
                    }}
                    className="bg-gray-700 text-gray-200"
                  />
                )}
                {values.length > 1 && (
                  <Button isIconOnly color="danger" onClick={() => handleDeleteValue(index)}>
                    <FaTrash />
                  </Button>
                )}
              </div>
            );
          })}
      </CardBody>
      <CardFooter className="flex justify-between">
        <div className="space-x-2">
          <Button onClick={() => setValues([...values, { type: 'text', content: '' }])}>
            <FaPlus className="mr-2" /> Add Value
          </Button>
          {!values.some(value => value.type === 'picture') && (
            <Button onClick={handleImageAsValue}>
              <FaImage className="mr-2" /> Add Image
            </Button>
          )}
          {!values.some(value => value.type === 'audio') && (
            <Button onClick={handleAudioAsValue}>
              <FaMusic className="mr-2" /> Add Audio
            </Button>
          )}
        </div>
        <Button color="primary" onClick={handleSave}>
          Create Flashcard
        </Button>
      </CardFooter>
    </Card>
  );
};
