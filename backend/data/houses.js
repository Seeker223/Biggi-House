const createHouses = () =>
  Array.from({ length: 10 }, (_, index) => {
    const number = index + 1;
    return {
      id: `house-${number}`,
      number,
      minimum: number * 100,
      members: Math.floor(Math.random() * 50) + 1,
      status: "In Progress",
    };
  });

module.exports = { createHouses };
