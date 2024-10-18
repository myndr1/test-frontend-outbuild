import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

const TestComponent: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
      <button
        onClick={() => login('prologin@prologin.com', 'ProLogin123456')}
        data-testid="login-button"
      >
        Login
      </button>
      <button onClick={logout} data-testid="logout-button">
        Logout
      </button>
    </div>
  );
};

const InvalidTestComponent: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = () => {
    try {
      login('invalid@invalid.com', 'invalid');
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
      <button onClick={handleLogin} data-testid="login-button">
        Login
      </button>
      {errorMessage && <div data-testid="error-message">{errorMessage}</div>}
    </div>
  );
};

describe('AuthContext', () => {
  it('should initialize as not authenticated', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByTestId('auth-status').textContent).toBe('Not Authenticated');
  });

  it('should authenticate with valid credentials', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    fireEvent.click(screen.getByTestId('login-button'));

    expect(screen.getByTestId('auth-status').textContent).toBe('Authenticated');
  });

  it('should not authenticate with invalid credentials', () => {
    render(
      <AuthProvider>
        <InvalidTestComponent />
      </AuthProvider>,
    );

    fireEvent.click(screen.getByTestId('login-button'));

    expect(screen.getByTestId('auth-status').textContent).toBe('Not Authenticated');
    expect(screen.getByTestId('error-message').textContent).toBe('Invalid credentials');
  });

  it('should logout successfully', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    fireEvent.click(screen.getByTestId('login-button'));
    fireEvent.click(screen.getByTestId('logout-button'));

    expect(screen.getByTestId('auth-status').textContent).toBe('Not Authenticated');
  });
});
