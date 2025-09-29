// App.js
import React, { useState } from "react";
import "./App.css"; // For theme styles

function App() {
  const [page, setPage] = useState("dashboard");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [theme, setTheme] = useState("light");

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Switch pages
  const goToDashboard = () => setPage("dashboard");
  const goToCreateGroup = () => setPage("create");
  const goToGroupDetail = (group) => {
    setSelectedGroup(group);
    setPage("detail");
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="navbar">
        <h1 className="logo">💰 Mini Splitwise</h1>
        <div>
          <button onClick={toggleTheme} className="btn">
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
          {page === "dashboard" && (
            <button onClick={goToCreateGroup} className="btn">
              ➕ Create Group
            </button>
          )}
          {page !== "dashboard" && (
            <button onClick={goToDashboard} className="btn">
              ⬅️ Back
            </button>
          )}
        </div>
      </header>

      {/* Pages */}
      <main className="main">
        {page === "dashboard" && (
          <Dashboard groups={groups} onOpenGroup={goToGroupDetail} />
        )}
        {page === "create" && (
          <CreateGroup groups={groups} setGroups={setGroups} goBack={goToDashboard} />
        )}
        {page === "detail" && selectedGroup && (
          <GroupDetail group={selectedGroup} />
        )}
      </main>
    </div>
  );
}

/* ---------------- DASHBOARD ---------------- */
function Dashboard({ groups, onOpenGroup }) {
  return (
    <div>
      <h2>📋 Groups</h2>
      {groups.length === 0 && <p>No groups yet. Create one!</p>}
      <ul>
        {groups.map((g, idx) => (
          <li key={idx}>
            {g.name} <button onClick={() => onOpenGroup(g)}>Open</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- CREATE GROUP ---------------- */
function CreateGroup({ groups, setGroups, goBack }) {
  const [name, setName] = useState("");
  const [members, setMembers] = useState([""]);

  const addGroup = () => {
    if (!name || members.some((m) => !m)) return;
    const newGroup = { name, members, expenses: [] };
    setGroups([...groups, newGroup]);
    goBack();
  };

  return (
    <div>
      <h2>➕ Create Group</h2>
      <input
        type="text"
        placeholder="Group name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h3>👥 Members</h3>
      {members.map((m, idx) => (
        <input
          key={idx}
          type="text"
          placeholder={`Member ${idx + 1}`}
          value={m}
          onChange={(e) => {
            const newMembers = [...members];
            newMembers[idx] = e.target.value;
            setMembers(newMembers);
          }}
        />
      ))}
      <button onClick={() => setMembers([...members, ""])}>Add Member</button>
      <br />
      <button onClick={addGroup}>✅ Create Group</button>
    </div>
  );
}

/* ---------------- GROUP DETAIL ---------------- */
// GroupDetail Component
function GroupDetail({ group }) {
  const [expenses, setExpenses] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");

  // Add expense
  const addExpense = () => {
    if (!desc || !amount || !payer) return;
    const newExpense = { desc, amount: parseFloat(amount), payer };
    setExpenses([...expenses, newExpense]);
    setDesc("");
    setAmount("");
    setPayer("");
  };

  // Calculate balances
  const balances = {};
  group.members.forEach((m) => (balances[m] = 0));

  expenses.forEach((exp) => {
    const share = exp.amount / group.members.length;
    group.members.forEach((m) => {
      if (m === exp.payer) {
        balances[m] += exp.amount - share;
      } else {
        balances[m] -= share;
      }
    });
  });

  // Settlement logic
  function calculateSettlements(balances) {
    let debtors = [];
    let creditors = [];

    for (let member in balances) {
      if (balances[member] < 0) debtors.push({ member, amount: -balances[member] });
      if (balances[member] > 0) creditors.push({ member, amount: balances[member] });
    }

    let settlements = [];
    let i = 0, j = 0;

    while (i < debtors.length && j < creditors.length) {
      let pay = Math.min(debtors[i].amount, creditors[j].amount);

      settlements.push(
        `${debtors[i].member} should pay ${creditors[j].member} ₹${pay.toFixed(2)}`
      );

      debtors[i].amount -= pay;
      creditors[j].amount -= pay;

      if (debtors[i].amount === 0) i++;
      if (creditors[j].amount === 0) j++;
    }

    return settlements;
  }

  const settlements = calculateSettlements(balances);

  return (
    <div>
      <div className="card">
        <h2>👥 {group.name}</h2>
        <h3>Members</h3>
        <ul>
          {group.members.map((m, idx) => (
            <li key={idx}>{m}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Add Expense</h3>
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={payer} onChange={(e) => setPayer(e.target.value)}>
          <option value="">Select who paid</option>
          {group.members.map((m, idx) => (
            <option key={idx} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button onClick={addExpense}>Add Expense</button>
      </div>

      <div className="card">
        <h3>Expenses</h3>
        {expenses.length === 0 ? (
          <p>No expenses yet.</p>
        ) : (
          <ul>
            {expenses.map((exp, idx) => (
              <li key={idx}>
                {exp.payer} paid ₹{exp.amount} for {exp.desc}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>Balance Summary</h3>
        <ul>
          {Object.entries(balances).map(([member, balance], idx) => (
            <li key={idx}>
              {member} {balance >= 0 ? "should get" : "owes"} ₹
              {Math.abs(balance).toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>💡 Suggested Settlements</h3>
        {settlements.length === 0 ? (
          <p>All settled up!</p>
        ) : (
          <ul>
            {settlements.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}




export default App;
