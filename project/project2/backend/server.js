

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 1) Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// 2) Create a simple schema/model
const groupSchema = new mongoose.Schema({
  groupName: String,
  members: [{ id: String, name: String, email: String }],
  expenses: [{ description: String, amount: Number, paidBy: String, participants: [String], date: Date }],
  settlements: [{ fromMember: String, toMember: String, amount: Number, date: Date }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Group = mongoose.model("Group", groupSchema);

// 3) Routes (APIs)

// Get all groups
app.get("/api/groups", async (req, res) => {
  const groups = await Group.find();
  res.json(groups);
});

// Create new group
app.post("/api/groups", async (req, res) => {
  const group = new Group(req.body);
  await group.save();
  res.json(group);
});

// Update group
app.put("/api/groups/:id", async (req, res) => {
  const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(group);
});

// Delete group
app.delete("/api/groups/:id", async (req, res) => {
  await Group.findByIdAndDelete(req.params.id);
  res.json({ message: "Group deleted" });
});

// 4) Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
