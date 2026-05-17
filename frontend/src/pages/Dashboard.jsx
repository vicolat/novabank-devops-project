import Sidebar from "../components/Sidebar";
import BalanceCard from "../components/BalanceCard";
import Accounts from "../components/Accounts";
import Transactions from "../components/Transactions";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <div className="layout">

      <Sidebar />

      <div className="main">

        <div className="content">

          <BalanceCard />

          <Accounts />

          <Transactions />

          <Footer />

        </div>

      </div>

    </div>
  );
}