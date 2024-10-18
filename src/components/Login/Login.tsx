import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineEmail } from 'react-icons/md';
import { HiOutlineLockClosed } from 'react-icons/hi2';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
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
        <text className="subtitle"> Please enter your credentials to access your account </text>
        <div className="input-box">
          <p>Email Address</p>
          <div className="input-container">
            <span className="icon">
              <MdOutlineEmail />
            </span>
            <input
              className={inputErrors.email ? 'error' : ''}
              type="text"
              placeholder="you@example.com"
              value={credentials.email}
              onChange={handleChange}
              required
              name="email"
            />
          </div>
        </div>
        <Error error={inputErrors.email} />

        <div className="input-box">
          <p>Password</p>
          <div className="input-container">
            <span className="icon">
              <HiOutlineLockClosed />
            </span>
            <input
              className={inputErrors.password ? 'error' : ''}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
              name="password"
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
          </div>
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
