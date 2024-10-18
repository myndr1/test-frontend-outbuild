import React from 'react';

import './assets/styles/colors.css';

import { AuthProvider } from './context/AuthContext';
import AppRoutes from './components/AppRoutes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
