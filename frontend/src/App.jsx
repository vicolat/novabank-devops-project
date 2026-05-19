import { useEffect, useState } from "react";
import "./App.css";
import Login from "./login.jsx";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 REAL AUTH CHECK (NOT FAKE STATE)
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("http://52.204.78.229/api/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  // 🔐 LOGIN GATE
  if (!token) {
    return <Login />;
  }

  // DASHBOARD
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

        {/* TOPBAR */}
        <header className="topbar">
          <h3>Banking Dashboard</h3>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </header>

        {/* CONTENT */}
        <div className="content">

          {/* BALANCE */}
          <div className="balance-card">
            <h3>Total Balance</h3>
            <h1>$24,580.00</h1>
            <p>+3.2% this month</p>
          </div>

          {/* USERS */}
          <h3>Customers</h3>

          {loading && <p className="loading">Loading...</p>}

          <div className="grid">
            {users.map((u) => (
              <div className="card" key={u.id}>
                <h3>{u.username}</h3>
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