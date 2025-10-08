import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  Home,
  Compass,
  Calendar,
  UserCog,
  BarChart,
} from "lucide-react";
import {
  SignedIn,
  UserButton,
  useUser,
  useClerk,
} from "@clerk/clerk-react";

export function PrivateNavbar() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();

  const isGuide = user?.publicMetadata?.role === "guide";

  return (
    <>
      {/* NAV superior */}
      <nav className="fixed top-0 left-0 w-full z-[50] bg-gray-100/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* --- Logo y menú --- */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="p-2"
              aria-label="Abrir menú"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link
              to="/"
              className="text-xl font-semibold text-gray-900"
            >
              CityGuides
            </Link>
          </div>

          {/* --- Avatar usuario (Clerk) --- */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* SIDEBAR IZQUIERDO */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[80] transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full py-8 px-6 space-y-6">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <Home size={20} /> Inicio
          </Link>

          <Link
            to="/guides"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <Compass size={20} /> Explorar guías
          </Link>

          <Link
            to="/reservations"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <Calendar size={20} /> Mis reservas
          </Link>

          <Link
            to="/become-guide"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <UserCog size={20} /> Convertirme en guía
          </Link>

          {isGuide && (
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3"
            >
              <BarChart size={20} /> Dashboard
            </Link>
          )}

          <button
            onClick={() => {
              signOut();
              setOpen(false);
            }}
            className="flex items-center gap-3 text-red-500 mt-auto"
          >
            <LogOut size={20} /> Cerrar sesión
          </button>
        </div>
      </div>

      {/* --- Overlay (fondo oscuro al abrir menú) --- */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
