const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const auth = require("../middleware/auth");

// Get all + search
router.get("/", auth, async (req, res) => {
  try {
    const filter = {};
    if (req.query.search) {
      filter.$or = ["name", "email", "studentId", "course"].map((f) => ({
        [f]: { $regex: req.query.search, $options: "i" },
      }));
    }
    const students = await Student.find(filter).sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add
router.post("/", auth, async (req, res) => {
  try {
    const count = await Student.countDocuments();
    const student = await Student.create({
      ...req.body,
      studentId: "STU-" + (1001 + count),
    });
    res.status(201).json(student);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "Email already exists" });
    res.status(400).json({ message: err.message });
  }
});

// Update
router.put("/:id", auth, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;