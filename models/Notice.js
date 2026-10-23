const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ["General", "Exam", "Fee", "Event"], default: "General" },
    date: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);