export const houses = Array.from({ length: 10 }, (_, index) => {
  const number = index + 1;
  return {
    id: `house-${number}`,
    number,
    minimum: number * 100,
    members: Math.floor(Math.random() * 9) + 1,
    totalPool: number * 100 * 10,
    status: number % 3 === 0 ? "In Progress" : "Open",
  };
});
