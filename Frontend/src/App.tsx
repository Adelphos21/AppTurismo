import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GuidesPage from "pages/GuidesPage";
import { AppLayout } from "@app/ui/AppLayout";
import ProfilePage from "pages/ProfilePage";
import GuideProfilePage from "pages/GuideProfilePage";
import NewReservationPage from "pages/NewReservationPage";
import RegisterGuidePage from "pages/RegisterGuidePage";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
         <Routes>
         <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/:id" element={<GuideProfilePage />} />
       <Route path="/reservations/new/:guideId" element={<NewReservationPage />} />
        <Route path="/register-guide" element={<RegisterGuidePage />} />
    </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
