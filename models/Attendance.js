const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true },
  records: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    present: { type: Boolean, default: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);