import { useEffect, useState } from "react";
import "./App.css";
import Login from "./login.jsx";
import API_BASE from "./config/api";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadUsers = async () => {
      if (!token) return;

      try {
        setLoading(true);

        const res = await fetch(`${API_BASE}/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        console.log("USERS RESPONSE:", data);

        if (!res.ok) {
          setUsers([]);
          setLoading(false);
          return;
        }

        setUsers(data);
      } catch (err) {
        console.log("ERROR:", err);
        setUsers([]);
      }

      setLoading(false);
    };

    loadUsers();
  }, [token]);

  // 🔐 LOGIN GATE
  if (!token) {
    return <Login />;
  }

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>NovaBank</h2>

        <nav>
          <a href="#">Dashboard</a>
          <a href="#">Accounts</a>
          <a href="#">Transactions</a>
          <a href="#">Analytics</a>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="main">

        {/* TOP BAR */}
        <header className="topbar">
          <h3>Banking Dashboard</h3>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </header>

        {/* CONTENT */}
        <div className="content">

          {/* BALANCE CARD (STATIC FOR NOW) */}
          <div className="balance-card">
            <h3>Total Balance</h3>
            <h1>$24,580.00</h1>
            <p>+3.2% this month</p>
          </div>

          {/* USERS */}
          <h3>Customers</h3>

          {loading && <p>Loading users...</p>}

          <div className="grid">
            {users.map((u) => (
              <div className="card" key={u.id}>
                <h3>{u.username || "User"}</h3>
                <p>{u.email}</p>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="footer">
            © 2026 NovaBank • Secure Financial System
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;