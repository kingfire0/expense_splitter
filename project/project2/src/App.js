// import React, { useEffect, useState } from "react";
// import Header from "./components/Header";
// import Dashboard from "./components/Dashboard";
// import GroupView from "./components/GroupView";
// import CreateGroup from "./components/CreateGroup";
// import { loadGroups, saveGroups, seedIfEmpty } from "./api/Localstore";

// src/App.js
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import GroupView from "./components/GroupView";
import CreateGroup from "./components/CreateGroup";


import { loadGroups, saveGroup, deleteGroup } from "./api/Localstore";

export default function App() {
  const [groups, setGroups] = useState([]);          // all groups
  const [view, setView] = useState("dashboard");     // current screen
  const [activeGroup, setActiveGroup] = useState();  // opened group

  // Load groups from DB (MongoDB via backend API)
  useEffect(() => {
    loadGroups().then(setGroups);
  }, []);

  // Create new group
  const addGroup = async (group) => {
    const created = await saveGroup(group);
    setGroups([created, ...groups]);
    setActiveGroup(created);
    setView("group");
  };

  // Update existing group
  const updateGroup = async (group) => {
    const updated = await saveGroup(group);
    setGroups(groups.map((g) => (g._id === updated._id ? updated : g)));
    setActiveGroup(updated);
  };

  // Delete group
  const removeGroup = async (id) => {
    await deleteGroup(id);
    setGroups(groups.filter((g) => g._id !== id));
    setView("dashboard");
  };

  return (
    <div>
      <Header onCreateGroup={() => setView("create")} onLogoClick={() => setView("dashboard")} />

      <main className="container">
        {view === "dashboard" && (
          <Dashboard groups={groups} onOpenGroup={(id) => {
            const g = groups.find((x) => x._id === id);
            setActiveGroup(g);
            setView("group");
          }} />
        )}

        {view === "create" && (
          <CreateGroup onCancel={() => setView("dashboard")} onCreate={addGroup} />
        )}

        {view === "group" && activeGroup && (
          <GroupView
            group={activeGroup}
            onUpdate={updateGroup}
            onDelete={removeGroup}
            onBack={() => setView("dashboard")}
          />
        )}
      </main>
    </div>
  );
}
