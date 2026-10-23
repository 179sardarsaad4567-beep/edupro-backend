const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const results = await Result.find().populate("student", "name studentId course semester").sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.json({ message: "Result deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;