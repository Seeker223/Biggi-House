const House = require("../models/House");

const ensureHouses = async () => {
  const count = await House.countDocuments();
  if (count > 0) return;
  const houses = Array.from({ length: 10 }, (_, index) => ({
    number: index + 1,
    minimum: (index + 1) * 100,
    members: [],
    status: "In Progress",
  }));
  await House.insertMany(houses);
};

module.exports = { ensureHouses };
