import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import type { FetchNotesResponse } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Loader from '../Loader/Loader';
import css from './App.module.css';

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isFetching, error } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, 12, debouncedSearch),
    // keepPreviousData: true, // ❌ прибрано
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && 'totalPages' in data && data.totalPages > 1 && (
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

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>Error: {(error as Error).message}</div>
      ) : data && 'notes' in data && data.notes.length > 0 ? (
        <>
          {isFetching && <div>Updating...</div>}
          <NoteList notes={data.notes} />
        </>
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
