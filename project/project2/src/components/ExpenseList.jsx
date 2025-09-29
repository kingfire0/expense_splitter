// src/components/ExpenseList.jsx
import React from "react";
import { format } from "date-fns";

export default function ExpenseList({ expenses = [], members = [], onUpdate, onDelete, currency = "₹" }) {
  if (expenses.length === 0) return <p className="muted">No expenses yet.</p>;

  return (
    <div>
      {expenses.map((exp) => {
        const payer = members.find((m) => m.id === exp.paidBy)?.name || "Unknown";
        const formattedDate = exp.date
          ? format(new Date(exp.date), "MMM d, yyyy · h:mm a")
          : "—";

        return (
          <div key={exp.id} className="list-item">
            <div>
              <strong>{exp.description}</strong>
              <p className="muted">
                Paid by {payer} on {formattedDate}
              </p>
            </div>
            <div className="row gap">
              <span className="balance-positive">
                {currency}{exp.amount}
              </span>
              {onDelete && (
                <button
                  onClick={() => onDelete(exp.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
