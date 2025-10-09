import { useState, useEffect } from "react";
import { Search, MapPin, Languages, Shield, X } from "lucide-react";
import { getGuides } from "servicios/guides";
import { getUserReservations } from "servicios/reservations";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const CIUDADES = ["Todas", "Cusco", "Arequipa", "Lima", "Puno", "Iquitos"];
const IDIOMAS = ["Todos", "Español", "Inglés", "Francés", "Alemán"];

export default function Dashboard() {
  const { user } = useUser();

  const [filters, setFilters] = useState({
    name: "",
    city: "",
    language: "",
    certified: false,
  });

  const [reservations, setReservations] = useState<any[]>([]);
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Cargar reservas del usuario
  useEffect(() => {
    const fetchReservations = async () => {
      if (user?.id) {
        try {
          const res = await getUserReservations(user.id);
          setReservations(res || []);
        } catch (err) {
          console.error("Error al cargar reservas:", err);
        }
      }
    };
    fetchReservations();
  }, [user]);

  // Buscar guías
  const handleSearch = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (filters.city && filters.city !== "Todas") params.city = filters.city;
      if (filters.language && filters.language !== "Todos")
        params.language = filters.language;

      const data = await getGuides(params);
      setGuides(data);
    } catch (err) {
      console.error("Error al buscar guías:", err);
    } finally {
      setLoading(false);
    }
  };

  // Limpiar un filtro específico
  const clearFilter = (key: string) => {
    if (key === "certified") setFilters({ ...filters, certified: false });
    else setFilters({ ...filters, [key]: "" });
  };

  // Detectar si hay filtros activos
  const activeFilters = [
    filters.city && filters.city !== "Todas" ? filters.city : null,
    filters.language && filters.language !== "Todos" ? filters.language : null,
    filters.certified ? "Certificado" : null,
  ].filter(Boolean);

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* --- HEADER --- */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">
        Bienvenido de vuelta, {user?.firstName || "viajero"}
      </h1>
      <p className="text-gray-600 mb-10">
        Descubre nuevas experiencias en Perú
      </p>

      {/* --- BUSCADOR --- */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
          <Search className="w-5 h-5" />
          Buscar guías peruanos
        </h2>

        {/* FILTROS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Nombre */}
          <input
            type="text"
            placeholder="Nombre o especialidad..."
            className="border rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-black"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />

          {/* Ciudad */}
          <div className="relative">
            <select
              className="border rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-black appearance-none"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            >
              <option value="">Ciudad</option>
              {CIUDADES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <MapPin className="absolute right-3 top-2.5 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* Idioma */}
          <div className="relative">
            <select
              className="border rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-black appearance-none"
              value={filters.language}
              onChange={(e) =>
                setFilters({ ...filters, language: e.target.value })
              }
            >
              <option value="">Idioma</option>
              {IDIOMAS.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <Languages className="absolute right-3 top-2.5 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* Certificación */}
          <button
            type="button"
            onClick={() =>
              setFilters({ ...filters, certified: !filters.certified })
            }
            className={`border rounded-lg px-3 py-2 flex items-center justify-center gap-2 transition font-medium ${
              filters.certified
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Shield className="w-5 h-5" />
            Certificación
          </button>
        </div>

        {/* Botón Buscar */}
        <button
          onClick={handleSearch}
          className="bg-black text-white font-semibold w-full rounded-lg py-3 flex items-center justify-center hover:bg-gray-900 transition"
        >
          <Search className="w-5 h-5 mr-2" />
          {loading ? "Buscando..." : "Buscar guías"}
        </button>

        {/* Filtros activos */}
        {activeFilters.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Filtros activos:</p>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((f, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm border border-gray-300"
                >
                  {f}
                  <button
                    onClick={() => {
                      if (f === "Certificado") clearFilter("certified");
                      else if (CIUDADES.includes(f as string)) clearFilter("city");
                      else clearFilter("language");
                    }}
                    className="hover:text-red-500 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- RESULTADOS DE GUÍAS --- */}
      {guides.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Resultados de búsqueda</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((g) => (
              <div
                key={g.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
              >
                <img
                  src={g.photo || "https://via.placeholder.com/400x200"}
                  alt={g.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold text-lg">{g.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{g.city}</p>
                <Link
                  to={`/guides/${g.id}`}
                  className="text-sm text-white bg-black px-4 py-2 rounded-md inline-block hover:bg-gray-800 transition"
                >
                  Ver perfil
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- PRÓXIMAS RESERVAS --- */}
      {reservations.length > 0 && (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Próximas reservas</h2>
            <Link to="/reservas" className="text-sm text-gray-600 hover:underline">
              Ver todas →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {reservations.slice(0, 2).map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={r.guidePhoto || "https://via.placeholder.com/100"}
                    alt={r.guideName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{r.guideName}</h3>
                    <p className="text-gray-500 text-sm">{r.city}</p>
                    <p className="text-sm text-gray-600">
                      📅 {r.date} · ⏰ {r.time}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/reservas/${r.id}`}
                  className="mt-3 inline-block text-sm text-white bg-black px-4 py-2 rounded-md hover:bg-gray-800 transition"
                >
                  Ver detalles
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- DESTINOS RECOMENDADOS --- */}
      <section className="py-10">
        <h2 className="text-xl font-semibold mb-6">
          Destinos recomendados para ti
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              city: "Cusco",
              desc: "Capital del Imperio Inca",
              img: "/images/cusco-plaza-de-armas-and-andes-mountains.jpg",
            },
            {
              city: "Arequipa",
              desc: "Ciudad blanca",
              img: "/images/arequipa-white-city-with-misti-volcano.jpg",
            },
            {
              city: "Lima",
              desc: "Capital gastronómica",
              img: "/images/lima-miraflores-coastline-and-city-view.jpg",
            },
            {
              city: "Iquitos",
              desc: "Aventura amazónica",
              img: "/images/iquitos-amazon-rainforest-and-river.jpg",
            },
          ].map((d) => (
            <div
              key={d.city}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
            >
              <img
                src={d.img}
                alt={d.city}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{d.city}</h3>
                <p className="text-gray-500 text-sm">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
