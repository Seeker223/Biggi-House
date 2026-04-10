export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("biggiUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const clearStoredUser = () => {
  localStorage.removeItem("biggiUser");
};

export const getStoredHouse = () => {
  try {
    const raw = localStorage.getItem("biggiHouse");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredHouse = (house) => {
  localStorage.setItem("biggiHouse", JSON.stringify(house));
};

export const getStoredHouses = () => {
  try {
    const raw = localStorage.getItem("biggiHouses");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addStoredHouse = (house) => {
  const houses = getStoredHouses();
  const exists = houses.find((item) => item.id === house.id);
  if (!exists) {
    houses.push(house);
    localStorage.setItem("biggiHouses", JSON.stringify(houses));
  }
};

export const clearStoredHouses = () => {
  localStorage.removeItem("biggiHouses");
};
