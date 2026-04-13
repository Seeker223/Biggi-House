const express = require("express");
const House = require("../models/House");
const Contribution = require("../models/Contribution");
const auth = require("../middleware/auth");

const router = express.Router();

const formatHouse = (house) => ({
  id: house._id.toString(),
  number: house.number,
  minimum: house.minimum,
  members: house.members.length,
  status: house.status,
});

router.get("/", (req, res) => {
  House.find()
    .sort({ number: 1 })
    .then((houses) => res.json({ houses: houses.map(formatHouse) }))
    .catch(() => res.status(500).json({ message: "Server error" }));
});

router.post("/:id/join", auth, async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }
    if (!house.members.includes(req.user.id)) {
      house.members.push(req.user.id);
    }
    await house.save();
    await Contribution.create({
      user: req.user.id,
      house: house._id,
      amount: house.minimum,
      status: "paid",
    });
    return res.json({ house: formatHouse(house) });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
