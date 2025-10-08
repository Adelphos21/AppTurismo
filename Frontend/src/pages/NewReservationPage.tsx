import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGuideById } from "servicios/guides";
import { createReservation } from "servicios/reservations";

export default function NewReservationPage() {
  const { guideId } = useParams();
  const [guide, setGuide] = useState<any>(null);
  const [duracion, setDuracion] = useState(4);
  const [mensaje, setMensaje] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (guideId) {
      getGuideById(guideId)
        .then((data) => setGuide(data))
        .catch((err) => console.error("Error cargando guía:", err));
    }
  }, [guideId]);

  const tarifaPorHora = 50;
  const tarifaServicio = 20;
  const total = tarifaPorHora * duracion + tarifaServicio;

  const cityImages: Record<string, string> = {
    Lima: "/images/lima-miraflores-coastline-and-city-view.jpg",
    Cusco: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1600&q=80",
    Arequipa: "/images/arequipa-white-city-with-misti-volcano.jpg",
    Iquitos: "/images/iquitos-jungle-river.jpg",
    Trujillo: "/images/trujillo.jpg",
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=1600&q=80";

  const bannerImage =
    cityImages[guide?.city as keyof typeof cityImages] || defaultImage;

  // 🧾 Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideId || !guide) return alert("Guía no encontrada.");

    const reservationData = {
      guideId,
      date: fecha,
      time: hora,
      duration: duracion,
      message: mensaje,
      total,
    };

    try {
      setLoading(true);
      await createReservation(reservationData);
      alert("✅ Reserva creada con éxito");
      setMensaje("");
      setFecha("");
      setHora("");
    } catch (error) {
      console.error("Error creando reserva:", error);
      alert("❌ Error al crear la reserva");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🖼 Banner superior */}
      <div className="relative w-full h-64 md:h-80 bg-gray-200">
        <img
          src={bannerImage}
          alt={guide?.city || "Paisaje peruano"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {guide?.city
              ? `Reserva tu experiencia en ${guide.city}`
              : "Reserva tu experiencia"}
          </h1>
          <p className="text-lg text-gray-200">
            Descubre lo mejor de Perú con guías locales certificados
          </p>
        </div>
      </div>

      {/* 📦 Contenedor principal */}
      <div className="relative z-10 max-w-6xl mx-auto -mt-20 md:-mt-28 px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🧾 Formulario */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Nueva reserva</h2>
            <p className="text-gray-600 mb-6">
              Completa los detalles de tu tour con {guide?.nombres || "tu guía"}.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1">Fecha *</span>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="border rounded-md p-2"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1">Hora de inicio *</span>
                <input
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="border rounded-md p-2"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1">Duración (horas) *</span>
                <select
                  value={duracion}
                  onChange={(e) => setDuracion(Number(e.target.value))}
                  className="border rounded-md p-2"
                >
                  <option value="2">2 horas</option>
                  <option value="4">4 horas</option>
                  <option value="6">6 horas</option>
                </select>
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1">
                  Mensaje para el guía (opcional)
                </span>
                <textarea
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={4}
                  placeholder="Escribe un mensaje para tu guía..."
                  className="border rounded-md p-2 resize-none"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "bg-gray-400" : "bg-black hover:bg-gray-900"
                } text-white py-2 rounded-md mt-4 transition`}
              >
                {loading ? "Enviando..." : "Confirmar reserva"}
              </button>
            </form>
          </div>

          {/* 👤 Info del guía + resumen */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tu guía</h3>
              {guide ? (
                <div className="flex items-center gap-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${guide.nombres}+${guide.apellidos}&background=cccccc&color=000`}
                    alt={guide.nombres}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-medium text-gray-800 text-lg">
                      {guide.nombres} {guide.apellidos}
                    </p>
                    <p className="text-sm text-gray-600">
                      📍 {guide.city}, {guide.country}
                    </p>
                    <div className="flex items-center text-yellow-500 text-sm mt-1">
                      ⭐ 4.8 <span className="text-gray-500 ml-1">(127)</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Cargando datos del guía...</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resumen de precio
              </h3>
              <div className="flex justify-between text-gray-700 text-sm mb-2">
                <span>
                  S/ {tarifaPorHora} × {duracion} horas
                </span>
                <span>S/ {tarifaPorHora * duracion}</span>
              </div>
              <div className="flex justify-between text-gray-700 text-sm mb-2">
                <span>Tarifa de servicio</span>
                <span>S/ {tarifaServicio.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-gray-900 text-lg">
                <span>Total</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
