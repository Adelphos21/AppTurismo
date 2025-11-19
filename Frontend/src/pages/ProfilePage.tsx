import { useEffect, useState } from "react";
import { useSession } from "features/auth/useSession";
import { getMyReservations, updateReservationStatus, type Reservation } from "servicios/reservations";

export default function ProfilePage() {
  const { user, me, status } = useSession();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Verificar si el usuario está autenticado
        if (!user) {
          await me();
        }

        // Obtener el ID del usuario
        const currentUserId = user?.id || (await me(), useSession.getState().user?.id);
        if (!currentUserId) return;

        // Obtener las reservas del usuario
        const res = await getMyReservations(currentUserId);
        setReservations(res);
      } catch (err) {
        console.error("Error al cargar perfil:", err);
      } finally {
        setLoading(false);
      }
    };

    if (status !== "unauthenticated") {
      load();
    } else {
      setLoading(false);
    }
  }, [user, me, status]);

  const handleStatusChange = async (
    id: string,
    newStatus: "confirmado" | "cancelado"
  ) => {
    try {
      await updateReservationStatus(id, newStatus);
      // Después de cambiar el estado, recargar las reservas
      if (user) {
        const res = await getMyReservations(user.id);
        setReservations(res);
      }
    } catch (error) {
      console.error("Error al actualizar estado de reserva:", error);
    }
  };

  // Si está cargando o el usuario no está autenticado
  if (loading) return <p className="p-6 text-center">Cargando perfil...</p>;
  if (!user) return <p className="p-6 text-center">Debes iniciar sesión.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto pt-24">
      <h1 className="text-2xl font-semibold mb-4">Mi perfil</h1>
      
      {/* Información del usuario */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <p><strong>Nombre:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Tipo:</strong> {user.role === "guide" ? "Guía" : "Turista"}</p>
      </div>

      {/* Lista de reservas */}
      <h2 className="text-xl font-semibold mb-2">Mis reservas</h2>
      {reservations.length === 0 ? (
        <p className="text-gray-600">No tienes reservas.</p>
      ) : (
        <ul className="space-y-3">
          {reservations.map((r) => (
            <li key={r.id} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
              <div>
                <p><strong>Fecha servicio:</strong> {new Date(r.fecha_servicio).toLocaleString("es-PE")}</p>
                <p><strong>Estado:</strong> {r.estado}</p>
              </div>
              {r.estado === "pendiente" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(r.id, "confirmado")}
                    className="text-green-600 hover:underline"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => handleStatusChange(r.id, "cancelado")}
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
