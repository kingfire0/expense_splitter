import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Group Created: ${groupName} with members ${members}`);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Group</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <br /><br />
        <input
          type="text"
          placeholder="Members (comma separated)"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
        />
        <br /><br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateGroup;
