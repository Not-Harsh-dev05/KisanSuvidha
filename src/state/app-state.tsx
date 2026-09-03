import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  MIN_PER_FARMER,
  buyers,
  formatClock,
  procurementCentres,
  queueFarmers,
  type Buyer,
} from "@/lib/mock-data";

export interface CropRegistration {
  farmerName: string;
  mobile: string;
  state: string;
  district: string;
  village: string;
  crop: string;
  quantity: number;
  unit: string;
  availableDate: string;
  grade: string;
}

export interface OfferRecord {
  id: string;
  buyerId: string;
  buyerName: string;
  price: number;
  quantityKg: number;
  transportPerKg: number;
  pickupDate: string;
  status: "Offer Sent" | "Accepted" | "Rejected" | "Counter Sent";
}

export interface NotificationRecord {
  id: string;
  time: string;
  title: string;
  message: string;
  kind: "procurement" | "market" | "system";
}

export type TransactionStage =
  | "Offer Accepted"
  | "Transport Assigned"
  | "Pickup Scheduled"
  | "Crop Delivered"
  | "Transaction Completed";

export const transactionStages: TransactionStage[] = [
  "Offer Accepted",
  "Transport Assigned",
  "Pickup Scheduled",
  "Crop Delivered",
  "Transaction Completed",
];

const defaultCrop: CropRegistration = {
  farmerName: "Ramesh Kumar",
  mobile: "98765 43210",
  state: "Punjab",
  district: "Ludhiana",
  village: "Rampur Kalan",
  crop: "Wheat",
  quantity: 5000,
  unit: "kg",
  availableDate: "2026-09-05",
  grade: "A",
};

const initialNotifications: NotificationRecord[] = [
  {
    id: "n1",
    time: "10:25 AM",
    title: "Procurement Queue Updated",
    message: "26 farmers are currently ahead of you.",
    kind: "procurement",
  },
  {
    id: "n2",
    time: "01:45 PM",
    title: "Queue Movement",
    message: "Estimated waiting time reduced to 2 hours.",
    kind: "procurement",
  },
  {
    id: "n3",
    time: "03:30 PM",
    title: "Turn Approaching",
    message: "Your token is approaching. Please plan your arrival.",
    kind: "procurement",
  },
  {
    id: "n4",
    time: "04:10 PM",
    title: "New Buyer Offer",
    message: "Punjab Grain Retail offered ₹27/kg for 2,000 kg wheat.",
    kind: "market",
  },
];

interface AppStateValue {
  crop: CropRegistration;
  setCrop: (c: CropRegistration) => void;
  cropRegistered: boolean;
  registerCrop: (c: CropRegistration) => void;
  chosenPath: "procurement" | "market" | null;
  setChosenPath: (p: "procurement" | "market" | null) => void;

  farmerToken: number;
  currentToken: number;
  paused: boolean;
  activeCounters: number;
  centreId: string;
  centre: (typeof procurementCentres)[number];
  selectCentre: (id: string) => void;
  farmersAhead: number;
  waitMinutes: number;
  expectedTurn: string;
  processNext: () => void;
  togglePause: () => void;
  resetDemo: () => void;
  completedTokens: number[];

  offers: OfferRecord[];
  submitOffer: (o: Omit<OfferRecord, "id" | "status">) => void;
  respondToOffer: (id: string, status: OfferRecord["status"]) => void;
  acceptedOffer: OfferRecord | null;

  selectedBuyer: Buyer | null;
  selectBuyer: (id: string) => void;
  selectedTransportId: string | null;
  selectTransport: (id: string) => void;
  transactionStageIndex: number;
  advanceTransaction: () => void;

  notifications: NotificationRecord[];
  pushNotification: (n: Omit<NotificationRecord, "id" | "time">) => void;

  fontScale: number;
  changeFontScale: (dir: "dec" | "reset" | "inc") => void;
  language: "en" | "hi";
  toggleLanguage: () => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

const clockNow = () => {
  const d = new Date();
  let h = d.getHours();
  const suffix = h >= 12 ? "PM" : "AM";
  h = h % 12 === 0 ? 12 : h % 12;
  return `${h}:${d.getMinutes().toString().padStart(2, "0")} ${suffix}`;
};

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [crop, setCrop] = useState<CropRegistration>(defaultCrop);
  const [cropRegistered, setCropRegistered] = useState(false);
  const [chosenPath, setChosenPath] = useState<"procurement" | "market" | null>(null);

  const [centreId, setCentreId] = useState("rampur");
  const centre = procurementCentres.find((c) => c.id === centreId) ?? procurementCentres[0]!;
  const [currentToken, setCurrentToken] = useState(121);
  const [paused, setPaused] = useState(false);
  const [completedTokens, setCompletedTokens] = useState<number[]>([]);
  const farmerToken = 147;

  const [offers, setOffers] = useState<OfferRecord[]>([]);
  const [selectedBuyerId, setSelectedBuyerId] = useState<string | null>(null);
  const [selectedTransportId, setSelectedTransportId] = useState<string | null>(null);
  const [transactionStageIndex, setTransactionStageIndex] = useState(0);
  const [notifications, setNotifications] = useState(initialNotifications);

  const [fontScale, setFontScale] = useState(16);
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const pushNotification = useCallback(
    (n: Omit<NotificationRecord, "id" | "time">) => {
      setNotifications((prev) => [
        { ...n, id: `n-${Date.now()}-${prev.length}`, time: clockNow() },
        ...prev,
      ]);
    },
    [],
  );

  const farmersAhead = Math.max(0, farmerToken - currentToken);
  const waitMinutes = Math.round(farmersAhead * MIN_PER_FARMER);
  const expectedTurn = formatClock(waitMinutes);

  const processNext = useCallback(() => {
    if (paused) return;
    setCurrentToken((t) => {
      const next = Math.min(farmerToken, t + 1);
      setCompletedTokens((prev) => [...prev, t]);
      const ahead = Math.max(0, farmerToken - next);
      if (ahead === 10 || ahead === 5) {
        pushNotification({
          title: "Turn Approaching",
          message: `Only ${ahead} farmers are ahead of you. Please plan your arrival.`,
          kind: "procurement",
        });
      }
      if (ahead === 0) {
        pushNotification({
          title: "Your Turn",
          message: `Token ${farmerToken} is now being called at ${centre.name}.`,
          kind: "procurement",
        });
      }
      return next;
    });
  }, [paused, centre.name, pushNotification]);

  const resetDemo = useCallback(() => {
    setCurrentToken(121);
    setPaused(false);
    setCompletedTokens([]);
  }, []);

  const selectCentre = useCallback((id: string) => {
    setCentreId(id);
    const c = procurementCentres.find((x) => x.id === id);
    if (c) {
      setCurrentToken(c.currentToken);
      setCompletedTokens([]);
    }
  }, []);

  const submitOffer = useCallback(
    (o: Omit<OfferRecord, "id" | "status">) => {
      setOffers((prev) => [
        { ...o, id: `o-${Date.now()}-${prev.length}`, status: "Offer Sent" },
        ...prev,
      ]);
      pushNotification({
        title: "New Buyer Offer",
        message: `${o.buyerName} offered ₹${o.price}/kg for ${o.quantityKg.toLocaleString("en-IN")} kg ${crop.crop.toLowerCase()}.`,
        kind: "market",
      });
    },
    [crop.crop, pushNotification],
  );

  const respondToOffer = useCallback(
    (id: string, status: OfferRecord["status"]) => {
      setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
      if (status === "Accepted") {
        setTransactionStageIndex(0);
        pushNotification({
          title: "Offer Accepted",
          message: "Your transaction has been confirmed. Transaction ID KS-2026-00421.",
          kind: "market",
        });
      }
    },
    [pushNotification],
  );

  const acceptedOffer = offers.find((o) => o.status === "Accepted") ?? null;

  const value = useMemo<AppStateValue>(
    () => ({
      crop,
      setCrop,
      cropRegistered,
      registerCrop: (c) => {
        setCrop(c);
        setCropRegistered(true);
      },
      chosenPath,
      setChosenPath,
      farmerToken,
      currentToken,
      paused,
      activeCounters: centre.counters,
      centreId,
      centre,
      selectCentre,
      farmersAhead,
      waitMinutes,
      expectedTurn,
      processNext,
      togglePause: () => setPaused((p) => !p),
      resetDemo,
      completedTokens,
      offers,
      submitOffer,
      respondToOffer,
      acceptedOffer,
      selectedBuyer: buyers.find((b) => b.id === selectedBuyerId) ?? null,
      selectBuyer: setSelectedBuyerId,
      selectedTransportId,
      selectTransport: (id) => {
        setSelectedTransportId(id);
        setTransactionStageIndex((i) => Math.max(i, 1));
      },
      transactionStageIndex,
      advanceTransaction: () => setTransactionStageIndex((i) => Math.min(4, i + 1)),
      notifications,
      pushNotification,
      fontScale,
      changeFontScale: (dir) =>
        setFontScale((s) => {
          const next = dir === "reset" ? 16 : dir === "inc" ? s + 1 : s - 1;
          return Math.min(20, Math.max(14, next));
        }),
      language,
      toggleLanguage: () => setLanguage((l) => (l === "en" ? "hi" : "en")),
    }),
    [
      crop,
      cropRegistered,
      chosenPath,
      currentToken,
      paused,
      centre,
      centreId,
      selectCentre,
      farmersAhead,
      waitMinutes,
      expectedTurn,
      processNext,
      resetDemo,
      completedTokens,
      offers,
      submitOffer,
      respondToOffer,
      acceptedOffer,
      selectedBuyerId,
      selectedTransportId,
      transactionStageIndex,
      notifications,
      pushNotification,
      fontScale,
      language,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

export { queueFarmers };
