import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import { AppLayout } from './ui/AppLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout><HomePage /></AppLayout>,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
