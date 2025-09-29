import React from "react";

function BalanceSheet() {
  const expenses = [
    { desc: "Hotel", amount: 3000, paidBy: "Rahul" },
    { desc: "Dinner", amount: 1500, paidBy: "Priya" }
  ];

  // Very simple calculation
  const total = expenses.reduce((sum, ex) => sum + ex.amount, 0);
  const perPerson = total / 3; // assuming 3 members
  const balances = {
    Rahul: 3000 - perPerson,
    Priya: 1500 - perPerson,
    Aman: 0 - perPerson
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Balance Sheet</h2>
      <p>Total: ₹{total}</p>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Member</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(balances).map(([member, balance]) => (
            <tr key={member}>
              <td>{member}</td>
              <td>{balance > 0 ? `Gets ₹${balance}` : `Owes ₹${-balance}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BalanceSheet;
