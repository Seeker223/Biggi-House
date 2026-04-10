export const houses = Array.from({ length: 10 }, (_, index) => {
  const number = index + 1;
  const maxUsers = null;
  const members = Math.floor(Math.random() * 50) + 1;
  return {
    id: `house-${number}`,
    number,
    minimum: number * 100,
    members,
    maxUsers,
    totalPool: number * 100 * 10,
    status: members > 0 ? "In Progress" : "Open",
  };
});
