import { useState } from "react";
import { register } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await register(email, password);

    if (res.success) {
      alert("Account created");
      navigate("/login");
    } else {
      alert(res.message || "Error");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}