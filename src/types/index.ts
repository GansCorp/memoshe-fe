export interface Flashcard {
  id: string;
  key: string;
  values: {
    type: 'text' | 'audio' | 'picture';
    content: string;
  }[];
  chapterId: string;
  subchapterId?: string;
}

export interface Chapter {
  id: string;
  title: string;
  subchapters?: Subchapter[];
}

export interface Subchapter {
  id: string;
  title: string;
}
