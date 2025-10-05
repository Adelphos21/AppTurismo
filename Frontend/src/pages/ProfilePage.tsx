// src/pages/ProfilePage.tsx
import { useEffect, useState } from "react";
import { useApi } from "api/useApi";

interface User {
  id: string;
  name: string;
  email: string;
  role: "tourist" | "guide";
}

interface Reservation {
  id: string;
  guideName?: string;
  touristName?: string;
  date: string;
  status: string;
}

export default function ProfilePage() {
  const { get, patch } = useApi(); // usamos métodos de nuestro hook
  const [user, setUser] = useState<User | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar perfil y reservas del usuario
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, resData] = await Promise.all([
          get("/me"),
          get("/reservations/me"),
        ]);
        setUser(userData);
        setReservations(resData);
      } catch (error) {
        console.error("Error al cargar datos del perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔹 Cambiar estado de reserva
  const handleStatusChange = async (id: string, status: "confirmed" | "cancelled") => {
    try {
      await patch(`/reservations/${id}/status`, { status });
      const updated = await get("/reservations/me");
      setReservations(updated);
    } catch (error) {
      console.error("Error al actualizar estado de reserva:", error);
    }
  };

  if (loading) return <p className="p-6 text-center">Cargando perfil...</p>;
  if (!user) return <p className="p-6 text-center">No se pudo cargar tu perfil.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Mi perfil</h1>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Tipo:</strong> {user.role === "guide" ? "Guía" : "Turista"}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Mis reservas</h2>
      {reservations.length === 0 ? (
        <p className="text-gray-600">No tienes reservas.</p>
      ) : (
        <ul className="space-y-3">
          {reservations.map((r) => (
            <li key={r.id} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
              <div>
                <p><strong>Fecha:</strong> {new Date(r.date).toLocaleDateString()}</p>
                <p><strong>Estado:</strong> {r.status}</p>
              </div>
              {r.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(r.id, "confirmed")}
                    className="text-green-600 hover:underline"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => handleStatusChange(r.id, "cancelled")}
                    className="text-red-600 hover:underline"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
