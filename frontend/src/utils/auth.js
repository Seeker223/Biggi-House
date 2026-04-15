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

export const setStoredUser = (user) => {
  localStorage.setItem("biggiUser", JSON.stringify(user));
};

const resolveUserId = (userOrId) => {
  if (!userOrId) return "";
  if (typeof userOrId === "string") return userOrId;
  return String(userOrId.id || userOrId._id || userOrId.userId || "");
};

const scopedKey = (base, userOrId) => {
  const userId = resolveUserId(userOrId);
  return userId ? `${base}:${userId}` : base;
};

export const getAuthToken = () => localStorage.getItem("biggiToken");

export const setAuthToken = (token) => {
  localStorage.setItem("biggiToken", token);
};

export const clearAuthToken = () => {
  localStorage.removeItem("biggiToken");
};

export const getRefreshToken = () => localStorage.getItem("biggiRefreshToken");

export const setRefreshToken = (token) => {
  localStorage.setItem("biggiRefreshToken", token);
};

export const clearRefreshToken = () => {
  localStorage.removeItem("biggiRefreshToken");
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

export const getStoredHouses = (userOrId) => {
  const key = scopedKey("biggiHouseHouses", userOrId);
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);

    // Legacy fallback (unscoped).
    const legacyRaw = localStorage.getItem("biggiHouses");
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw);
      if (Array.isArray(legacy) && resolveUserId(userOrId)) {
        localStorage.setItem(key, JSON.stringify(legacy));
        localStorage.removeItem("biggiHouses");
      }
      return Array.isArray(legacy) ? legacy : [];
    }
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addStoredHouse = (house, userOrId) => {
  const key = scopedKey("biggiHouseHouses", userOrId);
  const houses = getStoredHouses(userOrId);
  const exists = houses.find((item) => item.id === house.id);
  if (!exists) {
    houses.push(house);
    localStorage.setItem(key, JSON.stringify(houses));
  }
};

export const clearStoredHouses = (userOrId) => {
  localStorage.removeItem(scopedKey("biggiHouseHouses", userOrId));
};

export const getStoredTransactions = (userOrId) => {
  const key = scopedKey("biggiHouseTransactions", userOrId);
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);

    // Legacy fallback (unscoped).
    const legacyRaw = localStorage.getItem("biggiTransactions");
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw);
      if (Array.isArray(legacy) && resolveUserId(userOrId)) {
        localStorage.setItem(key, JSON.stringify(legacy));
        localStorage.removeItem("biggiTransactions");
      }
      return Array.isArray(legacy) ? legacy : [];
    }
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addStoredTransaction = (transaction, userOrId) => {
  const key = scopedKey("biggiHouseTransactions", userOrId);
  const transactions = getStoredTransactions(userOrId);
  transactions.unshift(transaction);
  localStorage.setItem(
    key,
    JSON.stringify(transactions.slice(0, 50))
  );
};

export const clearStoredTransactions = (userOrId) => {
  localStorage.removeItem(scopedKey("biggiHouseTransactions", userOrId));
};

export const getBiggiHouseWalletBalance = (userOrId) => {
  const key = scopedKey("biggiHouseWalletBalance", userOrId);
  const raw = localStorage.getItem(key);
  const parsed = raw === null ? 0 : Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const setBiggiHouseWalletBalance = (userOrId, nextBalance) => {
  const key = scopedKey("biggiHouseWalletBalance", userOrId);
  const normalized = Math.max(0, Number(nextBalance || 0));
  localStorage.setItem(key, String(normalized));
  return normalized;
};

export const adjustBiggiHouseWalletBalance = (userOrId, delta) => {
  const current = getBiggiHouseWalletBalance(userOrId);
  return setBiggiHouseWalletBalance(userOrId, current + Number(delta || 0));
};
