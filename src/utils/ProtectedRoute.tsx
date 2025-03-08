import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/auth/AuthProvider";

function ProtectedRoute({ children }: { children: ReactElement }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return children;
}

export default ProtectedRoute;
