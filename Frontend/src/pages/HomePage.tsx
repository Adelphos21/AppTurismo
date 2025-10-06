import { Search, MapPin, Calendar, Users } from "lucide-react";
import heroImg from "assets/machu-picchu-with-tourists-and-local-guide.jpg";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* --- HERO --- */}
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[90vh] overflow-hidden">
  {/* Imagen de fondo con overlay oscuro */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroImg})`,
    }}
  ></div>

  {/* Contenido centrado encima */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
    <h1 className="text-4xl md:text-5xl font-bold mb-3">
      Descubre Perú con guías locales auténticos
    </h1>

    <p className="text-lg mb-8 max-w-2xl mx-auto">
      Conecta con guías peruanos expertos que te mostrarán los secretos mejor guardados de nuestro país
    </p>

    {/* --- Cuadro de búsqueda --- */}
    <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between w-full max-w-3xl mx-auto overflow-hidden">
      <div className="flex items-center border-b md:border-b-0 md:border-r border-gray-200 px-4 py-3 w-full md:w-1/3">
        <MapPin className="text-gray-400 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="¿A dónde quieres ir?"
          className="w-full outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="flex items-center border-b md:border-b-0 md:border-r border-gray-200 px-4 py-3 w-full md:w-1/3">
        <Calendar className="text-gray-400 w-5 h-5 mr-2" />
        <input
          type="date"
          className="w-full outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="flex items-center px-4 py-3 w-full md:w-1/3">
        <Users className="text-gray-400 w-5 h-5 mr-2" />
        <input
          type="number"
          placeholder="Personas"
          className="w-full outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>

    {/* --- Botón buscar --- */}
    <button className="bg-black text-white font-semibold w-full max-w-3xl mt-3 rounded-lg py-3 flex items-center justify-center hover:bg-gray-900 transition">
      <Search className="w-5 h-5 mr-2" />
      Buscar experiencias
    </button>
  </div>
</section>


      {/* --- SECCIÓN "¿Por qué elegir GuíaPerú?" --- */}
  <section
  className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-20 
             bg-gradient-to-b from-gray-100 to-white overflow-hidden"
>
  {/* Fondo semitransparente opcional */}
  <div className="absolute inset-0 bg-black/5"></div>

  {/* Contenido */}
  <div className="relative z-10 flex flex-col items-center text-center px-6">
    {/* Título y descripción */}
    <div className="mb-12 max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        ¿Por qué elegir <span className="text-blue-600">CityGuides?</span>
      </h2>
      <p className="text-gray-700">
        La forma más auténtica de conocer Perú es a través de quienes lo viven cada
        día. Nuestros guías te conectarán con la cultura, la historia y las
        experiencias únicas de cada destino.
      </p>
    </div>

    {/* Tarjetas */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl px-4">
      {/* Tarjeta 1 */}
      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          Guías peruanos verificados
        </h3>
        <p className="text-gray-600">
          Todos nuestros guías son peruanos certificados con amplio conocimiento local
        </p>
      </div>

      {/* Tarjeta 2 */}
      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          Experiencias únicas
        </h3>
        <p className="text-gray-600">
          Descubre lugares y actividades que no encontrarás en guías turísticas tradicionales
        </p>
      </div>

      {/* Tarjeta 3 */}
      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          Reserva segura
        </h3>
        <p className="text-gray-600">
          Pago protegido y cancelación flexible en todas las reservas
        </p>
      </div>

      {/* Tarjeta 4 */}
      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          Todo Perú
        </h3>
        <p className="text-gray-600">
          Encuentra guías locales en todas las regiones del país
        </p>
      </div>
    </div>
  </div>
</section>


{/* Sección: Cómo funciona */}
<section id="como-funciona" className="w-full bg-white py-20">
  <div className="max-w-6xl mx-auto px-6 text-center">
    {/* Título */}
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
      Cómo funciona
    </h2>
    <p className="text-gray-600 mb-12">
      Conectar con un guía peruano es fácil y rápido
    </p>

    {/* Tarjetas */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Tarjeta 1 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="relative">
          <img
            src="/images/person-searching-on-phone-for-travel-destinations.jpg"
            alt="Busca tu destino"
            className="w-full h-56 object-cover"
          />
          <div className="absolute top-3 left-3 bg-black text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-sm">
            01
          </div>
        </div>
        <div className="p-6 text-left">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Busca tu destino</h3>
          <p className="text-gray-600">
            Explora cientos de experiencias únicas en tu ciudad peruana favorita
          </p>
        </div>
      </div>

      {/* Tarjeta 2 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="relative">
          <img
            src="/images/local-tour-guide-profile-with-reviews-and-ratings.jpg"
            alt="Elige tu guía"
            className="w-full h-56 object-cover"
          />
          <div className="absolute top-3 left-3 bg-black text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-sm">
            02
          </div>
        </div>
        <div className="p-6 text-left">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Elige tu guía peruano</h3>
          <p className="text-gray-600">
            Revisa perfiles, reseñas y especialidades de guías locales certificados
          </p>
        </div>
      </div>

      {/* Tarjeta 3 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="relative">
          <img
            src="/images/tourists-enjoying-guided-tour-in-beautiful-locatio.jpg"
            alt="Vive la experiencia"
            className="w-full h-56 object-cover"
          />
          <div className="absolute top-3 left-3 bg-black text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-sm">
            03
          </div>
        </div>
        <div className="p-6 text-left">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Vive la experiencia</h3>
          <p className="text-gray-600">
            Disfruta de un tour personalizado con un experto local peruano
          </p>
        </div>
      </div>
    </div>
  </div>


</section>
{/* Sección: Destinos populares (full-bleed corrigido) */}
<section
  className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-20
             bg-gradient-to-b from-[#f7f7f7] to-white overflow-hidden"
>
  {/* Contenedor centrado */}
  <div id= "destinos" className="max-w-7xl mx-auto px-8">
    {/* Título y descripción */}
    <div className="text-left mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        Destinos populares en Perú
      </h2>
      <p className="text-gray-600">Explora las ciudades más solicitadas del país</p>
    </div>

    {/* Tarjetas */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {/* Cusco */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
        <div className="overflow-hidden">
          <img
            src="/images/cusco-plaza-de-armas-and-andes-mountains.jpg"
            alt="Cusco"
            className="w-full h-56 object-cover transform hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">Cusco</h3>
        </div>
      </div>

      {/* Lima */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
        <div className="overflow-hidden">
          <img
            src="/images/lima-miraflores-coastline-and-city-view.jpg"
            alt="Lima"
            className="w-full h-56 object-cover transform hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">Lima</h3>
        </div>
      </div>

      {/* Arequipa */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
        <div className="overflow-hidden">
          <img
            src="/images/arequipa-white-city-with-misti-volcano.jpg"
            alt="Arequipa"
            className="w-full h-56 object-cover transform hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">Arequipa</h3>
        </div>
      </div>

      {/* Iquitos */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
        <div className="overflow-hidden">
          <img
            src="/images/iquitos-amazon-rainforest-and-river.jpg"
            alt="Iquitos"
            className="w-full h-56 object-cover transform hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">Iquitos</h3>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Sección: Únete como guía */}
<section id= "conviertete-en-guia" className="w-full bg-white py-20">
  <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    {/* Imagen a la izquierda */}
    <div className="flex justify-center">
      <img
        src="/images/peruvian-tour-guide-showing-tourists-machu-picchu.jpg"
        alt="Guía local mostrando su ciudad"
        className="rounded-2xl shadow-lg w-full max-w-md object-cover"
      />
    </div>

    {/* Texto a la derecha */}
    <div className="text-left">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        ¿Eres peruano y conoces tu ciudad como nadie?
      </h2>

      <p className="text-gray-600 mb-6">
        Conviértete en guía local y comparte tu pasión por Perú mientras generas ingresos extras.
      </p>

      <ul className="space-y-2 text-gray-700 mb-8">
        <li>✔️ Define tus propios horarios</li>
        <li>✔️ Gana dinero compartiendo tu ciudad</li>
        <li>✔️ Conoce personas de todo el mundo</li>
        <li>✔️ Sin comisiones ocultas</li>
      </ul>

     <Link to="/register-guide">
  <button className="border border-gray-400 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
    Únete como guía →
  </button>
</Link>
    </div>
  </div>
</section>




    </div>
  );
}
