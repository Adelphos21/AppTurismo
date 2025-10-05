import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createReservation } from "servicios/reservations";

export default function NewReservationPage() {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const guideId = params.get("guideId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideId) return alert("Falta el ID del guía");

    setLoading(true);
    await createReservation({ guideId, date });
    setLoading(false);
    alert("Reserva creada correctamente ✅");
    navigate("/profile");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Nueva reserva</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Fecha de reserva:</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creando..." : "Confirmar reserva"}
        </button>
      </form>
    </div>
  );
}
