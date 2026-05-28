import { useState } from "react";
import "./App.css";

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

    console.log("LOGIN CLICKED");

    setError("");

    setSuccess("");

    setLoading(true);

    try {

      const endpoint = isRegister
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const body = isRegister
        ? {
            username,
            email,
            password,
          }
        : {
            email,
            password,
          };

      console.log("Sending request to:", endpoint);

      const res = await fetch(endpoint, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),
      });

      console.log("Response received");

      const data = await res.json();

      console.log("DATA:", data);

      if (!res.ok) {

        setError(
          data.error || "Something went wrong"
        );

        setLoading(false);

        return;
      }

      // REGISTER SUCCESS
      if (isRegister) {

        setSuccess(
          "Account created successfully. You can now login."
        );

        setIsRegister(false);

        setLoading(false);

        return;
      }

      // LOGIN SUCCESS
      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setSuccess("Login successful");

      setLoading(false);

      setTimeout(() => {

        window.location.href = "/";

      }, 1000);

    } catch (err) {

      console.log(err);

      setError("Server connection failed");

      setLoading(false);
    }
  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <h1>NovaBank</h1>

          <p>
            Secure Digital Banking Platform
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {isRegister && (

            <input
              id="username"
              name="username"
              type="text"
              placeholder="Full Name"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
            />

          )}

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {error && (

            <div className="error-box">
              {error}
            </div>

          )}

          {success && (

            <div className="success-box">
              {success}
            </div>

          )}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Please wait..."
              : isRegister
              ? "Create Account"
              : "Sign In"}

          </button>

        </form>

        <div className="switch-auth">

          {isRegister ? (

            <p>
              Already have an account?{" "}

              <span
                onClick={() =>
                  setIsRegister(false)
                }
                style={{
                  cursor: "pointer",
                  color: "#00bfff",
                  fontWeight: "bold",
                }}
              >
                Login
              </span>

            </p>

          ) : (

            <p>
              Don't have an account?{" "}

              <span
                onClick={() =>
                  setIsRegister(true)
                }
                style={{
                  cursor: "pointer",
                  color: "#00bfff",
                  fontWeight: "bold",
                }}
              >
                Register
              </span>

            </p>

          )}

        </div>

      </div>

    </div>
  );
}