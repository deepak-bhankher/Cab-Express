// Approximate lat/long for every city in your service area.
// Add a new city here (and in components/CityInput.jsx) and fare works
// automatically — no need to add every route by hand.
export const CITY_COORDS = {
  Hisar: [29.1492, 75.7217],
  Delhi: [28.7041, 77.1025],
  Gurgaon: [28.4595, 77.0266],
  Gurugram: [28.4595, 77.0266],
  Noida: [28.5355, 77.391],
  Faridabad: [28.4089, 77.3178],
  Chandigarh: [30.7333, 76.7794],
  Panipat: [29.3909, 76.9635],
  Rohtak: [28.8955, 76.6066],
  Karnal: [29.6857, 76.9905],
  Sonipat: [28.9931, 77.0151],
  Jind: [29.316, 76.314],
  Sirsa: [29.5321, 75.028],
  Fatehabad: [29.5148, 75.4534],
  Ambala: [30.3752, 76.7821],
  Jaipur: [26.9124, 75.7873],
};

// Pricing — tweak these three numbers to change how fares are calculated
const BASE_FARE = 60; // fixed pickup charge
const PER_KM_RATE = 13; // ₹ per km
const ROAD_FACTOR = 1.25; // straight-line distance × this ≈ real road distance
const MIN_FARE = 150; // fare never drops below this, even for very short trips

// Haversine formula — distance (km) between two lat/long points
function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Returns { fare, distanceKm } or null if a city isn't in the service list
export function calculateFare(pickupCity, dropCity) {
  const pickup = CITY_COORDS[pickupCity];
  const drop = CITY_COORDS[dropCity];

  if (!pickup || !drop) return null;
  if (pickupCity === dropCity) return null;

  const straightLine = distanceKm(pickup[0], pickup[1], drop[0], drop[1]);
  const roadDistance = straightLine * ROAD_FACTOR;
  const fare = Math.round(BASE_FARE + roadDistance * PER_KM_RATE);

  return {
    fare: Math.max(fare, MIN_FARE),
    distanceKm: Math.round(roadDistance),
  };
}

// ---------------------------------------------------------------------------
// Fixed outstation routes — airport transfers & pilgrimage trips from Hisar.
// Each row has a Small-car and Large-car price. Add more rows here anytime,
// same shape: { from, to, small, large }. These take priority over the
// distance-based estimate above whenever a pickup+drop pair matches.
// ---------------------------------------------------------------------------
export const FIXED_ROUTES = [
  { from: "Hisar", to: "Delhi Airport", small: 2500, large: 3000 },
  { from: "Hisar", to: "New Delhi", small: 2500, large: 3000 },
  { from: "Hisar", to: "Nizamuddin", small: 3000, large: 3500 },
  { from: "Hisar", to: "Hindon Airport", small: 3500, large: 4000 },
  { from: "Hisar", to: "Jewar Airport", small: 4000, large: 4500 },
  { from: "Hisar", to: "Khatu Shyam", small: 8000, large: 10000 },
  { from: "Hisar", to: "Salasar", small: 8000, large: 10000 },
  { from: "Hisar", to: "Gurugram", small: 2200, large: 2800 },
  { from: "Hisar", to: "Chandigarh", small: 4000, large: 4500 },
];

function normalize(str) {
  return str.trim().toLowerCase();
}

// Looks up a fixed route by pickup+drop (case/space-insensitive).
// Returns { small, large } or null if this pair isn't a fixed route.
export function getFixedFare(pickupCity, dropCity) {
  const match = FIXED_ROUTES.find(
    (r) =>
      normalize(r.from) === normalize(pickupCity) &&
      normalize(r.to) === normalize(dropCity)
  );
  return match ? { small: match.small, large: match.large } : null;
}