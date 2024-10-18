import React, { useState } from 'react';
import './Record.css';
import { CommentProps } from '../../interfaces/interfaces';
import { FaEye } from 'react-icons/fa';
import Modal from '../Modal/Modal';

const Record: React.FC<CommentProps> = ({ comment }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <tr className="record-row">
      <td className="record-id">{comment.id}</td>
      <td className="record-name">{comment.name}</td>
      <td className="record-email">{comment.email}</td>
      <td className="record-action">
        <span className="eye-icon" onClick={handleIconClick}>
          <FaEye />
        </span>
      </td>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="modal-header">
          <h1>Comment Details</h1>
          <button className="close-button" onClick={handleCloseModal}></button>
        </div>
        <div className="modal-body">
          <div className="info-container">
            <h1>ID</h1>
            <p>{comment.id}</p>
          </div>
          <div className="info-container">
            <h1>Name</h1>
            <p>{comment.name}</p>
          </div>
          <div className="info-container">
            <h1>Email</h1>
            <p>{comment.email}</p>
          </div>
          <div className="info-container">
            <h1>Body</h1>
            <p>{comment.body}</p>
          </div>
        </div>
      </Modal>
    </tr>
  );
};

export default Record;
