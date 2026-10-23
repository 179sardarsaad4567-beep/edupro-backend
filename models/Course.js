const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseId: { type: String, unique: true },
    name: { type: String, required: true },
    duration: { type: String, default: "4 Years" },
    students: { type: Number, default: 0 },
    subjects: { type: Number, default: 20 },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);