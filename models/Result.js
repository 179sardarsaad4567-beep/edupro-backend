const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  subjects: [{
    name: String,
    marks: Number,
    total: { type: Number, default: 100 }
  }],
  semester: { type: String, default: "1st" }
}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);