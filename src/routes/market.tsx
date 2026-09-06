import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/gov/PageShell";
import {
  DataTable,
  GovAlert,
  GovButton,
  GovLinkButton,
  Panel,
  StatBox,
  type Column,
} from "@/components/gov/primitives";
import { buyers, inr, type Buyer } from "@/lib/mock-data";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Direct Market — Sell Directly to Buyers | Kisan Suvidha" },
      {
        name: "description",
        content:
          "Compare registered buyer offers, transport cost and net farmer price per kilogram before selling your crop directly.",
      },
      { property: "og:title", content: "Direct Market — Kisan Suvidha" },
      {
        property: "og:description",
        content: "Buyer offers with distance, transport estimate and net farmer price.",
      },
    ],
  }),
  component: DirectMarket,
});

function DirectMarket() {
  const { crop, selectBuyer, selectedBuyer, submitOffer } = useAppState();
  const navigate = useNavigate();

  const columns: Column<Buyer>[] = [
    { key: "buyer", header: "Buyer", render: (b) => <span className="font-semibold">{b.name}</span> },
    { key: "location", header: "Location", render: (b) => b.location },
    {
      key: "qty",
      header: "Required Quantity",
      align: "right",
      render: (b) => `${b.requiredQuantityKg.toLocaleString("en-IN")} kg`,
    },
    {
      key: "price",
      header: "Offer Price",
      align: "right",
      render: (b) => `${inr(b.offerPrice, 2)}/kg`,
    },
    { key: "dist", header: "Distance", align: "right", render: (b) => `${b.distanceKm} km` },
    {
      key: "transport",
      header: "Estimated Transport",
      align: "right",
      render: (b) => `${inr(b.transportPerKg, 2)}/kg`,
    },
    {
      key: "net",
      header: "Net Farmer Price",
      align: "right",
      render: (b) => (
        <span className="font-bold text-success">{inr(b.offerPrice - b.transportPerKg, 2)}/kg</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      align: "center",
      render: (b) => (
        <GovButton
          size="sm"
          variant={selectedBuyer?.id === b.id ? "success" : "primary"}
          onClick={() => {
            selectBuyer(b.id);
            submitOffer({
              buyerId: b.id,
              buyerName: b.name,
              price: b.offerPrice,
              quantityKg: Math.min(b.requiredQuantityKg, crop.quantity),
              transportPerKg: b.transportPerKg,
              pickupDate: "07 Sep 2026",
            });
            navigate({ to: "/logistics" });
          }}
        >
          View Offer
        </GovButton>
      ),
    },
  ];

  const best = [...buyers].sort(
    (a, b) => b.offerPrice - b.transportPerKg - (a.offerPrice - a.transportPerKg),
  )[0]!;

  return (
    <PageShell
      title="Sell Directly to Buyers"
      subtitle="Registered buyer offers for your crop, with transport-adjusted net price."
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Farmer Services", to: "/farmer" },
        { label: "Direct Market" },
      ]}
      actions={<GovLinkButton to="/prices" variant="secondary">Compare Prices</GovLinkButton>}
    >
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <StatBox label="Your Crop" value={crop.crop} />
        <StatBox
          label="Available Quantity"
          value={`${crop.quantity.toLocaleString("en-IN")} kg`}
        />
        <StatBox label="Location" value={crop.district} />
        <StatBox label="Reference Market Price" value="₹24.00/kg" tone="success" />
      </div>

      <Panel title="Buyer Offers" bodyClassName="p-0 sm:p-0">
        <DataTable
          caption="Registered buyer offers with net farmer price"
          columns={columns}
          rows={buyers}
          rowKey={(b) => b.id}
          highlightRow={(b) => selectedBuyer?.id === b.id}
        />
      </Panel>

      <GovAlert tone="success" title="Net farmer price calculation">
        Net Farmer Price = Buyer Offer Price − Estimated Transportation Cost. On current offers, the
        highest net price is {inr(best.offerPrice - best.transportPerKg, 2)}/kg from {best.name}.
      </GovAlert>

      <p className="text-xs text-muted-foreground">
        Transport estimates are illustrative and depend on vehicle type, load and route conditions.
        Selecting an offer opens the logistics page where transport can be assigned.
      </p>
    </PageShell>
  );
}
