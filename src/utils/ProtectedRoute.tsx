import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactElement }) {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      navigate("/login", { replace: true });
    } else {
      navigate("/");
    }
  }, [navigate]);

  return children;
}

export default ProtectedRoute;
