import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaRegUserCircle } from "react-icons/fa";
import { Gift, Heart, HelpCircle } from "lucide-react";

export function PublicNavbar() {
  return (
    <nav className="bg-gray-300 border-b px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-gray-800">
        CityGuides
      </Link>

      {/* Menú usuario */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-gray-600">
            <FaRegUserCircle className="text-black" size={28} />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          className="bg-white text-gray-800 rounded-md shadow-lg border min-w-[220px] p-1"
          sideOffset={8}
        >
          {/* Iniciar sesión / Registrarse */}
          <SignedOut>
            <DropdownMenu.Item asChild>
              <SignInButton>
                <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 w-full text-left">
                  <FaRegUserCircle size={18} />
                  <span>Iniciar sesión / Registrarse</span>
                </button>
              </SignInButton>
            </DropdownMenu.Item>
          </SignedOut>

          <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />

          {/* Más opciones */}
          <DropdownMenu.Item asChild>
            <Link
              to="/rewards"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
            >
              <Gift size={18} />
              <span>Viator Rewards</span>
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <Link
              to="/wishlist"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
            >
              <Heart size={18} />
              <span>Listas de deseos</span>
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <Link
              to="/help"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
            >
              <HelpCircle size={18} />
              <span>Ayuda</span>
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </nav>
  );
}
