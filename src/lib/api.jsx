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

// `data` can include an `idPhotoFile` key holding a File object (from an
// <input type="file" />). Everything is sent as multipart/form-data so the
// backend (multer + Cloudinary) can receive the actual image bytes.
export async function createBooking(data) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "idPhotoFile") {
      if (value) formData.append("idPhoto", value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    // No Content-Type header here — the browser sets the correct
    // multipart boundary automatically when the body is FormData.
    body: formData,
  });
  if (!res.ok) throw new Error("Booking failed, please try again");
  return res.json();
}