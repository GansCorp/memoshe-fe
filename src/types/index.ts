export interface Flashcard {
  id: string;
  key: string;
  values: {
    type: 'text' | 'picture' | 'audio';
    content: string;
  }[];
}
