const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true, unique: true },
    minimum: { type: Number, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, default: "In Progress" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("House", houseSchema);
