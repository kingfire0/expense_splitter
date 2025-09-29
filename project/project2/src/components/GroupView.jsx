// src/components/GroupView.jsx
import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import MemberManager from "./MemberManager";
import BalanceSummary from "./BalanceSummary";
import { format } from "date-fns";
import { calculateBalances, optimizeSettlements } from "../utils/settlement";

export default function GroupView({ group, onUpdate, onDelete, onBack }) {
  const [tab, setTab] = useState("expenses");

  if (!group) return <p>Loading group...</p>;

  // Calculate balances and suggested settlements
  const balances = calculateBalances(
    group.members || [],
    group.expenses || [],
    group.settlements || []
  );
  const suggestions = optimizeSettlements(balances);

  // Helper to update group
  const updateGroup = (patch) => {
    onUpdate({ ...group, ...patch, updatedAt: Date.now() });
  };

  // Expense actions
  const addExpense = (exp) => {
    const withDate = { ...exp, date: new Date().toISOString() }; // attach timestamp
    updateGroup({ expenses: [withDate, ...(group.expenses || [])] });
  };

  const updateExpense = (exp) =>
    updateGroup({
      expenses: (group.expenses || []).map((e) => (e.id === exp.id ? exp : e)),
    });

  const deleteExpense = (id) =>
    updateGroup({
      expenses: (group.expenses || []).filter((e) => e.id !== id),
    });

  // Member actions
  const addMember = (m) =>
    updateGroup({ members: [...(group.members || []), m] });

  const removeMember = (id) =>
    updateGroup({
      members: (group.members || []).filter((m) => m.id !== id),
    });

  // Rename group
  const renameGroup = (name) => updateGroup({ groupName: name });

  return (
    <div className="vstack gap">
      {/* Group Header */}
      <div className="card">
        <div className="row space-between">
          <div className="row gap">
            <button className="btn btn-accent" onClick={onBack}>
              Back
            </button>
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => renameGroup(e.target.textContent)}
            >
              {group.groupName}
            </h2>
          </div>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(group._id)}
          >
            Delete Group
          </button>
        </div>

        {/* Tabs */}
        <div className="tabs row gap">
          <button
            className={`tab ${tab === "expenses" ? "active" : ""}`}
            onClick={() => setTab("expenses")}
          >
            Expenses
          </button>
          <button
            className={`tab ${tab === "balances" ? "active" : ""}`}
            onClick={() => setTab("balances")}
          >
            Balances
          </button>
          <button
            className={`tab ${tab === "members" ? "active" : ""}`}
            onClick={() => setTab("members")}
          >
            Members
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="vstack gap" style={{ animation: "fadeInUp 0.5s" }}>
        {tab === "expenses" && (
          <>
            <ExpenseForm members={group.members || []} onAdd={addExpense} />
            <ExpenseList
              expenses={(group.expenses || []).map((e) => ({
                ...e,
                displayDate: e.date
                  ? format(new Date(e.date), "MMM d, yyyy · h:mm a")
                  : "—",
              }))}
              members={group.members || []}
              onUpdate={updateExpense}
              onDelete={deleteExpense}
            />
          </>
        )}

        {tab === "balances" && (
          <BalanceSummary
            members={group.members || []}
            balances={balances}
            suggestions={suggestions}
            settlements={group.settlements || []}
            onSettle={(from, to, amount) => {
              updateGroup({
                settlements: [
                  ...(group.settlements || []),
                  { from, to, amount, date: new Date().toISOString() },
                ],
              });
            }}
          />
        )}

        {tab === "members" && (
          <MemberManager
            members={group.members || []}
            onAdd={addMember}
            onRemove={removeMember}
          />
        )}
      </div>
    </div>
  );
}
