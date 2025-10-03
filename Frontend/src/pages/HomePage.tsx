import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-4">Bienvenido a CityGuides</h1>
      <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-xl">
        Explora, reserva y administra guías turísticos en tu ciudad favorita. Plataforma moderna, rápida y segura.
      </p>
      <div className="flex gap-4">
  <a
    href="/guides"
    className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold shadow"
  >
    Buscar Guías
  </a>

  {/* Mostrar botón de usuario si ya está logueado */}
  <SignedIn>
    <UserButton />
  </SignedIn>

  {/* Mostrar botón de login si está deslogueado */}
  <SignedOut>
    <SignInButton>
      <button className="px-6 py-3 rounded bg-gray-200 text-blue-700 hover:bg-blue-100 transition font-semibold shadow">
        Iniciar Sesión
      </button>
    </SignInButton>
  </SignedOut>
</div>
    </div>
  );
}
