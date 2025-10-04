import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function HomePage() {

  const { getToken } = useAuth();   // hook de Clerk
  const [result, setResult] = useState(null);

  useEffect(() => {
    const callBackend = async () => {
      try {
        const token = await getToken({ template: "default" }); // <-- tu JWT de Clerk
        console.log("TOKEN:", token); // para verlo en consola

        const res = await fetch("http://127.0.0.1:8000/api/auth/private/", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`, // <-- Django lo recibe aquí
          },
        });

        const data = await res.json();
        setResult(data);
      } catch (err) {
        console.error("Error al llamar backend:", err);
      }
    };

    callBackend();
  }, [getToken]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-4">Bienvenido a CityGuides</h1>
      <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-xl">
        Explora, reserva y administra guías turísticos en tu ciudad favorita.
      </p>

      <div className="flex gap-4">
        <a
          href="/guides"
          className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold shadow"
        >
          Buscar Guías
        </a>

        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <button className="px-6 py-3 rounded bg-gray-200 text-blue-700 hover:bg-blue-100 transition font-semibold shadow">
              Iniciar Sesión
            </button>
          </SignInButton>
        </SignedOut>
      </div>

      {/* Mostrar respuesta del backend */}
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
