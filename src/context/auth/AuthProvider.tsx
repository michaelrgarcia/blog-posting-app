/* eslint-disable react-refresh/only-export-components */

import { ReactElement, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useLocalStorage from "../../hooks/useLocalStorage";

type UserContext = {
  user: string;
  login: (jwt: string) => void;
  logout: () => void;
};

const AuthContext = createContext<UserContext>({
  user: "",
  login: (jwt: string) => {},
  logout: () => {},
});

type AuthProviderProps = {
  children: ReactElement;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useLocalStorage("jwt", "");

  const navigate = useNavigate();

  const login = (jwt: string) => {
    setUser(jwt);
    navigate("/");
  };

  const logout = () => {
    setUser("");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
