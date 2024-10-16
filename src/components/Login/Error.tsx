import React from 'react';
import { FaCircleExclamation } from 'react-icons/fa6';

import './Login.css';

import { ErrorProps } from '../../interfaces/interfaces';

const Error: React.FC<ErrorProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="error-container">
      <FaCircleExclamation className="icon" />
      <span>{error}</span>
    </div>
  );
};

export default Error;
