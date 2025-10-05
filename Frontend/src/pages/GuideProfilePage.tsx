import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getGuideById } from "servicios/guides";
import { getGuideReservations } from "servicios/reservations";
interface Guide {
  id: string;
  name: string;
  city: string;
  description?: string;
}

interface Reservation {
  id: string;
  date: string;
  status: string;
}

export default function GuideProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (id) {
      getGuideById(id).then(setGuide);
      getGuideReservations().then(setReservations);
    }
  }, [id]);

  if (!guide) return <p className="p-6">Cargando guía...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{guide.name}</h1>
      <p className="text-gray-700 mb-2">{guide.city}</p>
      {guide.description && <p className="text-gray-600 mb-4">{guide.description}</p>}

      <Link
        to={`/reservations/new?guideId=${guide.id}`}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Reservar con este guía
      </Link>

      <h2 className="text-xl font-semibold mt-6 mb-2">Reservas recientes</h2>
      <ul className="space-y-2">
        {reservations.map((r) => (
          <li key={r.id} className="border p-2 rounded bg-gray-50">
            {new Date(r.date).toLocaleDateString()} — {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
