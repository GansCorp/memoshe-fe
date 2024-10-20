import React, { useState, useRef, ReactElement, useEffect } from 'react';
import { Input, Button, Card, CardBody, Select, SelectItem, Image, Checkbox } from "@nextui-org/react";
import { Flashcard, Chapter } from '@/types';
import { useDrop } from 'react-dnd';

type FlashcardValue = {
  type: 'text' | 'audio' | 'picture';
  content: string;
};

interface FlashcardCreatorProps {
  onSave: (flashcard: Omit<Flashcard, 'chapterId' | 'subchapterId'>, chapterId: string, subchapterId?: string) => void;
  onPlayAudio: (audioUrl: string) => void;
  chapters: Chapter[];
}

export const FlashcardCreator: React.FC<FlashcardCreatorProps> = ({ onSave, onPlayAudio, chapters }) => {
  const [key, setKey] = useState('');
  const [values, setValues] = useState<FlashcardValue[]>([{ type: 'text', content: '' }]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedSubchapter, setSelectedSubchapter] = useState('');
  const [useChapter, setUseChapter] = useState(false);

  useEffect(() => {
    console.log('Chapters:', chapters);
  }, [chapters]);

  const handleSave = () => {
    if (key.trim() && values.every(v => v.content.trim())) {
      onSave({
        id: Date.now().toString(),
        key,
        values,
      }, useChapter ? selectedChapter : '', useChapter && selectedSubchapter ? selectedSubchapter : undefined);
      // Reset form
      setKey('');
      setValues([{ type: 'text', content: '' }]);
      setSelectedChapter('');
      setSelectedSubchapter('');
      setUseChapter(false);
    } else {
      alert('Mohon isi key dan setidaknya satu value');
    }
  };

  const handleAddValue = () => {
    setValues([...values, { type: 'text', content: '' }]);
  };

  const handleValueChange = (index: number, field: 'type' | 'content', value: string) => {
    const newValues = [...values];
    if (field === 'type') {
      // Pastikan tipe selalu memiliki nilai yang valid
      const newType = ['text', 'audio', 'picture'].includes(value) ? value as FlashcardValue['type'] : 'text';
      newValues[index] = { ...newValues[index], type: newType };
      // Reset konten jika tipe berubah
      if (newType !== newValues[index].type) {
        newValues[index].content = '';
      }
    } else {
      newValues[index] = { ...newValues[index], [field]: value };
    }
    setValues(newValues);
  };

  const handleDeleteValue = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    setValues(newValues);
  };

  const renderMediaContent = () => {
    const imageValue = values.find(v => v.type === 'picture');
    const audioValue = values.find(v => v.type === 'audio');

    return (
      <div className="flex space-x-4 mt-4">
        {imageValue && (
          <div>
            <Image
              src={imageValue.content}
              alt="Uploaded image"
              width={100}
              height={100}
            />
          </div>
        )}
        {audioValue && (
          <div>
            <audio controls src={audioValue.content}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    );
  };

  const renderSubchapterOptions = () => {
    const selectedChapterObj = chapters.find(c => c.id === selectedChapter);
    console.log('Selected chapter object:', selectedChapterObj);

    if (!selectedChapterObj || !selectedChapterObj.subchapters || selectedChapterObj.subchapters.length === 0) {
      return [
        <SelectItem key="no-subchapter" value="">
          Tidak ada subbab
        </SelectItem>
      ];
    }

    return [
      <SelectItem key="no-subchapter" value="">
        Tanpa Subbab
      </SelectItem>,
      ...selectedChapterObj.subchapters.map(subchapter => (
        <SelectItem key={subchapter.id} value={subchapter.id}>
          {subchapter.title}
        </SelectItem>
      ))
    ];
  };

  const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Selected chapter:', e.target.value);
    setSelectedChapter(e.target.value);
    setSelectedSubchapter('');
  };

  return (
    <Card className="bg-gray-800 border border-gray-700 shadow-md mb-4">
      <CardBody className="space-y-4">
        <Input
          label="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="bg-gray-700 text-gray-200"
        />
        {renderMediaContent()}
        {values.map((value, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <Select
              label="Type"
              selectedKeys={[value.type]}
              onSelectionChange={(keys) => {
                const selectedType = Array.from(keys)[0] as FlashcardValue['type'];
                handleValueChange(index, 'type', selectedType);
              }}
              className="bg-gray-700 text-gray-200"
              disallowEmptySelection
            >
              <SelectItem key="text" value="text">Text</SelectItem>
              <SelectItem key="audio" value="audio">Audio</SelectItem>
              <SelectItem key="picture" value="picture">Picture</SelectItem>
            </Select>
            {value.type === 'text' ? (
              <Input
                label="Content"
                value={value.content}
                onChange={(e) => handleValueChange(index, 'content', e.target.value)}
                className="bg-gray-700 text-gray-200 flex-grow"
              />
            ) : (
              <Input
                type="file"
                accept={value.type === 'audio' ? 'audio/*' : 'image/*'}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleValueChange(index, 'content', URL.createObjectURL(file));
                  }
                }}
                className="bg-gray-700 text-gray-200 flex-grow"
              />
            )}
            {values.length > 1 && (
              <Button color="danger" onClick={() => handleDeleteValue(index)}>
                Delete
              </Button>
            )}
          </div>
        ))}
        <Button onClick={handleAddValue}>Add Value</Button>
        
        <Checkbox
          isSelected={useChapter}
          onValueChange={(isSelected: boolean) => {
            setUseChapter(isSelected);
            if (!isSelected) {
              setSelectedChapter('');
              setSelectedSubchapter('');
            }
          }}
          color="primary"
        >
          Gunakan Bab
        </Checkbox>

        {useChapter && (
          <>
            <Select
              label="Pilih Bab"
              selectedKeys={selectedChapter ? [selectedChapter] : []}
              onChange={handleChapterChange}
              className="bg-gray-700 text-gray-200"
            >
              {chapters.map((chapter) => (
                <SelectItem key={chapter.id} value={chapter.id}>
                  {chapter.title}
                </SelectItem>
              ))}
            </Select>

            {selectedChapter && (
              <Select
                label="Pilih Subbab (Opsional)"
                selectedKeys={selectedSubchapter ? [selectedSubchapter] : []}
                onChange={(e) => {
                  console.log('Selected subchapter:', e.target.value);
                  setSelectedSubchapter(e.target.value);
                }}
                className="bg-gray-700 text-gray-200"
              >
                {renderSubchapterOptions()}
              </Select>
            )}
          </>
        )}

        <Button color="primary" onClick={handleSave}>
          Simpan Flashcard
        </Button>
      </CardBody>
    </Card>
  );
};

interface DroppableAreaProps {
  chapterId: string;
  subchapterId?: string;
  onDrop: (flashcardId: string, chapterId: string, subchapterId?: string) => void;
}

export const DroppableArea: React.FC<DroppableAreaProps> = ({ chapterId, subchapterId, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FLASHCARD',
    drop: (item: { id: string }) => onDrop(item.id, chapterId, subchapterId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Menggabungkan ref dari useDrop dengan ref kita sendiri
  drop(ref);

  return (
    <div
      ref={ref}
      style={{ 
        backgroundColor: isOver ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
        padding: '1rem',
        marginBottom: '1rem',
        border: '2px dashed #4B5563',
        borderRadius: '0.5rem',
      }}
    >
      {isOver ? 'Drop flashcard here' : 'Drag flashcard here'}
    </div>
  );
};
