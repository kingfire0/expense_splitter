import React, { useState } from "react";
import { Link } from "react-router-dom";

function GroupDetails() {
  const [expenses, setExpenses] = useState([
    { desc: "Hotel", amount: 3000, paidBy: "Rahul" }
  ]);

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");

  const addExpense = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { desc, amount: Number(amount), paidBy }]);
    setDesc("");
    setAmount("");
    setPaidBy("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Group Details</h2>
      <ul>
        {expenses.map((ex, index) => (
          <li key={index}>
            {ex.desc} - ₹{ex.amount} (Paid by {ex.paidBy})
          </li>
        ))}
      </ul>

      <form onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <br /><br />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br /><br />
        <input
          type="text"
          placeholder="Paid By"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
        />
        <br /><br />
        <button type="submit">Add Expense</button>
      </form>

      <br />
      <Link to="/balance">View Balance Sheet</Link>
    </div>
  );
}

export default GroupDetails;
