import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import AuthProvider from './contexts/AuthProvider.jsx';
import './index.css';
import { router } from './routes/AppRoutes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
        <Toaster />
    </AuthProvider>
  </StrictMode>,
)
