import { useState } from "react";
import { createGuide } from "servicios/guides";

export default function RegisterGuidePage() {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    bio: "",
    city: "",
    country: "",
    certification: false,
    languages: "",
    correo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const guideToSend = {
      name: `${formData.nombres} ${formData.apellidos}`.trim(),
      city: formData.city,
    };

    try {
      await createGuide(guideToSend);
      alert("✅ Guía registrada correctamente");
      setFormData({
        nombres: "",
        apellidos: "",
        dni: "",
        bio: "",
        city: "",
        country: "",
        certification: false,
        languages: "",
        correo: "",
      });
    } catch (err) {
      console.error("Error registrando guía:", err);
      alert("❌ Ocurrió un error al registrar el guía");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 pt-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* 🧾 Columna izquierda: formulario */}
        <div className="bg-white p-8 rounded-2xl shadow border border-gray-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Regístrate como Guía</h2>
          <p className="text-gray-600 mb-6">
            Comparte tus conocimientos y experiencias únicas con viajeros de todo el mundo 🌍.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="nombres" value={formData.nombres} onChange={handleChange} placeholder="Nombres" required className="border rounded-md p-2" />
              <input name="apellidos" value={formData.apellidos} onChange={handleChange} placeholder="Apellidos" required className="border rounded-md p-2" />
            </div>

            <input name="dni" value={formData.dni} onChange={handleChange} placeholder="DNI (8 dígitos)" required className="border rounded-md p-2" />

            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Cuéntanos sobre ti y tus experiencias..." required className="border rounded-md p-2 h-24" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="city" value={formData.city} onChange={handleChange} placeholder="Ciudad" required className="border rounded-md p-2" />
              <input name="country" value={formData.country} onChange={handleChange} placeholder="País" required className="border rounded-md p-2" />
            </div>

            <input name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo electrónico" type="email" required className="border rounded-md p-2" />

            <input name="languages" value={formData.languages} onChange={handleChange} placeholder="Idiomas (separados por coma)" className="border rounded-md p-2" />

            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" name="certification" checked={formData.certification} onChange={handleChange} className="h-4 w-4" />
              <span className="text-gray-700">Tengo certificación oficial</span>
            </label>

            <button type="submit" className="bg-black text-white py-2 rounded-md mt-4 hover:bg-gray-900 transition">
              Registrar Guía
            </button>
          </form>
        </div>

        {/* 🖼️ Columna derecha: imagen */}
        <div className="hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200&auto=format&fit=crop"
            alt="Guía turístico mostrando un paisaje"
            className="w-full h-[600px] object-cover rounded-2xl shadow-lg border border-gray-200"
          />
        </div>
      </div>
    </div>
  );
}
