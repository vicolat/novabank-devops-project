import { useState } from "react";
import API_BASE from "./config/api";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    console.log("LOGIN CLICKED");

    try {
      const endpoint = isRegister
        ? `${API_BASE}/api/auth/register`
        : `${API_BASE}/api/auth/login`;

      const body = isRegister
        ? { username, email, password }
        : { email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log("RESPONSE:", data);

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      if (isRegister) {
        setSuccess("Account created successfully. You can now login.");
        setIsRegister(false);
        setLoading(false);
        return;
      }

      // LOGIN SUCCESS
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess("Login successful");

      setTimeout(() => {
        window.location.href = "/";
      }, 800);

    } catch (err) {
      console.log(err);
      setError("Server connection failed");
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>NovaBank</h1>
        <p>Secure Digital Banking Platform</p>

        <form onSubmit={handleSubmit}>

          {isRegister && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <button type="submit" disabled={loading}>
            {loading
              ? "Loading..."
              : isRegister
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </p>

      </div>
    </div>
  );
}