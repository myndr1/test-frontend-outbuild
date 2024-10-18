import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './Spinner.css';

const Spinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <FaSpinner className="spinner" />
    </div>
  );
};

export default Spinner;
