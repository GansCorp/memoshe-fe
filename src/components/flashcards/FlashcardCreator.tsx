'use client';

import React, { useState, useRef } from 'react';
import { Card, CardBody, Input, Button, Select, SelectItem } from "@nextui-org/react";
import { FaPlus, FaImage, FaMusic } from "react-icons/fa";
import { convertImageToBase64 } from '@/utils/imageUtils';
import { useLanguage } from '@/contexts/LanguageContext';

interface FlashcardCreatorProps {
  onSave: (key: string, values: { type: 'text' | 'audio' | 'picture', content: string }[]) => void;
  chapterId: string;
  subchapterId?: string;
}

export function FlashcardCreator({ onSave, chapterId, subchapterId }: FlashcardCreatorProps) {
  const { t } = useLanguage();
  const [key, setKey] = useState('');
  const [values, setValues] = useState<{ type: 'text' | 'audio' | 'picture', content: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddValue = () => {
    setValues([...values, { type: 'text', content: '' }]);
  };

  const handleValueChange = (index: number, content: string) => {
    const newValues = [...values];
    newValues[index].content = content;
    setValues(newValues);
  };

  const handleTypeChange = (index: number, type: 'text' | 'audio' | 'picture') => {
    const newValues = [...values];
    newValues[index].type = type;
    newValues[index].content = ''; // Reset content when type changes
    setValues(newValues);
  };

  const handleImageUpload = async (index: number, file: File) => {
    try {
      const base64Image = await convertImageToBase64(file);
      const newValues = [...values];
      newValues[index].content = base64Image;
      setValues(newValues);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  const handleSave = () => {
    if (!key.trim()) {
      alert(t('pleaseEnterKey'));
      return;
    }
    if (values.length === 0) {
      alert(t('pleaseAddValue'));
      return;
    }
    if (values.some(v => !v.content.trim())) {
      alert(t('pleaseFillValues'));
      return;
    }
    onSave(key, values);
    setKey('');
    setValues([]);
  };

  return (
    <Card className="mb-4 bg-blue-50">
      <CardBody>
        <div className="space-y-4">
          <Input
            label={t('key')}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder={t('enterKey')}
            className="bg-white"
            variant="bordered"
          />

          {values.map((value, index) => (
            <div key={index} className="flex gap-2 items-start">
              <Select
                value={value.type}
                onChange={(e) => handleTypeChange(index, e.target.value as 'text' | 'audio' | 'picture')}
                className="w-32 bg-white"
              >
                <SelectItem key="text" value="text">{t('text')}</SelectItem>
                <SelectItem key="picture" value="picture">{t('picture')}</SelectItem>
                <SelectItem key="audio" value="audio">{t('audio')}</SelectItem>
              </Select>

              {value.type === 'text' && (
                <Input
                  value={value.content}
                  onChange={(e) => handleValueChange(index, e.target.value)}
                  placeholder={t('enterValue')}
                  className="flex-1 bg-white"
                  variant="bordered"
                />
              )}

              {value.type === 'picture' && (
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(index, file);
                      }
                    }}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                  />
                  <div className="flex gap-2 items-center">
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      variant="flat"
                      startContent={<FaImage />}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {t('uploadImage')}
                    </Button>
                    {value.content && (
                      <img 
                        src={value.content} 
                        alt="Preview" 
                        className="h-10 w-10 object-cover rounded"
                      />
                    )}
                  </div>
                </div>
              )}

              {value.type === 'audio' && (
                <div className="flex-1">
                  <Input
                    value={value.content}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    placeholder="Enter audio URL"
                    startContent={<FaMusic />}
                    className="bg-white"
                    variant="bordered"
                  />
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-2">
            <Button onClick={handleAddValue}>
              {t('addValue')}
            </Button>
            <Button onClick={handleSave}>
              {t('saveFlashcard')}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
