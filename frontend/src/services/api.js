const API_BASE =
  (import.meta.env.VITE_BASE_URL
    ? `${import.meta.env.VITE_BASE_URL}/api/v1`
    : null) || "http://localhost:5000/api/v1";

export async function getHouses() {
  const res = await fetch(`${API_BASE}/houses`);
  if (!res.ok) throw new Error("Failed to fetch houses");
  const data = await res.json();
  return data.houses || [];
}

export async function joinHouse(id, token) {
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

export async function registerUser(payload) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    headers: { "Content-Type": "application/json" },
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
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}
