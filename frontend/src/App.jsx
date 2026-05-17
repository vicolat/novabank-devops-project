import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // LOGIN SCREEN
  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-box">
          <h1>NovaBank</h1>
          <p>Secure Digital Banking</p>

          <input placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button onClick={() => setLoggedIn(true)}>
            Login
          </button>
        </div>
      </div>
    );
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

          <button onClick={() => setLoggedIn(false)}>
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