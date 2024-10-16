import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

import { Credentials } from '../../interfaces/interfaces';
import { useAuth } from '../../context/AuthContext';
import useValidation from '../../hooks/useValidation';
import Error from './Error';

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' });
  const { inputErrors, validateInputs } = useValidation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInputs(credentials.email, credentials.password)) {
      return;
    }

    try {
      login(credentials.email, credentials.password);
      toast.success('¡Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>ProLogin</h1>
        <div className="input-box">
          <input
            className={inputErrors.email ? 'error' : ''}
            type="text"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
            name="email"
          />
          <FaUser className="icon" />
        </div>
        <Error error={inputErrors.email} />

        <div className="input-box">
          <input
            className={inputErrors.password ? 'error' : ''}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            name="password"
          />
          <span className="icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <Error error={inputErrors.password} />

        <button type="submit"> Login </button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Login;
