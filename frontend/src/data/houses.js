export const houses = Array.from({ length: 10 }, (_, index) => {
  const number = index + 1;
  const maxUsers = 10;
  const members = Math.floor(Math.random() * 11);
  return {
    id: `house-${number}`,
    number,
    minimum: number * 100,
    members,
    maxUsers,
    totalPool: number * 100 * 10,
    status: members >= maxUsers ? "Full" : members > 0 ? "In Progress" : "Open",
  };
});
