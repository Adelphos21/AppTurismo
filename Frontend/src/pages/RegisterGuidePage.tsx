import { useState } from "react";
import { createGuide } from "servicios/guides";
import { useNavigate } from "react-router-dom";

export default function RegisterGuidePage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createGuide({ name, city });
    setLoading(false);
    alert("¡Te has registrado como guía! ✅");
    navigate("/profile");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Registrarme como guía</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Nombre completo</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Ciudad</span>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}
