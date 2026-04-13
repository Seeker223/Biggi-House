const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function getHouses() {
  const res = await fetch(`${API_BASE}/houses`);
  if (!res.ok) throw new Error("Failed to fetch houses");
  const data = await res.json();
  return data.houses || [];
}

export async function joinHouse(id) {
  const res = await fetch(`${API_BASE}/houses/${id}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to join house");
  const data = await res.json();
  return data.house;
}
