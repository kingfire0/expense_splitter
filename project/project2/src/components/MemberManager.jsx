import React, { useState } from "react";

export default function MemberManager({ members, onAdd, onRemove }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      id: `m_${Date.now()}`,
      name,
      email,
    });
    setName("");
    setEmail("");
  };

  return (
    <div className="card">
      <h2>Group Members</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Member name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Add Member
        </button>
      </form>

      <ul className="list" style={{ marginTop: "10px" }}>
        {members.map((m) => (
          <li key={m.id} className="list-item">
            <div>
              <strong>{m.name}</strong>
              {m.email && <div className="small">{m.email}</div>}
            </div>
            <button
              className="btn btn-danger"
              onClick={() => onRemove(m.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
