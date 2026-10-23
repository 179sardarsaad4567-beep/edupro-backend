const express = require("express");
const router = express.Router();
const Fee = require("../models/Fee");
const Student = require("../models/Student");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const fees = await Fee.find().populate("student", "name studentId course").sort({ createdAt: -1 });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const fee = await Fee.create(req.body);
    await Student.findByIdAndUpdate(req.body.student, { feeStatus: req.body.status || "Pending" });
    res.status(201).json(fee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (fee?.student) {
      await Student.findByIdAndUpdate(fee.student, { feeStatus: req.body.status });
    }
    res.json(fee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;