// Live backend on Render — was localhost:5000 during local development
export const API_BASE = "https://mycab-backend.onrender.com/api";

export async function getFare(pickupCity, dropCity) {
  const res = await fetch(
    `${API_BASE}/fare?pickupCity=${encodeURIComponent(
      pickupCity
    )}&dropCity=${encodeURIComponent(dropCity)}`
  );
  if (!res.ok) throw new Error("Fare not found for this route");
  return res.json();
}

export async function createBooking(data) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Booking failed, please try again");
  return res.json();
}