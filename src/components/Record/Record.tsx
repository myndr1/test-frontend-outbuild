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
    <div className="record-container">
      <div className="attributes">
        <div className="id">
          <text> {comment.id} </text>
        </div>
        <div className="text">
          <h1> {comment.name} </h1>
        </div>
        <div className="text">
          <h1> {comment.email} </h1>
        </div>
      </div>
      <div className="icon-container">
        <FaEye className="icon" onClick={handleIconClick} />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="modal-header">
          <h1> {comment.id} </h1>
        </div>
        <div className="modal-body">
          <h1>Name:</h1>
          <p>{comment.name}</p>

          <h1>Email:</h1>
          <p>{comment.email}</p>

          <h1>Body:</h1>
          <p>{comment.body}</p>
        </div>
      </Modal>
    </div>
  );
};

export default Record;
