// src/api/LocalStore.js
import axios from "axios";

const API = "http://localhost:5000/api/groups";

// ---- Group APIs ----
export async function loadGroups() {
  const res = await axios.get(API);
  return res.data;
}

export async function saveGroup(group) {
  if (group._id) {
    const res = await axios.put(`${API}/${group._id}`, group);
    return res.data;
  } else {
    const res = await axios.post(API, group);
    return res.data;
  }
}

export async function deleteGroup(id) {
  await axios.delete(`${API}/${id}`);
}

// ---- Expense APIs ----
export async function updateExpense(groupId, expenseId, updatedExpense) {
  const res = await axios.put(`${API}/${groupId}/expenses/${expenseId}`, updatedExpense);
  return res.data;
}
export async function addExpense(groupId, expense) {
  const res = await axios.post(`${API}/${groupId}/expenses`, expense);
  return res.data;
}



export async function removeExpense(groupId, expenseId) {
  const res = await axios.delete(`${API}/${groupId}/expenses/${expenseId}`);
  return res.data;
}
