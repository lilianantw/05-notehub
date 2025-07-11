// src/components/Modal/Modal.tsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

// Інтерфейс пропсів
interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

// Модальне вікно
const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  // Обробка Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Обробка кліку по бекдропу
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;