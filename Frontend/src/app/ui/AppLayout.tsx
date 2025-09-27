import type { ReactNode } from 'react';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-700 text-white p-4">CityGuides Navbar</nav>
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <footer className="bg-gray-100 text-center p-2">&copy; {new Date().getFullYear()} CityGuides</footer>
    </div>
  );
}
