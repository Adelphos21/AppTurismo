// src/components/Navbar/TouristNavbar.tsx
import { Link } from "react-router-dom";

export function TouristNavbar() {
  return (
    <nav className="flex justify-between p-4 bg-blue-100">
      <h1 className="text-xl font-bold">Travel App</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/guides">Guides</Link>
        <Link to="/reservations/me">My Reservations</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}
