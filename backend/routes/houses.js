const express = require("express");
const House = require("../models/House");
const Contribution = require("../models/Contribution");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  House.find()
    .sort({ number: 1 })
    .then((houses) => res.json({ houses }))
    .catch(() => res.status(500).json({ message: "Server error" }));
});

router.post("/:id/join", auth, async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }
    house.members.push(req.user.id);
    await house.save();
    await Contribution.create({
      user: req.user.id,
      house: house._id,
      amount: house.minimum,
      status: "paid",
    });
    return res.json({ house });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
