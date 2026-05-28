import { useState, useContext } from "react";
import { login } from "../api/auth";
import { AuthContext } from "../auth/AuthContext";

export default function Login() {
  const { login: authLogin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await login({ email, password });

    if (res.token) {
      authLogin(res);
    } else {
      alert(res.error || "Login failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>NovaBank Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}