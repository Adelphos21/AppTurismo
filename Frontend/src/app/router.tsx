import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './ui/AppLayout';
// ...importar páginas y guards

const router = createBrowserRouter([
  // Definir rutas aquí
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
