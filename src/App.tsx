/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider, useApp } from './contexts/AppContext';
import { AppRoutes } from './routes/AppRoutes';
import { ToastContainer } from './components/ReusableComponents';

function ToastWrapper() {
  const { toasts, removeToast } = useApp();
  return <ToastContainer toasts={toasts} onDismiss={removeToast} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <HashRouter>
          <AppRoutes />
          <ToastWrapper />
        </HashRouter>
      </AppProvider>
    </AuthProvider>
  );
}
