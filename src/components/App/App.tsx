// src/components/App/App.tsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Loader from '../Loader/Loader';
import css from './App.module.css';

// Основний компонент
const App: React.FC = () => {
  const [page, setPage] = useState(1); // Поточна сторінка
  const [search, setSearch] = useState(''); // Пошуковий запит
  const [debouncedSearch] = useDebounce(search, 500); // Відкладений пошук
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан модалки

  // Запит нотаток
  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, 12, debouncedSearch),
  });

  // Обробка пошуку
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // Form Action для пошуку
  const handleSearchSubmit = async (formData: FormData) => {
    const searchValue = formData.get('search') as string;
    setSearch(searchValue);
    setPage(1);
  };

  // Зміна сторінки
  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  // Управління модалкою
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={handleSearchChange}
          action={handleSearchSubmit}
        />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={handlePageChange}
            currentPage={page - 1}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {error && <div>Error: {(error as Error).message}</div>}
      {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <div>No notes found</div>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default App;