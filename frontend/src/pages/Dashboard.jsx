import { useEffect, useState } from "react";
import { getAccounts } from "../api/accounts";

export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAccounts().then((res) => {
      setAccounts(res.data || []);
    });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>NovaBank Dashboard</h1>

      <h3>Accounts</h3>

      <div style={{ display: "grid", gap: 10 }}>
        {accounts.map((acc) => (
          <div
            key={acc.id}
            style={{
              padding: 20,
              border: "1px solid #ccc",
              borderRadius: 10,
            }}
          >
            <h3>{acc.name}</h3>
            <p>Balance: ${acc.balance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}