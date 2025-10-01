// src/components/BalanceSummary.jsx
import React from "react";

export default function BalanceSummary({
  balances = [],
  suggestions = [],
  members = [],
  expenses = [],
  onSettle,
}) {
  if (!balances.length && !suggestions.length && !expenses.length) {
    return <p className="muted">No balances yet. Add expenses first!</p>;
  }

  const getName = (id) => members.find((m) => m.id === id)?.name || "Unknown";

  return (
    <div className="card">
      <h3>Balance Summary</h3>

      {/* Suggested Settlements in table format */}
      {suggestions.length > 0 && (
        <div className="table-container">
          <div className="table-title">💡 Suggested Settlements</div>
          <table className="custom-table">
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {suggestions.map((s, idx) => (
                <tr key={idx}>
                  <td>{getName(s.from)}</td>
                  <td>{getName(s.to)}</td>
                  <td>₹{s.amount.toFixed(2)}</td>
                  <td>
                    {onSettle && (
                      <button
                        className="btn btn-success"
                        onClick={() => onSettle(s.from, s.to, s.amount)}
                      >
                        Record Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Expense Distribution */}
      {expenses.length > 0 && (
        <div className="table-container">
          <div className="table-title">📊 Expense Distribution</div>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Expense</th>
                <th>Paid By</th>
                <th>Amount</th>
                <th>Each Owes</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => {
                const payer = getName(exp.paidBy);
                const membersInvolved = exp.participants
                  ?.map((id) => getName(id))
                  .join(", ");
                const eachShare =
                  exp.participants?.length > 0
                    ? (exp.amount / exp.participants.length).toFixed(2)
                    : exp.amount;

                return (
                  <tr key={exp.id}>
                    <td>{exp.description}</td>
                    <td>{payer}</td>
                    <td>₹{exp.amount}</td>
                    <td>₹{eachShare}</td>
                    <td>{membersInvolved}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
