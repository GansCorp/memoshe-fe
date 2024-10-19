import React, { useState } from 'react';
import { Input, Button, Textarea } from "@nextui-org/react";
import { Flashcard } from '../../types';

interface FlashcardCreatorProps {
  onSave: (flashcard: Flashcard) => void;
}

export const FlashcardCreator: React.FC<FlashcardCreatorProps> = ({ onSave }) => {
  const [key, setKey] = useState('');
  const [values, setValues] = useState([{ type: 'text', content: '' }]);

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

  return (
    <div className="space-y-4">
      <Input
        label="Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      {values.map((value, index) => (
        <Textarea
          key={index}
          label={`Value ${index + 1}`}
          value={value.content}
          onChange={(e) => {
            const newValues = [...values];
            newValues[index].content = e.target.value;
            setValues(newValues);
          }}
        />
      ))}
      <Button onClick={() => setValues([...values, { type: 'text', content: '' }])}>
        Add Value
      </Button>
      <Button color="primary" onClick={handleSave}>
        Create Flashcard
      </Button>
    </div>
  );
};
