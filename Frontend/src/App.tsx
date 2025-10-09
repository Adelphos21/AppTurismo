import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import HomePage from "./pages/HomePage";
import GuidesPage from "pages/GuidesPage";
import ProfilePage from "pages/ProfilePage";
import GuideProfilePage from "pages/GuideProfilePage";
import NewReservationPage from "pages/NewReservationPage";
import RegisterGuidePage from "pages/RegisterGuidePage";

import { PublicLayout } from "app/ui/PublicLayout";
import { PrivateLayout } from "app/ui/PrivateLayout";
import Dashboard from "pages/Dashboard";
import UserReservationsPage from "pages/UserReservationsPage";

function App() {
  return (
    <BrowserRouter>
      {/* Páginas públicas */}
      <SignedOut>
        <PublicLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </PublicLayout>
      </SignedOut>

      {/* Páginas privadas */}
      <SignedIn>
        <PrivateLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/guides/:id" element={<GuideProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/reservations/new/:guideId" element={<NewReservationPage />} />
            <Route path="/reservations" element={<UserReservationsPage />} />
            <Route path="/become-guide" element={<RegisterGuidePage />} />
          </Routes>
        </PrivateLayout>
      </SignedIn>
    </BrowserRouter>
  );
}

export default App;
