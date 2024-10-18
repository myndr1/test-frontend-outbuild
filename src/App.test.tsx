import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './components/AppRoutes/AppRoutes';

jest.mock('./context/AuthContext', () => ({
  AuthProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('./components/AppRoutes/AppRoutes', () => jest.fn(() => <div>AppRoutes Component</div>));

describe('App Component', () => {
  it('should render without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('AppRoutes Component')).toBeInTheDocument();
  });

  it('should wrap AppRoutes with AuthProvider', () => {
    render(<App />);
    expect(AuthProvider).toHaveBeenCalled();
    expect(AppRoutes).toHaveBeenCalled();
  });
});
