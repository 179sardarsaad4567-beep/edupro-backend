const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const filter = {};
    if (req.query.search) {
      filter.$or = ["name", "email", "teacherId", "subject", "department"].map((f) => ({
        [f]: { $regex: req.query.search, $options: "i" },
      }));
    }
    const teachers = await Teacher.find(filter).sort({ createdAt: -1 });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const count = await Teacher.countDocuments();
    const teacher = await Teacher.create({
      ...req.body,
      teacherId: "TCH-" + String(count + 1).padStart(2, "0"),
    });
    res.status(201).json(teacher);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "Email already exists" });
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Teacher deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;