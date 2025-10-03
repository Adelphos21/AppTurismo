import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProviders } from '@app/providers';
import { AppRouter } from '@app/router';
import './index.css';
import './styles/utilities.css';
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ClerkProvider>
  </React.StrictMode>
);
