import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getUserReservations, cancelReservation } from "servicios/reservations";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";

export default function MisReservasPage() {
  const { user, isLoaded } = useUser();
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    (async () => {
      try {
        const data = await getUserReservations(user.id);
        setReservas(data);
      } catch (err) {
        console.error("Error al cargar reservas:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [isLoaded, user]);

  const handleCancel = async (id: string) => {
    try {
      await cancelReservation(id, {});
      setReservas(prev =>
        prev.map(r => (r._id === id ? { ...r, estado: "cancelado" } : r))
      );
    } catch (err) {
      console.error("Error al cancelar reserva:", err);
    }
  };

  if (!isLoaded || loading) {
    return <div className="p-6 text-center">Cargando reservas...</div>;
  }

  if (!reservas.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        No tienes reservas aún.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Mis Reservas</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {reservas.map((reserva) => (
          <div
            key={reserva._id}
            className="bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between border border-gray-100"
          >
            <div>
              <p className="text-lg font-semibold">
                Servicio:{" "}
                {format(new Date(reserva.fecha_servicio), "PPP", { locale: es })}
              </p>
              <p className="text-gray-500">
                Duración: {reserva.duracion_horas} hora
                {reserva.duracion_horas > 1 ? "s" : ""}
              </p>
              <p className="text-gray-500">Precio total: S/ {reserva.precio_total}</p>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                  reserva.estado === "pendiente"
                    ? "bg-yellow-100 text-yellow-700"
                    : reserva.estado === "confirmado"
                    ? "bg-green-100 text-green-700"
                    : reserva.estado === "cancelado"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {reserva.estado.toUpperCase()}
              </span>

              {reserva.comentario && (
                <p className="mt-3 text-gray-600 italic">“{reserva.comentario}”</p>
              )}
            </div>

            <div className="mt-4 flex justify-end gap-3">
              {reserva.estado === "pendiente" && (
                <button
                  onClick={() => handleCancel(reserva._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Cancelar
                </button>
              )}
              <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">
                Ver detalle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
