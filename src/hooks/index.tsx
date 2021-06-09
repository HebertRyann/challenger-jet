import React from 'react'

import { AuthProvider } from './auth'
import { ToastProvider } from './toast'
import { LoadingProvider } from './loading'
import { DataTableProvider } from './dataTable'

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <LoadingProvider>
        <DataTableProvider>{children}</DataTableProvider>
      </LoadingProvider>
    </ToastProvider>
  </AuthProvider>
)

export default AppProvider
