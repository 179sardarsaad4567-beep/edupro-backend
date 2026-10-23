const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    teacherId: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    subject: { type: String, required: true },
    department: { type: String, default: "CS" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);