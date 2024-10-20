import React, { useState } from 'react';
import { Button, Input, Card, CardBody, Checkbox } from '@nextui-org/react';
import { Chapter, Subchapter } from '@/types';

interface ChapterCreatorProps {
  onSave: (chapter: Chapter) => void;
}

export const ChapterCreator: React.FC<ChapterCreatorProps> = ({ onSave }) => {
  const [chapterTitle, setChapterTitle] = useState('');
  const [subchapters, setSubchapters] = useState<Subchapter[]>([]);
  const [subchapterTitle, setSubchapterTitle] = useState('');
  const [useSubchapters, setUseSubchapters] = useState(false);

  const handleAddSubchapter = () => {
    if (subchapterTitle.trim()) {
      setSubchapters([...subchapters, { id: Date.now().toString(), title: subchapterTitle.trim() }]);
      setSubchapterTitle('');
    }
  };

  const handleSaveChapter = () => {
    if (chapterTitle.trim()) {
      onSave({
        id: Date.now().toString(),
        title: chapterTitle.trim(),
        subchapters: useSubchapters ? subchapters : [],
      });
      setChapterTitle('');
      setSubchapters([]);
      setUseSubchapters(false);
    } else {
      alert('Mohon isi judul bab');
    }
  };

  return (
    <Card className="bg-gray-800 border border-gray-700 shadow-md mb-4">
      <CardBody className="space-y-4">
        <Input
          label="Judul Bab"
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
          className="bg-gray-700 text-gray-200"
        />
        <Checkbox
          isSelected={useSubchapters}
          onValueChange={setUseSubchapters}
          color="primary"
        >
          Gunakan Subbab
        </Checkbox>
        {useSubchapters && (
          <>
            <div className="flex space-x-2">
              <Input
                label="Judul Subbab"
                value={subchapterTitle}
                onChange={(e) => setSubchapterTitle(e.target.value)}
                className="bg-gray-700 text-gray-200 flex-grow"
              />
              <Button color="primary" onClick={handleAddSubchapter}>
                Tambah Subbab
              </Button>
            </div>
            {subchapters.map((subchapter) => (
              <div key={subchapter.id} className="text-gray-300">
                {subchapter.title}
              </div>
            ))}
          </>
        )}
        <Button color="success" onClick={handleSaveChapter}>
          Simpan Bab
        </Button>
      </CardBody>
    </Card>
  );
};
