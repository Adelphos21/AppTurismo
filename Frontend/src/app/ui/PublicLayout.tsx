import { PublicNavbar } from "./PublicNavbar";
import type { ReactNode } from "react";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1 w-full">{children}</main>
      <footer className="bg-gray-100 text-center p-2 relative z-10">
        &copy; {new Date().getFullYear()} CityGuides
      </footer>
    </div>
  );
}
