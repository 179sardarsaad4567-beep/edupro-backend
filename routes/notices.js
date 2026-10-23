const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const notice = await Notice.create({
      ...req.body,
      date: new Date().toISOString().slice(0, 10),
    });
    res.status(201).json(notice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    res.json({ message: "Notice deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;