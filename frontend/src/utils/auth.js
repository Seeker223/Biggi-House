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
