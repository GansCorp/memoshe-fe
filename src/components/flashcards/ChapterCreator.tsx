'use client';

import React, { useState } from 'react';
import { Input, Button, Accordion, AccordionItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Chapter } from '@/types';
import { FaPlus, FaLayerGroup, FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChapterCreatorProps {
  chapters: Chapter[];
  onCreateChapter: (title: string) => void;
  onCreateSubchapter: (chapterId: string, title: string) => void;
  onSelectChapter: (chapterId: string | null) => void;
  onSelectSubchapter: (subchapterId: string | null) => void;
  onEditChapter: (chapterId: string, newTitle: string) => void;
  onEditSubchapter: (chapterId: string, subchapterId: string, newTitle: string) => void;
  onDeleteChapter: (chapterId: string) => void;
  onDeleteSubchapter: (chapterId: string, subchapterId: string) => void;
  selectedChapter: string | null;
  selectedSubchapter: string | null;
}

export function ChapterCreator({
  chapters,
  onCreateChapter,
  onCreateSubchapter,
  onSelectChapter,
  onSelectSubchapter,
  onEditChapter,
  onEditSubchapter,
  onDeleteChapter,
  onDeleteSubchapter,
  selectedChapter,
  selectedSubchapter
}: ChapterCreatorProps) {
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newSubchapterTitles, setNewSubchapterTitles] = useState<{ [key: string]: string }>({});
  const [editingTitle, setEditingTitle] = useState<{
    id: string;
    type: 'chapter' | 'subchapter';
    chapterId?: string;
    title: string;
  } | null>(null);
  const { t } = useLanguage();

  const handleCreateChapter = () => {
    if (newChapterTitle.trim()) {
      onCreateChapter(newChapterTitle);
      setNewChapterTitle('');
    }
  };

  const handleCreateSubchapter = (chapterId: string) => {
    const title = newSubchapterTitles[chapterId];
    if (title?.trim()) {
      onCreateSubchapter(chapterId, title);
      setNewSubchapterTitles(prev => ({
        ...prev,
        [chapterId]: ''
      }));
    }
  };

  const handleSaveEdit = () => {
    if (!editingTitle) return;

    if (editingTitle.type === 'chapter') {
      onEditChapter(editingTitle.id, editingTitle.title);
    } else {
      onEditSubchapter(editingTitle.chapterId!, editingTitle.id, editingTitle.title);
    }
    setEditingTitle(null);
  };

  const renderTitle = (chapter: Chapter) => {
    if (editingTitle?.type === 'chapter' && editingTitle.id === chapter.id) {
      return (
        <Input
          value={editingTitle.title}
          onChange={(e) => setEditingTitle({ ...editingTitle, title: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
          onBlur={handleSaveEdit}
          autoFocus
          size="sm"
          className="max-w-[200px]"
          onClick={(e) => e.stopPropagation()}
        />
      );
    }
    return chapter.title;
  };

  const renderSubchapterTitle = (subchapter: NonNullable<Chapter['subchapters']>[number], chapterId: string) => {
    if (editingTitle?.type === 'subchapter' && editingTitle.id === subchapter.id) {
      return (
        <Input
          value={editingTitle.title}
          onChange={(e) => setEditingTitle({ ...editingTitle, title: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
          onBlur={handleSaveEdit}
          autoFocus
          size="sm"
          className="max-w-[200px]"
          onClick={(e) => e.stopPropagation()}
        />
      );
    }
    return (
      <Button
        color={selectedSubchapter === subchapter.id ? "primary" : "default"}
        variant={selectedSubchapter === subchapter.id ? "solid" : "bordered"}
        className="w-full"
        onClick={() => {
          onSelectChapter(chapterId);
          onSelectSubchapter(subchapter.id);
        }}
      >
        {subchapter.title}
      </Button>
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm space-y-3">
        <Input
          label={t('chapterTitle')}
          value={newChapterTitle}
          onChange={(e) => setNewChapterTitle(e.target.value)}
          placeholder={t('enterChapterTitle')}
          variant="bordered"
          startContent={<FaLayerGroup className="text-blue-400" />}
          className="bg-white"
        />
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleCreateChapter}
          startContent={<FaPlus />}
          size="lg"
        >
          {t('addChapter')}
        </Button>
      </div>

      <Accordion 
        className="bg-white rounded-lg shadow-sm"
        selectionMode="multiple"
      >
        {chapters.map((chapter) => (
          <AccordionItem 
            key={chapter.id} 
            aria-label={chapter.title}
            classNames={{
              title: "w-full",
              trigger: "hover:bg-blue-50 data-[open=true]:bg-blue-50",
              content: "bg-white"
            }}
            title={
              <div className="flex items-center justify-between w-full">
                <div className="flex-1">{renderTitle(chapter)}</div>
                <Dropdown>
                  <DropdownTrigger>
                    <span className="cursor-pointer p-1">
                      <FaEllipsisV className="text-gray-400" />
                    </span>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem
                      key="edit"
                      startContent={<FaEdit />}
                      onClick={() => setEditingTitle({
                        id: chapter.id,
                        type: 'chapter',
                        title: chapter.title
                      })}
                    >
                      {t('editChapter')}
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      startContent={<FaTrash />}
                      className="text-danger"
                      color="danger"
                      onClick={() => onDeleteChapter(chapter.id)}
                    >
                      {t('deleteChapter')}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            }
          >
            <div className="space-y-2 p-2">
              <Button
                className={`w-full ${
                  selectedChapter === chapter.id && !selectedSubchapter 
                    ? "bg-blue-500 text-white" 
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
                onClick={() => {
                  onSelectChapter(chapter.id);
                  onSelectSubchapter(null);
                }}
              >
                {t('allCards')}
              </Button>

              {chapter.subchapters?.map((subchapter) => (
                <div key={subchapter.id} className="flex items-center gap-2">
                  <div className="flex-1">
                    {renderSubchapterTitle(subchapter, chapter.id)}
                  </div>
                  <Dropdown>
                    <DropdownTrigger>
                      <span className="cursor-pointer p-1">
                        <FaEllipsisV className="text-gray-400" />
                      </span>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        key="edit"
                        startContent={<FaEdit />}
                        onClick={() => setEditingTitle({
                          id: subchapter.id,
                          type: 'subchapter',
                          chapterId: chapter.id,
                          title: subchapter.title
                        })}
                      >
                        {t('editSubchapter')}
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        startContent={<FaTrash />}
                        className="text-danger"
                        color="danger"
                        onClick={() => onDeleteSubchapter(chapter.id, subchapter.id)}
                      >
                        {t('deleteSubchapter')}
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ))}

              <div className="bg-blue-50 p-3 rounded-lg mt-4 space-y-2">
                <Input
                  label={t('subchapterTitle')}
                  value={newSubchapterTitles[chapter.id] || ''}
                  onChange={(e) => setNewSubchapterTitles(prev => ({
                    ...prev,
                    [chapter.id]: e.target.value
                  }))}
                  placeholder={t('enterSubchapterTitle')}
                  variant="bordered"
                  className="bg-white"
                  size="sm"
                />
                <Button 
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white"
                  onClick={() => handleCreateSubchapter(chapter.id)}
                  startContent={<FaPlus />}
                  size="sm"
                >
                  {t('addSubchapter')}
                </Button>
              </div>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
