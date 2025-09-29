// src/components/Dashboard.jsx
import React from "react";

export default function Dashboard({ groups, onOpenGroup }) {
  if (!groups || groups.length === 0) {
    return (
      <div className="card">
        <p>No groups yet. Click "Create Group" to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid">
      {groups.map((group) => {
        const membersCount = group.members?.length || 0;
        const expensesCount = group.expenses?.length || 0;
        const totalSpent = (group.expenses || []).reduce(
          (sum, e) => sum + e.amount,
          0
        );

        return (
          <div
            key={group._id}
            className="card group-card"
            onClick={() => onOpenGroup(group._id)}
          >
            <h3>{group.groupName}</h3>
            <p>{membersCount} members</p>
            <p>{expensesCount} expenses</p>
            <p>Total: ₹{totalSpent}</p>
          </div>
        );
      })}
    </div>
  );
}
