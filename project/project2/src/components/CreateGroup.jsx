import React, { useState } from "react";

export default function CreateGroup({ onCreate, onCancel, existingGroups }) {
  const [groupName, setGroupName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;


    onCreate({
      id: `g_${Date.now()}`,
      groupName,
      members: [],
      expenses: [],
      settlements: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    setGroupName("");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create New Group</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <div className="row gap" style={{ marginTop: "10px" }}>
            <button className="btn btn-primary" type="submit">
              Create
            </button>
            <button className="btn btn-ghost" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
