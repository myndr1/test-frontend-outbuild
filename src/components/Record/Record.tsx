import React from 'react';
import './Record.css';
import { CommentProps } from '../../interfaces/interfaces';
import { FaEye } from 'react-icons/fa';

const Record: React.FC<CommentProps> = ( { comment }) => {
    return (
        <div className = "record-container">
            <div className="attributes">
                <div className="id">
                    <h1> {comment.id} </h1>
                </div>
                <div className="text">
                    <h1> {comment.name} </h1>
                </div>
                <div className="text">
                    <h1> {comment.email} </h1>
                </div>
            </div>
            <div className="icon-container">
                <FaEye className="icon"/>
            </div>
        </div>
    );
};

export default Record;