import { useState } from "react";

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  const minLength = 6;
  const hasNumber = /\d/;
  const hasLetter = /[a-zA-Z]/;

  if (password.length < minLength) {
    return "Password must be at least 6 characters long";
  }
  if (!hasNumber.test(password)) {
    return "Password must contain at least one number";
  }
  if (!hasLetter.test(password)) {
    return "Password must contain at least one letter";
  }
  return "";
};

const useValidation = () => {
  const [inputErrors, setInputErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateInputs = (email: string, password: string) => {
    const errors: { email?: string; password?: string } = {};

    if (!validateEmail(email)) {
      errors.email = "Invalid email format";
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      errors.password = passwordError;
    }

    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return { inputErrors, validateInputs };
};

export default useValidation;
