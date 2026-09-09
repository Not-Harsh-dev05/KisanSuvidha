/**
 * Minimal i18n utility for Kisan Suvidha.
 * Provides translated strings for English and Hindi (hi).
 * Extend this dictionary as more pages are translated.
 */

export type Lang = "en" | "hi";

const translations = {
  // ── Navigation ──────────────────────────────────────────────────────────
  nav_home: { en: "Home", hi: "मुख पृष्ठ" },
  nav_farmer: { en: "Farmer Services", hi: "किसान सेवाएँ" },
  nav_procurement: { en: "Procurement Centres", hi: "खरीद केंद्र" },
  nav_market: { en: "Direct Market", hi: "प्रत्यक्ष बाज़ार" },
  nav_prices: { en: "Price Information", hi: "मूल्य जानकारी" },
  nav_transactions: { en: "Transactions", hi: "लेन-देन" },
  nav_help: { en: "Help & Support", hi: "सहायता" },

  // ── Home page ────────────────────────────────────────────────────────────
  home_title: { en: "Kisan Suvidha", hi: "किसान सुविधा" },
  home_tagline: {
    en: "Know where to sell, when to arrive and what price you can get.",
    hi: "जानें कहाँ बेचें, कब पहुँचें और क्या मूल्य मिलेगा।",
  },
  home_desc: {
    en: "Access procurement-centre queue information and connect directly with buyers to reduce waiting time, improve price transparency and reduce unnecessary intermediaries.",
    hi: "खरीद केंद्र की कतार की जानकारी प्राप्त करें और सीधे खरीदारों से जुड़ें — प्रतीक्षा समय कम करें, मूल्य पारदर्शिता बढ़ाएँ और बिचौलियों को घटाएँ।",
  },
  home_btn_register: { en: "Register Crop", hi: "फसल दर्ज करें" },
  home_btn_dashboard: { en: "Farmer Dashboard", hi: "किसान डैशबोर्ड" },
  home_btn_procurement: { en: "Find Procurement Centre", hi: "खरीद केंद्र खोजें" },
  home_primary_services: { en: "Primary Services", hi: "प्रमुख सेवाएँ" },
  home_procurement_status: {
    en: "Procurement Centres — Current Status",
    hi: "खरीद केंद्र — वर्तमान स्थिति",
  },
  home_reference_prices: {
    en: "Reference Prices (Illustrative)",
    hi: "संदर्भ मूल्य (उदाहरण हेतु)",
  },
  home_prototype_notice: {
    en: "Kisan Suvidha is a Smart India Hackathon 2026 prototype. All figures, centres, buyers and notifications shown are illustrative mock data. This is not an official Government of India website.",
    hi: "किसान सुविधा स्मार्ट इंडिया हैकाथॉन 2026 का प्रोटोटाइप है। सभी आंकड़े, केंद्र, खरीदार और सूचनाएँ उदाहरण डेटा हैं। यह भारत सरकार की आधिकारिक वेबसाइट नहीं है।",
  },

  // ── Farmer Dashboard ─────────────────────────────────────────────────────
  farmer_title: { en: "Farmer Dashboard", hi: "किसान डैशबोर्ड" },
  farmer_subtitle: {
    en: "One crop, two selling paths — government procurement or direct market.",
    hi: "एक फसल, दो बिक्री रास्ते — सरकारी खरीद या प्रत्यक्ष बाज़ार।",
  },
  farmer_profile: { en: "Farmer Profile", hi: "किसान प्रोफ़ाइल" },
  farmer_label: { en: "Farmer", hi: "किसान" },
  farmer_id: { en: "Farmer ID", hi: "किसान आईडी" },
  farmer_crop_label: { en: "Registered Crop", hi: "दर्ज फसल" },
  farmer_location: { en: "Location", hi: "स्थान" },

  // ── Register Crop ─────────────────────────────────────────────────────────
  reg_title: { en: "Register Crop", hi: "फसल दर्ज करें" },
  reg_subtitle: {
    en: "Step 1 of 2 — crop details. Step 2 — choose your selling path.",
    hi: "चरण 1 — फसल विवरण। चरण 2 — बिक्री मार्ग चुनें।",
  },

  // ── Queue / Procurement ───────────────────────────────────────────────────
  queue_your_token: { en: "Your Token", hi: "आपका टोकन" },
  queue_current: { en: "Current Token", hi: "वर्तमान टोकन" },
  queue_ahead: { en: "Farmers Ahead", hi: "आगे के किसान" },
  queue_wait: { en: "Estimated Wait", hi: "अनुमानित प्रतीक्षा" },
  queue_turn: { en: "Expected Turn", hi: "अपेक्षित बारी" },

  // ── Common ────────────────────────────────────────────────────────────────
  common_centre: { en: "Centre", hi: "केंद्र" },
  common_district: { en: "District", hi: "ज़िला" },
  common_waiting: { en: "Waiting", hi: "प्रतीक्षारत" },
  common_status: { en: "Status", hi: "स्थिति" },
  common_crop: { en: "Crop", hi: "फसल" },
  common_reference: { en: "Reference", hi: "संदर्भ मूल्य" },
  common_buyer_range: { en: "Buyer Offer Range", hi: "खरीदार प्रस्ताव सीमा" },
  common_view_all_centres: { en: "View all procurement centres", hi: "सभी खरीद केंद्र देखें" },
  common_view_prices: {
    en: "View price information and supply chain comparison",
    hi: "मूल्य जानकारी और आपूर्ति श्रृंखला तुलना देखें",
  },
  common_prototype_notice: { en: "Prototype Notice", hi: "प्रोटोटाइप सूचना" },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key][lang];
}

/**
 * Returns a bound translate function for the given language.
 * Usage: const tr = useT(language);  tr("home_title")
 */
export function useT(lang: Lang) {
  return (key: TranslationKey) => translations[key][lang];
}
