// Backend base URL — jab deploy kare tab isko badal dena
export const API_BASE = "http://localhost:5000/api";

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