import React, { useState } from "react";

export default function ExpenseForm({ members, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [participants, setParticipants] = useState([]);

  const toggleParticipant = (id) => {
    setParticipants((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !paidBy || participants.length === 0) return;

    onAdd({
      id: `exp_${Date.now()}`,
      description,
      amount: Number(amount),
      paidBy,
      participants,
      date: new Date().toISOString(),
    });

    setDescription("");
    setAmount("");
    setPaidBy("");
    setParticipants([]);
  };

  return (
    <div className="card">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
          <option value="">Who paid?</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <div className="form-section">
          <h3>Participants</h3>
          {members.map((m) => (
            <label key={m.id} style={{ display: "block", marginBottom: "6px" }}>
              <input
                type="checkbox"
                checked={participants.includes(m.id)}
                onChange={() => toggleParticipant(m.id)}
              />{" "}
              {m.name}
            </label>
          ))}
        </div>

        <button className="btn btn-success" type="submit">
          Add Expense
        </button>
      </form>
    </div>
  );
}
