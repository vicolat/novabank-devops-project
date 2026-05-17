export default function Transactions() {
  return (
    <div className="transactions">

      <h3>Recent Transactions</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Amazon</td>
            <td>Purchase</td>
            <td>-$120</td>
          </tr>

          <tr>
            <td>Salary</td>
            <td>Deposit</td>
            <td>+$2,500</td>
          </tr>
        </tbody>

      </table>

    </div>
  );
}