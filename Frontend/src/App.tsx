import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import GuidesPage from "pages/GuidesPage";
import ProfilePage from "pages/ProfilePage";
import GuideProfilePage from "pages/GuideProfilePage";
import NewReservationPage from "pages/NewReservationPage";
import RegisterGuidePage from "pages/RegisterGuidePage";
import MyReservationsPage from "pages/MyReservationsPage"; // 👈 NUEVA PÁGINA

import { AppLayout } from "@app/ui/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Perfil */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Guías */}
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guides/:id" element={<GuideProfilePage />} />
          <Route
            path="/reservations/new/:guideId"
            element={<NewReservationPage />}
          />
          <Route path="/register-guide" element={<RegisterGuidePage />} />

          {/* 👇 NUEVA RUTA: Mis reservas */}
          <Route path="/reservations/me" element={<MyReservationsPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
