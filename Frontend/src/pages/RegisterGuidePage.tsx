import { useState, type FormEvent } from "react";
import { createGuide, type GuideLanguage } from "servicios/guides";

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

  // Manejo de cambios en el formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // Actualización del estado según el tipo del campo
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Manejo de la sumisión del formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Parseo de idiomas
    const langs: GuideLanguage[] = (formData.languages || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({
        code: name.slice(0, 2).toLowerCase(),
        name,
      }));

    try {
      // Llamada a la API para registrar la guía
      await createGuide({
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        dni: formData.dni,
        bio: formData.bio,
        city: formData.city,
        country: formData.country,
        certification: formData.certification,
        languages: langs,
        correo: formData.correo,
      });

      // Si se registra correctamente, limpiar el formulario y mostrar mensaje
      alert("Guía registrado correctamente");
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
      // Manejo de errores
      console.error("Error registrando guía:", err);
      alert("Ocurrió un error al registrar el guía. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 pt-24">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Registrar guía</h1>
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="nombres">
              Nombres
            </label>
            <input
              type="text"
              id="nombres"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Apellidos */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="apellidos">
              Apellidos
            </label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* DNI */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="dni">
              DNI
            </label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="bio">
              Biografía
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Ciudad */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="city">
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* País */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="country">
              País
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Certificación */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                id="certification"
                name="certification"
                checked={formData.certification}
                onChange={handleChange}
                className="mr-2"
              />
              Certificación
            </label>
          </div>

          {/* Idiomas */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="languages">
              Idiomas (separados por coma)
            </label>
            <input
              type="text"
              id="languages"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Correo */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="correo">
              Correo electrónico
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Botón de enviar */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Registrar Guía
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
