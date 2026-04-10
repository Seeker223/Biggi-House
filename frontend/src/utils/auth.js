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
