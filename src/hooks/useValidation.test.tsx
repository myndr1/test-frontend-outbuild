import { renderHook, act } from '@testing-library/react-hooks';
import useValidation from './useValidation';

describe('useValidation', () => {
  it('should return no errors for valid email and password', () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      const isValid = result.current.validateInputs('test@example.com', 'Password1');
      expect(isValid).toBe(true);
    });

    expect(result.current.inputErrors).toEqual({});
  });

  it('should return an error for invalid email format', () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      const isValid = result.current.validateInputs('invalid-email', 'Password1');
      expect(isValid).toBe(false);
    });

    expect(result.current.inputErrors).toEqual({ email: 'Invalid email format' });
  });

  it('should return an error for password less than 6 characters', () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      const isValid = result.current.validateInputs('test@example.com', 'Pass1');
      expect(isValid).toBe(false);
    });

    expect(result.current.inputErrors).toEqual({
      password: 'Password must be at least 6 characters',
    });
  });

  it('should return an error for password without a number', () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      const isValid = result.current.validateInputs('test@example.com', 'Password');
      expect(isValid).toBe(false);
    });

    expect(result.current.inputErrors).toEqual({
      password: 'Password must contain at least one number',
    });
  });

  it('should return an error for password without a letter', () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      const isValid = result.current.validateInputs('test@example.com', '123456');
      expect(isValid).toBe(false);
    });

    expect(result.current.inputErrors).toEqual({
      password: 'Password must contain at least one letter',
    });
  });

  it('should return errors for both invalid email and password', () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      const isValid = result.current.validateInputs('invalid-email', '123');
      expect(isValid).toBe(false);
    });

    expect(result.current.inputErrors).toEqual({
      email: 'Invalid email format',
      password: 'Password must be at least 6 characters',
    });
  });
});
