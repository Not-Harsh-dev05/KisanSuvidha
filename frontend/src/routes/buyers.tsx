import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/gov/PageShell";
import {
  DataTable,
  FormField,
  GovAlert,
  GovButton,
  Panel,
  StatBox,
  StatusBadge,
  fieldClass,
  type Column,
} from "@/components/gov/primitives";
import { buyerSearchResults, crops, districts, inr } from "@/lib/mock-data";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/buyers")({
  head: () => ({
    meta: [
      { title: "Buyer Portal — Search Crops & Make Offers | Kisan Suvidha" },
      {
        name: "description",
        content:
          "Registered buyers can search nearby farmers by crop, location and quantity, and send price offers directly.",
      },
      { property: "og:title", content: "Buyer Portal — Kisan Suvidha" },
      {
        property: "og:description",
        content: "Search available crop lots and submit offers to farmers.",
      },
    ],
  }),
  component: BuyerPortal,
});

type Row = (typeof buyerSearchResults)[number];

function BuyerPortal() {
  const { submitOffer, offers } = useAppState();
  const [crop, setCrop] = useState("Wheat");
  const [location, setLocation] = useState("All");
  const [minQty, setMinQty] = useState("1000");
  const [availableFrom, setAvailableFrom] = useState("");
  const [selected, setSelected] = useState<Row | null>(null);
  const [offerPrice, setOfferPrice] = useState("27");
  const [offerQty, setOfferQty] = useState("2000");
  const [pickup, setPickup] = useState("2026-09-07");
  const [sent, setSent] = useState(false);

  const rows = useMemo(
    () =>
      buyerSearchResults.filter(
        (r) =>
          (crop === "All" || r.crop === crop) &&
          (location === "All" || r.location === location) &&
          r.quantityKg >= (Number(minQty) || 0),
      ),
    [crop, location, minQty],
  );

  const columns: Column<Row>[] = [
    { key: "farmer", header: "Farmer", render: (r) => <span className="font-semibold">{r.farmer}</span> },
    { key: "crop", header: "Crop", render: (r) => r.crop },
    {
      key: "qty",
      header: "Quantity",
      align: "right",
      render: (r) => `${r.quantityKg.toLocaleString("en-IN")} kg`,
    },
    { key: "loc", header: "Location", render: (r) => r.location },
    {
      key: "price",
      header: "Expected Price",
      align: "right",
      render: (r) => `${inr(r.expectedPrice, 2)}/kg`,
    },
    { key: "avail", header: "Availability", render: (r) => r.availability },
    {
      key: "action",
      header: "Action",
      align: "center",
      render: (r) => (
        <GovButton
          size="sm"
          onClick={() => {
            setSelected(r);
            setSent(false);
            setOfferQty(String(Math.min(2000, r.quantityKg)));
          }}
        >
          Make Offer
        </GovButton>
      ),
    },
  ];

  return (
    <PageShell
      title="Buyer Portal"
      subtitle="Buyer: Punjab Grain Retail · Buyer ID: KSB-2026-0031 · Ludhiana"
      crumbs={[{ label: "Home", to: "/" }, { label: "Buyer Portal" }]}
    >
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        <StatBox label="Search Crops" value={rows.length} hint="Matching lots" />
        <StatBox label="Nearby Farmers" value={buyerSearchResults.length} hint="Within 50 km" />
        <StatBox label="Active Offers" value={offers.filter((o) => o.status === "Offer Sent").length} />
        <StatBox label="Orders" value={offers.filter((o) => o.status === "Accepted").length} />
        <StatBox label="Transactions" value={offers.filter((o) => o.status === "Accepted").length} />
      </div>

      <Panel title="Search Available Crops">
        <div className="grid gap-3 sm:grid-cols-4">
          <FormField label="Crop" htmlFor="b-crop">
            <select
              id="b-crop"
              className={fieldClass}
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
            >
              <option>All</option>
              {crops.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Location" htmlFor="b-loc">
            <select
              id="b-loc"
              className={fieldClass}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>All</option>
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Minimum Quantity (kg)" htmlFor="b-qty">
            <input
              id="b-qty"
              inputMode="numeric"
              className={fieldClass}
              value={minQty}
              onChange={(e) => setMinQty(e.target.value)}
            />
          </FormField>
          <FormField label="Available From" htmlFor="b-date">
            <input
              id="b-date"
              type="date"
              className={fieldClass}
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </FormField>
        </div>
      </Panel>

      <Panel title="Search Results" bodyClassName="p-0 sm:p-0">
        <DataTable
          caption="Farmers with available crop lots"
          columns={columns}
          rows={rows}
          rowKey={(r) => r.farmer + r.crop}
          highlightRow={(r) => selected?.farmer === r.farmer && selected?.crop === r.crop}
        />
      </Panel>

      {selected ? (
        <Panel title={`Make Offer — ${selected.farmer}`}>
          <dl className="mb-3 grid gap-2 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold text-muted-foreground uppercase">Crop</dt>
              <dd className="font-bold">{selected.crop}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted-foreground uppercase">Available</dt>
              <dd className="font-bold">{selected.quantityKg.toLocaleString("en-IN")} kg</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted-foreground uppercase">
                Farmer Expected Price
              </dt>
              <dd className="font-bold">{inr(selected.expectedPrice, 2)}/kg</dd>
            </div>
          </dl>
          <div className="grid gap-3 sm:grid-cols-4">
            <FormField label="Buyer Offer (₹/kg)" htmlFor="o-price">
              <input
                id="o-price"
                inputMode="decimal"
                className={fieldClass}
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
              />
            </FormField>
            <FormField label="Required Quantity (kg)" htmlFor="o-qty">
              <input
                id="o-qty"
                inputMode="numeric"
                className={fieldClass}
                value={offerQty}
                onChange={(e) => setOfferQty(e.target.value)}
              />
            </FormField>
            <FormField label="Expected Pickup Date" htmlFor="o-pickup">
              <input
                id="o-pickup"
                type="date"
                className={fieldClass}
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            </FormField>
            <FormField label="Estimated Logistics (₹/kg)" htmlFor="o-log">
              <input id="o-log" className={fieldClass} value="1.00" readOnly />
            </FormField>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <GovButton
              onClick={() => {
                submitOffer({
                  buyerId: "punjab-grain",
                  buyerName: "Punjab Grain Retail",
                  price: Number(offerPrice) || 0,
                  quantityKg: Number(offerQty) || 0,
                  transportPerKg: 1,
                  pickupDate: pickup,
                });
                setSent(true);
              }}
            >
              Submit Offer
            </GovButton>
            {sent ? <StatusBadge tone="success">Offer Sent</StatusBadge> : null}
          </div>
          {sent ? (
            <GovAlert tone="success" title="Offer sent to farmer">
              The offer now appears on the Farmer Dashboard with Accept, Reject and Counter Offer
              actions.
            </GovAlert>
          ) : null}
        </Panel>
      ) : null}

      <Panel title="Offer History" bodyClassName="p-0">
        <ul className="divide-y divide-border">
          {offers.length === 0 ? (
            <li className="p-3 text-sm text-muted-foreground">No offers submitted yet.</li>
          ) : (
            offers.map((o) => (
              <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 p-3 text-sm">
                <span>
                  <span className="font-semibold">{o.buyerName}</span> · {inr(o.price, 2)}/kg ·{" "}
                  {o.quantityKg.toLocaleString("en-IN")} kg · Pickup {o.pickupDate}
                </span>
                <StatusBadge
                  tone={
                    o.status === "Accepted"
                      ? "success"
                      : o.status === "Rejected"
                        ? "danger"
                        : o.status === "Counter Sent"
                          ? "warning"
                          : "info"
                  }
                >
                  {o.status}
                </StatusBadge>
              </li>
            ))
          )}
        </ul>
      </Panel>
    </PageShell>
  );
}
