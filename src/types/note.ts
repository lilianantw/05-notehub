// Типи для нотаток

// Тип для тегів
export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

// Інтерфейс для нотатки
export interface Note {
  id: number; // Унікальний ID
  title: string; // Заголовок (3-50 символів)
  content: string; // Вміст (макс. 500 символів)
  createdAt: string; // Дата створення (ISO-рядок)
  updatedAt: string; // Дата оновлення (ISO-рядок)
  tag: NoteTag; // Тег
}
