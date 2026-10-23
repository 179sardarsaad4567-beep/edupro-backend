const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const students = await Student.find({ status: "Active" }).select("name studentId course attendance");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { date, records } = req.body;
    let attendance = await Attendance.findOne({ date });
    if (attendance) {
      attendance.records = records;
      await attendance.save();
    } else {
      attendance = await Attendance.create({ date, records });
    }

    for (const r of records) {
      if (r.studentId) {
        const all = await Attendance.find({ "records.studentId": r.studentId });
        let present = 0, total = 0;
        all.forEach(a => {
          const rec = a.records.find(x => x.studentId.toString() === r.studentId.toString());
          if (rec) { total++; if (rec.present) present++; }
        });
        const percent = total ? Math.round((present / total) * 100) : 0;
        await Student.findByIdAndUpdate(r.studentId, { attendance: percent });
      }
    }

    res.json(attendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;