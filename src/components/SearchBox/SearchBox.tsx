// src/components/SearchBox/SearchBox.tsx
import React from 'react';
import css from './SearchBox.module.css';

// Інтерфейс пропсів
interface SearchBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  action: (formData: FormData) => void;
}

// Поле пошуку
const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange, action }) => {
  return (
    <form action={action}>
      <input
        className={css.input}
        type="text"
        name="search"
        placeholder="Search notes"
        value={value}
        onChange={onChange}
      />
    </form>
  );
};

export default SearchBox;