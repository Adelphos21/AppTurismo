import { useEffect } from "react";
import { useSession } from "features/auth/useSession";
import { PublicNavbar } from "./PublicNavbar";
import { TouristNavbar } from "./TouristNavbar";

export function AppNavbar() {
  const { status, me } = useSession();

  useEffect(() => {
    if (status === "unknown") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        me();
      }
    }
  }, [status, me]);

  return status === "authenticated" ? <TouristNavbar /> : <PublicNavbar />;
}
