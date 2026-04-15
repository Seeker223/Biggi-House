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

export const getStoredTransactions = () => {
  try {
    const raw = localStorage.getItem("biggiTransactions");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addStoredTransaction = (transaction) => {
  const transactions = getStoredTransactions();
  transactions.unshift(transaction);
  localStorage.setItem(
    "biggiTransactions",
    JSON.stringify(transactions.slice(0, 20))
  );
};

export const clearStoredTransactions = () => {
  localStorage.removeItem("biggiTransactions");
};

export const getUserWalletBalance = (user) => {
  if (!user) return 0;

  const candidates = [
    user.mainBalance,
    user.walletBalance,
    user.balance,
    user.accountBalance,
    user.wallet?.balance,
    user.wallet?.mainBalance,
  ];

  const value = candidates.find(
    (item) => item !== undefined && item !== null && !Number.isNaN(Number(item))
  );

  return Number(value ?? 0);
};

export const updateUserWalletBalance = (user, nextBalance) => {
  if (!user) return user;

  const normalizedBalance = Number(nextBalance || 0);
  const nextUser = { ...user };

  if ("mainBalance" in nextUser || !("walletBalance" in nextUser)) {
    nextUser.mainBalance = normalizedBalance;
  }

  if ("walletBalance" in nextUser) {
    nextUser.walletBalance = normalizedBalance;
  }

  if ("balance" in nextUser) {
    nextUser.balance = normalizedBalance;
  }

  if ("accountBalance" in nextUser) {
    nextUser.accountBalance = normalizedBalance;
  }

  if (nextUser.wallet && typeof nextUser.wallet === "object") {
    nextUser.wallet = {
      ...nextUser.wallet,
      balance:
        nextUser.wallet.balance !== undefined
          ? normalizedBalance
          : nextUser.wallet.balance,
      mainBalance:
        nextUser.wallet.mainBalance !== undefined
          ? normalizedBalance
          : nextUser.wallet.mainBalance,
    };
  }

  return nextUser;
};

export const getHouseReservedBalance = () => {
  const transactions = getStoredTransactions();
  return transactions
    .filter((item) => item?.type === "house-join")
    .reduce((sum, item) => sum + Number(item?.amount || 0), 0);
};

export const getEffectiveWalletBalance = (user) => {
  const main = getUserWalletBalance(user);
  const reserved = getHouseReservedBalance();
  return Math.max(0, Number(main || 0) - Number(reserved || 0));
};
