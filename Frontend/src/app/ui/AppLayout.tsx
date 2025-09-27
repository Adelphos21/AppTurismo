import type { ReactNode } from 'react';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 to-rose-100">
      <nav className="bg-rose-700 text-white shadow-lg px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-2xl tracking-tight">CityGuides</span>
        <div className="space-x-4">
          <a href="/" className="hover:text-rose-200 transition">Inicio</a>
          <a href="/guides" className="hover:text-rose-200 transition">Guías</a>
          <a href="/login" className="hover:text-rose-200 transition">Iniciar Sesión</a>
        </div>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">{children}</main>
      <footer className="bg-rose-700 text-white text-center p-3 mt-8 shadow-inner">
        &copy; {new Date().getFullYear()} CityGuides
      </footer>
    </div>
  );
}
