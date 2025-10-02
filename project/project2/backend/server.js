import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 1) Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/splitwise", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// 2) Schema + Model
const groupSchema = new mongoose.Schema({
  groupName: String,
  members: [{ id: String, name: String, email: String }],
  expenses: [
    {
      id: String,
      description: String,
      amount: Number,
      paidBy: String,
      participants: [String],
      date: Date,
    }
  ],
  settlements: [
    {
      fromMember: String,
      toMember: String,
      amount: Number,
      date: Date,
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
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

// Update group (safe update using $set)
app.put("/api/groups/:id", async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: "Failed to update group" });
  }
});

// Delete group
app.delete("/api/groups/:id", async (req, res) => {
  await Group.findByIdAndDelete(req.params.id);
  res.json({ message: "Group deleted" });
});

// --- EXPENSE SPECIFIC ROUTES ---

// Add expense
app.post("/api/groups/:id/expenses", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    group.expenses.push(req.body);
    group.updatedAt = Date.now();
    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: "Failed to add expense" });
  }
});

// Delete expense
app.delete("/api/groups/:id/expenses/:expId", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    group.expenses = group.expenses.filter(e => e.id !== req.params.expId);
    group.updatedAt = Date.now();
    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

// 4) Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
