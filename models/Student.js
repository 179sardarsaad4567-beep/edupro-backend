const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    course: { type: String, required: true },
    semester: { type: String, default: "1st" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    attendance: { type: Number, default: 0 },
    feeStatus: { type: String, enum: ["Paid", "Pending", "Overdue"], default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);