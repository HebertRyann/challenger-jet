import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { LoadingProvider } from './loading';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <LoadingProvider>{children}</LoadingProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
