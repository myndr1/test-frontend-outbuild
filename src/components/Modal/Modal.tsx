import React from 'react';
import './Modal.css';
import { IoMdClose } from 'react-icons/io';
import { ModalProps } from '../../interfaces/interfaces';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-content ${isOpen ? 'show' : ''}`}>
        <button className="close-button" onClick={onClose}>
          <IoMdClose className="icon" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
