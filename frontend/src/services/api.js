const API_BASE =
  (import.meta.env.VITE_BASE_URL
    ? `${import.meta.env.VITE_BASE_URL}/api/v1`
    : null) || "http://localhost:5000/api/v1";

export async function getHouses() {
  // Legacy helper retained for older backends; BiggiHouse now uses /biggihouse/houses.
  const res = await fetch(`${API_BASE}/houses`);
  if (!res.ok) throw new Error("Failed to fetch houses");
  const data = await res.json();
  return data.houses || [];
}

export async function joinHouse(id, token) {
  // Legacy helper retained for older backends; BiggiHouse now uses /biggihouse/houses/:id/join.
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/houses/${id}/join`, {
    method: "POST",
    headers,
  });
  if (!res.ok) throw new Error("Failed to join house");
  const data = await res.json();
  return data.house;
}

export async function getBiggiHouseHouses(token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/biggihouse/houses`, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || data.message || "Failed to fetch houses");
    err.code = data.errorCode;
    throw err;
  }
  return data.houses || [];
}

export async function joinBiggiHouseHouse(id, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/biggihouse/houses/${id}/join`, {
    method: "POST",
    headers,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || data.message || "Failed to join house");
    err.code = data.errorCode;
    throw err;
  }
  return data;
}

export async function getBiggiHouseWallet(token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/biggihouse/wallet`, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Failed to load wallet");
  return data.wallet;
}

export async function getBiggiHouseVirtualAccount(token, refresh = false) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const url = `${API_BASE}/biggihouse/wallet/virtual-account${refresh ? "?refresh=true" : ""}`;
  const res = await fetch(url, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Failed to load virtual account");
  return data;
}

export async function generateBiggiHouseTxRef(token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/biggihouse/wallet/generate-tx-ref`, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Failed to generate reference");
  return data.tx_ref;
}

export async function verifyBiggiHouseFlutterwavePayment(payload, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/biggihouse/wallet/verify-flutterwave`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Verification failed");
  return data;
}

export async function getBiggiHouseDepositFeeSettings(token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/biggihouse/wallet/deposit-fee-settings`, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Failed to load fee settings");
  return data.settings || data.feeSettings || data;
}

export async function depositBiggiHouseWallet(amount, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/biggihouse/wallet/deposit`, {
    method: "POST",
    headers,
    body: JSON.stringify({ amount }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Deposit failed");
  return data;
}

export async function withdrawBiggiHouseWallet(amount, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/biggihouse/wallet/withdraw`, {
    method: "POST",
    headers,
    body: JSON.stringify({ amount }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Withdraw failed");
  return data;
}

export async function getBiggiHouseEligibility(token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/biggihouse/eligibility`, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Eligibility check failed");
  return data;
}

export async function getBiggiHouseMemberships(token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/biggihouse/memberships`, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Failed to load memberships");
  return data.memberships || [];
}

export async function getBiggiHouseVendors(token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/biggihouse/vendors`, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Failed to load vendors");
  return data.vendors || [];
}

export async function createBiggiHouseVendorRequest(payload, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/biggihouse/vendor-requests`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Request failed");
  return data.request;
}

export async function getBiggiDataBalance(token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/wallet/balance`, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Failed to load balance");
  return data.balance;
}

export async function getBiggiDataDepositFeeSettings(token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/wallet/deposit-fee-settings`, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Failed to load fee settings");
  return data.settings || data.feeSettings || data;
}

export async function getBiggiDataVirtualAccount(token, refresh = false) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const url = `${API_BASE}/wallet/virtual-account${refresh ? "?refresh=true" : ""}`;
  const res = await fetch(url, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Failed to load virtual account");
  return data;
}

export async function generateBiggiDataTxRef(token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/wallet/generate-tx-ref`, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Failed to generate reference");
  return data.tx_ref;
}

export async function verifyBiggiDataFlutterwavePayment(payload, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/wallet/verify-flutterwave`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Verification failed");
  return data;
}

export async function registerUser(payload) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Client-App": "biggi-house" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.error || data.message || "Registration failed");
    err.requiresVerification = data.requiresVerification;
    err.email = data.email;
    throw err;
  }
  return data;
}

export async function loginUser(payload) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Client-App": "biggi-house" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.error || data.message || "Login failed");
    err.requiresVerification = data.requiresVerification;
    err.email = data.email;
    throw err;
  }
  return data;
}

export async function verifyEmailOtp(payload) {
  const res = await fetch(`${API_BASE}/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Verification failed");
  return data;
}

export async function resendVerification(payload) {
  const res = await fetch(`${API_BASE}/auth/resend-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Resend failed");
  return data;
}

export async function forgotPassword(payload) {
  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Request failed");
  return data;
}

export async function getMe(token) {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}`, "X-Client-App": "biggi-house" },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}
