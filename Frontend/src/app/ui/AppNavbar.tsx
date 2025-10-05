
import { useUser } from "@clerk/clerk-react";
import { PublicNavbar } from "./PublicNavbar";
import { TouristNavbar } from "./TouristNavbar";

export function AppNavbar() {
  const { isSignedIn } = useUser();

  return isSignedIn ? <TouristNavbar /> : <PublicNavbar />;
}
