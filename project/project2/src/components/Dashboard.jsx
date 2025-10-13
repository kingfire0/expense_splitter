
import React from "react";
import dashboardImg from "../assets/Dashboard.jpeg"; // exact case


export default function Dashboard({ groups, onOpenGroup, onCreateGroup }) {
  return (
    <div className="dashboard-container">
      <div className="welcome-card">
        <div className="welcome-text">
          <h2>Hello there, Welcome! 👋</h2>
          <p>Keep track of shared expenses and settle balances quickly — all in one place.</p>
          
          <button className="card" onClick={onCreateGroup}>➕ Create New Group</button>
        </div>
        <div className="welcome-image">
          <img src={dashboardImg} alt="Dashboard illustration" />
        </div>
       
      </div>

      {/* ✅ Groups Section */}
      {(!groups || groups.length === 0) ? (
        <div className="card empty-state">
          <p>No groups yet. Click "Create Group" to get started!</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
