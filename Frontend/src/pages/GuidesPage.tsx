import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGuides } from "servicios/guides";
import { FaMapMarkerAlt, FaSearch, FaStar } from "react-icons/fa";

interface Guide {
  id: string;
  nombres: string;
  apellidos: string;
  bio: string;
  city: string;
  country: string;
  languages: { idioma: string; nivel: string }[];
  hourlyRate?: { amount: number; currency: string };
  ratingAvg?: number;
}

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);

  const cities = [
    "Lima",
    "Cusco",
    "Arequipa",
    "Iquitos",
    "Trujillo",
    "Puno",
    "Tarapoto",
  ];

  // 🔍 Buscar guías desde el backend (no localmente)
  useEffect(() => {
    async function fetchGuides() {
      try {
        setLoading(true);
        const params: Record<string, string> = {};
        if (selectedCity) params.city = selectedCity;
        if (search) params.language = search; // o podrías buscar por city/name si tu microservicio lo soporta

        const data = await getGuides(params);
        console.log("📦 Datos desde /guides/search:", data);

        // Si tu microservicio responde con { guides: [...] }
        setGuides(Array.isArray(data) ? data : data?.guides || []);
      } catch (err) {
        console.error("❌ Error al cargar guías:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGuides();
  }, [search, selectedCity]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Título */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Encuentra tu guía peruano perfecto
        </h1>
        <p className="text-gray-600 mt-2">
          Explora perfiles de guías locales certificados en todo Perú
        </p>
      </div>

      {/* Buscador + filtro */}
      <div className="max-w-6xl mx-auto bg-white p-5 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 mb-10">
        <div className="flex items-center w-full md:w-2/3 border rounded-md px-4 py-2">
          <FaSearch className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Buscar por idioma..."
            className="w-full outline-none text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="w-full md:w-1/3 border rounded-md px-4 py-2 text-gray-700 bg-gray-50"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Todas las ciudades</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Tarjetas */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-gray-600 text-center col-span-full">
            Cargando guías...
          </p>
        ) : guides.length === 0 ? (
          <p className="text-gray-600 text-center col-span-full">
            No se encontraron guías.
          </p>
        ) : (
          guides.map((g) => (
            <div
              key={g.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${g.nombres}+${g.apellidos}&background=cccccc&color=000`}
                  alt={g.nombres}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {g.nombres} {g.apellidos}
                  </h2>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaMapMarkerAlt className="text-red-500 mr-1" />
                    {g.city}, {g.country}
                  </div>
                  {g.ratingAvg && (
                    <div className="flex items-center text-yellow-500 mt-1 text-sm">
                      <FaStar className="mr-1" />
                      <span className="text-gray-800">
                        {g.ratingAvg.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4">{g.bio}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {g.languages?.map((lang, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 border border-black rounded-md px-3 py-1 text-sm"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {lang.idioma}
                  </div>
                ))}
              </div>

              <hr className="my-3 border-gray-200" />

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-600">Desde</span>
                  <p className="font-bold text-gray-900">
                    {g.hourlyRate
                      ? `${g.hourlyRate.currency === "PEN" ? "S/" : ""}${g.hourlyRate.amount} /hora`
                      : "S/ 55 /hora"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/guides/${g.id}`}
                    className="border border-black px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 transition"
                  >
                    Ver perfil
                  </Link>
                  <Link
                    to={`/reservations/new/${g.id}`}
                    className="bg-black text-white px-3 py-1.5 rounded-md text-sm hover:bg-gray-900 transition"
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
