import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGuides } from "servicios/guides";

interface Guide {
  id: string;
  name: string;
  city: string;
  language?: string;
}

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    getGuides({ city }).then(setGuides);
  }, [city]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Guías disponibles</h1>

      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Filtrar por ciudad..."
        className="border rounded p-2 w-full mb-4"
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {guides.map((g) => (
          <div
            key={g.id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold">{g.name}</h2>
            <p className="text-gray-600">{g.city}</p>
            <Link
              to={`/guides/${g.id}`}
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Ver perfil
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
