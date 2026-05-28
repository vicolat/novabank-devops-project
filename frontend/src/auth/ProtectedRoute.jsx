import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Login from "../pages/Login";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Login />;

  return children;
}