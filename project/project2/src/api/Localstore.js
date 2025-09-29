// src/api/LocalStore.js
import axios from "axios";
const API = "http://localhost:5000/api/groups";

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
