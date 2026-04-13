const { createHouses } = require("./houses");

const store = {
  houses: createHouses(),
};

const findHouse = (id) => store.houses.find((house) => house.id === id);

const joinHouse = (id) => {
  const house = findHouse(id);
  if (!house) return null;
  house.members += 1;
  return house;
};

module.exports = {
  store,
  findHouse,
  joinHouse,
};
