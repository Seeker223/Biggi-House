const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    house: { type: mongoose.Schema.Types.ObjectId, ref: "House", required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "paid" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contribution", contributionSchema);
