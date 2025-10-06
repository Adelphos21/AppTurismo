import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FaRegUserCircle } from "react-icons/fa";
import { SignedOut, SignInButton } from "@clerk/clerk-react";

export function PublicNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-200/80 backdrop-blur-md shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">
        
        {/* --- Logo e identidad --- */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21c-4.97-5.333-8-8.667-8-12a8 8 0 1 1 16 0c0 3.333-3.03 6.667-8 12z"
              />
              <circle cx="12" cy="9" r="2.5" fill="white" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-gray-900">
            CityGuides
          </span>
        </Link>

        {/* --- Enlaces de navegación --- */}
        <div className="hidden md:flex items-center space-x-8 text-gray-800 font-medium">
          <Link to="/guides" className="hover:text-black transition">
            Buscar guías
          </Link>
          
          <HashLink smooth to="/#como-funciona" className="hover:text-black transition">
            Cómo funciona
          </HashLink>

          <HashLink smooth to="/#destinos" className="hover:text-black transition">
            Destinos
          </HashLink>

          <HashLink smooth to="/#conviertete-en-guia" className="hover:text-black transition">
            Conviértete en guía
          </HashLink>
        </div>

        {/* --- Perfil / Sesión --- */}
        <div className="flex items-center space-x-6">
          <SignedOut>
            <SignInButton>
              <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-black text-white font-medium hover:bg-gray-900 transition">
                <FaRegUserCircle size={22} />
                <span>Iniciar sesión</span>
              </button>
            </SignInButton>
          </SignedOut>
        </div>  
      </div>
    </nav>
  );
}
