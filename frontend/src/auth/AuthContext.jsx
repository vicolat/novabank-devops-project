import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");

    if (token) {
      setUser({ token, refresh });
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}