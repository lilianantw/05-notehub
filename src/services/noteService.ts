// src/services/noteService.ts
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note, NoteTag } from '../types/note';

// Інтерфейс для відповіді на запит нотаток
export interface FetchNotesResponse {
  notes: Note[]; // Масив нотаток
  totalPages: number; // Кількість сторінок
}

// Інтерфейс для даних створення нотатки
export interface CreateNotePayload {
  title: string; // Заголовок
  content: string; // Вміст
  tag: NoteTag; // Тег
}

// Екземпляр axios
const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

// Отримання нотаток
export async function fetchNotes(
  page: number = 1,
  perPage: number = 12,
  search?: string // Зроблено опціональним, щоб не передавати порожній рядок
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  // Додаємо search лише якщо він не порожній
  if (search && search.trim() !== '') {
    params.search = search.trim();
  }

  const response: AxiosResponse<FetchNotesResponse> = await api.get('/notes', {
    params,
  });

  return response.data;
}

// Створення нотатки
export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post('/notes', payload);
  return response.data;
}

// Видалення нотатки
export async function deleteNote(id: number): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
}
