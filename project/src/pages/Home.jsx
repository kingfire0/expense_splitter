import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [groups, setGroups] = useState([
    { id: 1, name: "Goa Trip" },
    { id: 2, name: "College Project" }
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Groups</h2>
      <ul>
        {groups.map((g) => (
          <li key={g.id}>
            <Link to={`/group/${g.id}`}>{g.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/create">+ Create New Group</Link>
    </div>
  );
}

export default Home;
