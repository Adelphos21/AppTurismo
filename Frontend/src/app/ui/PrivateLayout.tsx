import { PrivateNavbar } from "./PrivateNavbar";
import type { ReactNode } from "react";

export function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <PrivateNavbar />
      <main className="flex-1 w-full pt-24">{children}</main>
      <footer className="bg-gray-100 text-center p-2 relative z-10">
        &copy; {new Date().getFullYear()} CityGuides
      </footer>
    </div>
  );
}
