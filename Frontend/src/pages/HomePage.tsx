export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-rose-700 mb-4 drop-shadow-lg">Bienvenido a CityGuides</h1>
      <p className="text-lg md:text-2xl text-rose-900/80 mb-8 max-w-xl font-medium">
        Explora, reserva y administra guías turísticos en tu ciudad favorita.<br />
        <span className="text-rose-500 font-semibold">Plataforma moderna, rápida y segura.</span>
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center">
        <a href="/guides" className="px-6 py-3 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition font-bold shadow-lg w-full sm:w-auto">Buscar Guías</a>
        <a href="/login" className="px-6 py-3 rounded-lg bg-white text-rose-700 border border-rose-300 hover:bg-rose-50 transition font-bold shadow w-full sm:w-auto">Iniciar Sesión</a>
      </div>
    </div>
  );
}
