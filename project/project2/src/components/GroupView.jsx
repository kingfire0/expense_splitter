
// src/components/GroupView.jsx
import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import MemberManager from "./MemberManager";
import BalanceSummary from "./BalanceSummary";
import { calculateBalances, optimizeSettlements } from "../utils/settlement";
import { addExpense, removeExpense, updateExpense as updateExpenseAPI } from "../api/Localstore";

export default function GroupView({ group, onUpdate, onDelete, onBack }) {
  const [tab, setTab] = useState("expenses");

  if (!group) return <p>Loading group...</p>;

  // Calculate balances and suggestions
  const balances = calculateBalances(
    group.members || [],
    group.expenses || [],
    group.settlements || []
  );
  const suggestions = optimizeSettlements(balances);

  // ----- Expense actions -----
  const handleAddExpense = async (exp) => {
    const withDate = { ...exp, date: new Date().toISOString() }; // attach timestamp
    const updatedGroup = await addExpense(group._id, withDate);
    onUpdate(updatedGroup);
  };

  const handleDeleteExpense = async (id) => {
    const updatedGroup = await removeExpense(group._id, id);
    onUpdate(updatedGroup);
  };

  const handleUpdateExpense = async (exp) => {
    const updatedGroup = await updateExpenseAPI(group._id, exp);
    onUpdate(updatedGroup);
  };

  // ----- Member actions -----
  const addMember = (m) =>
    onUpdate({ ...group, members: [...(group.members || []), m] });

  const removeMember = (id) =>
    onUpdate({
      ...group,
      members: (group.members || []).filter((m) => m.id !== id),
    });

  // Rename group
  const renameGroup = (name) =>
    onUpdate({ ...group, groupName: name, updatedAt: Date.now() });

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
            <ExpenseForm
              members={group.members || []}
              onAdd={handleAddExpense}
            />
            <ExpenseList
              expenses={(group.expenses || []).map((e) => ({
                ...e,
                displayDate: e.date
                  ? new Date(e.date).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : "—",
              }))}
              members={group.members || []}
              onUpdate={handleUpdateExpense} // ✅ for editing
              onDelete={handleDeleteExpense}
            />
          </>
        )}

        {tab === "balances" && (
          <BalanceSummary
            members={group.members || []}
            balances={balances}
            suggestions={suggestions}
            expenses={group.expenses || []} // ✅ pass expenses for the table
            settlements={group.settlements || []}
            onSettle={(from, to, amount) => {
              onUpdate({
                ...group,
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

