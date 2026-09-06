import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/gov/PageShell";
import { GovAlert, GovButton, Panel, StatusBadge } from "@/components/gov/primitives";
import { TransactionTimeline } from "@/components/gov/features";
import { inr } from "@/lib/mock-data";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/transactions")({
  head: () => ({
    meta: [
      { title: "Transactions & History — Kisan Suvidha" },
      {
        name: "description",
        content:
          "Track ongoing transaction status and view unified history of government procurement and direct market sales.",
      },
      { property: "og:title", content: "Transactions — Kisan Suvidha" },
      {
        property: "og:description",
        content: "One history for both procurement and direct market sales.",
      },
    ],
  }),
  component: Transactions,
});

const procurementHistory = [
  {
    date: "05 Sep 2026",
    crop: "Wheat",
    quantity: "5,000 kg",
    counterparty: "Rampur Procurement Centre",
    channel: "Government Procurement",
    price: "₹24.00/kg (MSP reference)",
    status: "Completed",
  },
  {
    date: "22 Apr 2026",
    crop: "Paddy",
    quantity: "3,200 kg",
    counterparty: "Model Mandi Centre, Amritsar",
    channel: "Government Procurement",
    price: "₹22.10/kg",
    status: "Completed",
  },
];

const marketHistory = [
  {
    date: "07 Sep 2026",
    crop: "Wheat",
    quantity: "2,000 kg",
    counterparty: "Punjab Grain Retail",
    channel: "Direct Market",
    price: "₹27.00/kg",
    status: "Completed",
  },
  {
    date: "18 Mar 2026",
    crop: "Maize",
    quantity: "1,500 kg",
    counterparty: "FreshMart Wholesale",
    channel: "Direct Market",
    price: "₹21.40/kg",
    status: "Completed",
  },
];

function Transactions() {
  const { acceptedOffer, transactionStageIndex, advanceTransaction, crop } = useAppState();
  const [tab, setTab] = useState<"procurement" | "market">("procurement");
  const rows = tab === "procurement" ? procurementHistory : marketHistory;

  const price = acceptedOffer?.price ?? 27;
  const qty = acceptedOffer?.quantityKg ?? 2000;
  const transport = Math.round(qty * (acceptedOffer?.transportPerKg ?? 1));

  return (
    <PageShell
      title="Transactions"
      subtitle="Ongoing transaction status and unified history across both selling paths."
      crumbs={[{ label: "Home", to: "/" }, { label: "Transactions" }]}
    >
      <Panel
        title="Transaction Details"
        aside={<StatusBadge tone="info">Transaction ID: KS-2026-00421</StatusBadge>}
      >
        {!acceptedOffer ? (
          <GovAlert tone="warning" title="No accepted offer yet">
            Accept a buyer offer from the Farmer Dashboard to activate a live transaction. The
            details below show the demonstration transaction.
          </GovAlert>
        ) : null}
        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
          {[
            ["Farmer", "Ramesh Kumar (KPS-2026-00147)"],
            ["Buyer", acceptedOffer?.buyerName ?? "Punjab Grain Retail"],
            ["Crop", crop.crop],
            ["Quantity", `${qty.toLocaleString("en-IN")} kg`],
            ["Agreed Price", `${inr(price, 2)}/kg`],
            ["Transport", inr(transport)],
            ["Gross Value", inr(qty * price)],
            ["Net Farmer Value", inr(qty * price - transport)],
            ["Expected Pickup", acceptedOffer?.pickupDate ?? "07 Sep 2026"],
          ].map(([k, v]) => (
            <div key={k} className="border border-border p-2">
              <dt className="text-xs font-semibold text-muted-foreground uppercase">{k}</dt>
              <dd className="font-bold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-bold">Status</h3>
          <TransactionTimeline activeIndex={transactionStageIndex} />
          <div className="mt-3">
            <GovButton onClick={advanceTransaction}>Update Status</GovButton>
          </div>
        </div>
      </Panel>

      <Panel title="Transaction History" bodyClassName="p-0 sm:p-0">
        <div role="tablist" aria-label="Transaction history" className="flex border-b border-border">
          {(["procurement", "market"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={
                tab === t
                  ? "border-b-2 border-saffron bg-surface px-4 py-2 text-sm font-bold text-primary-dark"
                  : "px-4 py-2 text-sm font-semibold text-muted-foreground"
              }
            >
              {t === "procurement" ? "Procurement" : "Direct Market"}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                {["Date", "Crop", "Quantity", "Centre / Buyer", "Channel", "Price", "Status"].map(
                  (h) => (
                    <th key={h} scope="col" className="px-2.5 py-2 text-left text-xs uppercase">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.date + r.crop} className={i % 2 ? "bg-muted/60" : "bg-surface"}>
                  <td className="border-t border-border px-2.5 py-2">{r.date}</td>
                  <td className="border-t border-border px-2.5 py-2">{r.crop}</td>
                  <td className="border-t border-border px-2.5 py-2 tabular-nums">{r.quantity}</td>
                  <td className="border-t border-border px-2.5 py-2">{r.counterparty}</td>
                  <td className="border-t border-border px-2.5 py-2">{r.channel}</td>
                  <td className="border-t border-border px-2.5 py-2 tabular-nums">{r.price}</td>
                  <td className="border-t border-border px-2.5 py-2">
                    <StatusBadge tone="success">{r.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Farmer Outcome">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-border p-3">
            <h3 className="text-sm font-bold">Procurement Route</h3>
            <ul className="mt-1 list-disc pl-5 text-sm">
              <li>Waiting time visibility before travelling</li>
              <li>Token tracking and expected turn</li>
              <li>Reduced unnecessary waiting at the centre</li>
            </ul>
          </div>
          <div className="border border-border p-3">
            <h3 className="text-sm font-bold">Direct Market Route</h3>
            <ul className="mt-1 list-disc pl-5 text-sm">
              <li>Price transparency against a reference price</li>
              <li>Buyer discovery within a known distance</li>
              <li>Potentially fewer intermediary layers</li>
              <li>Logistics matching with cost estimation</li>
            </ul>
          </div>
        </div>
      </Panel>
    </PageShell>
  );
}
