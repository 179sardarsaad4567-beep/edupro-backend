const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  amount: { type: Number, default: 45000 },
  paid: { type: Number, default: 0 },
  status: { type: String, enum: ["Paid", "Pending", "Overdue"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Fee", feeSchema);