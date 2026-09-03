export type CentreStatus = "Accepting" | "High Queue" | "Closed";

export interface ProcurementCentre {
  id: string;
  name: string;
  district: string;
  distanceKm: number;
  currentToken: number;
  waitingFarmers: number;
  status: CentreStatus;
  counters: number;
}

export const procurementCentres: ProcurementCentre[] = [
  {
    id: "rampur",
    name: "Rampur Procurement Centre",
    district: "Ludhiana",
    distanceKm: 8,
    currentToken: 121,
    waitingFarmers: 26,
    status: "Accepting",
    counters: 3,
  },
  {
    id: "model-mandi",
    name: "Model Mandi Centre",
    district: "Amritsar",
    distanceKm: 14,
    currentToken: 84,
    waitingFarmers: 18,
    status: "Accepting",
    counters: 2,
  },
  {
    id: "central",
    name: "Central Procurement Centre",
    district: "Patiala",
    distanceKm: 22,
    currentToken: 156,
    waitingFarmers: 41,
    status: "High Queue",
    counters: 4,
  },
  {
    id: "moga",
    name: "Moga Grain Procurement Centre",
    district: "Moga",
    distanceKm: 29,
    currentToken: 62,
    waitingFarmers: 12,
    status: "Accepting",
    counters: 2,
  },
];

export interface Buyer {
  id: string;
  name: string;
  location: string;
  requiredQuantityKg: number;
  offerPrice: number;
  distanceKm: number;
  transportPerKg: number;
}

export const buyers: Buyer[] = [
  {
    id: "punjab-grain",
    name: "Punjab Grain Retail",
    location: "Ludhiana",
    requiredQuantityKg: 2000,
    offerPrice: 26,
    distanceKm: 18,
    transportPerKg: 0.8,
  },
  {
    id: "freshmart",
    name: "FreshMart Wholesale",
    location: "Amritsar",
    requiredQuantityKg: 3000,
    offerPrice: 27,
    distanceKm: 32,
    transportPerKg: 1.4,
  },
  {
    id: "local-food",
    name: "Local Food Retail",
    location: "Ludhiana",
    requiredQuantityKg: 5000,
    offerPrice: 25.5,
    distanceKm: 11,
    transportPerKg: 0.5,
  },
];

export const referencePrices = [
  { crop: "Wheat", reference: 24, low: 25.5, high: 27, unit: "kg" },
  { crop: "Paddy", reference: 22.1, low: 22.5, high: 24, unit: "kg" },
  { crop: "Rice", reference: 38, low: 39, high: 42, unit: "kg" },
  { crop: "Maize", reference: 20.9, low: 21, high: 23.2, unit: "kg" },
];

export const transportOptions = [
  {
    id: "local-transporter",
    name: "Local Transporter (Shared Load)",
    capacity: "Up to 2,000 kg",
    ratePerKmPerQuintal: 0,
    estimate: 2600,
    availability: "Available today",
  },
  {
    id: "tractor-trolley",
    name: "Tractor / Trolley",
    capacity: "Up to 3,500 kg",
    ratePerKmPerQuintal: 0,
    estimate: 4200,
    availability: "Available from 07 Sep 2026",
  },
  {
    id: "small-truck",
    name: "Small Truck (Mahindra Bolero Pickup)",
    capacity: "Up to 6,000 kg",
    ratePerKmPerQuintal: 0,
    estimate: 5400,
    availability: "Available today",
  },
];

export interface QueueFarmer {
  token: number;
  name: string;
  crop: string;
  quantityKg: number;
}

export const queueFarmers: QueueFarmer[] = [
  { token: 121, name: "Ramesh Kumar", crop: "Wheat", quantityKg: 5000 },
  { token: 122, name: "Harpreet Singh", crop: "Wheat", quantityKg: 3000 },
  { token: 123, name: "Aman Kumar", crop: "Wheat", quantityKg: 4200 },
  { token: 124, name: "Gurpreet Kaur", crop: "Paddy", quantityKg: 2800 },
  { token: 125, name: "Sukhwinder Singh", crop: "Wheat", quantityKg: 6100 },
  { token: 126, name: "Jaswant Rai", crop: "Maize", quantityKg: 1900 },
  { token: 127, name: "Baldev Singh", crop: "Wheat", quantityKg: 3600 },
];

export const buyerSearchResults = [
  {
    farmer: "Ramesh Kumar",
    crop: "Wheat",
    quantityKg: 5000,
    location: "Ludhiana",
    expectedPrice: 25,
    availability: "05 Sep 2026",
  },
  {
    farmer: "Harpreet Singh",
    crop: "Wheat",
    quantityKg: 3000,
    location: "Moga",
    expectedPrice: 24.5,
    availability: "06 Sep 2026",
  },
  {
    farmer: "Gurpreet Kaur",
    crop: "Paddy",
    quantityKg: 2800,
    location: "Patiala",
    expectedPrice: 22.75,
    availability: "09 Sep 2026",
  },
  {
    farmer: "Sukhwinder Singh",
    crop: "Wheat",
    quantityKg: 6100,
    location: "Bathinda",
    expectedPrice: 25.25,
    availability: "11 Sep 2026",
  },
  {
    farmer: "Aman Kumar",
    crop: "Maize",
    quantityKg: 4200,
    location: "Amritsar",
    expectedPrice: 21,
    availability: "12 Sep 2026",
  },
];

export const states = ["Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan"];
export const districts = ["Ludhiana", "Patiala", "Amritsar", "Bathinda", "Moga"];
export const crops = ["Wheat", "Paddy", "Rice", "Maize"];
export const grades = ["A", "B", "C", "FAQ (Fair Average Quality)"];

export const inr = (value: number, fraction = 0) =>
  `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction === 0 ? 2 : fraction,
  })}`;

export const formatMinutes = (mins: number) => {
  const m = Math.max(0, Math.round(mins));
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (h === 0) return `${r}m`;
  return `${h}h ${r.toString().padStart(2, "0")}m`;
};

export const formatClock = (minutesFromBase: number) => {
  // Demo base time: today, 2:50 PM
  const total = 14 * 60 + 50 + Math.round(minutesFromBase);
  const h24 = Math.floor(total / 60) % 24;
  const mm = total % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${mm.toString().padStart(2, "0")} ${suffix}`;
};

export const MIN_PER_FARMER = 8.46;
