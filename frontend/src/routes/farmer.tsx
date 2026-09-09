import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/gov/PageShell";
import {
  GovAlert,
  GovButton,
  GovLinkButton,
  Panel,
  StatBox,
  StatusBadge,
} from "@/components/gov/primitives";
import { NotificationPanel } from "@/components/gov/features";
import { buyers, formatMinutes, inr } from "@/lib/mock-data";
import { useAppState } from "@/state/app-state";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/farmer")({
  head: () => ({
    meta: [
      { title: "Farmer Dashboard — Kisan Suvidha" },
      {
        name: "description",
        content:
          "Unified farmer dashboard showing live procurement queue status and current direct market buyer offers for the same crop.",
      },
      { property: "og:title", content: "Farmer Dashboard — Kisan Suvidha" },
      {
        property: "og:description",
        content: "Track your procurement token and compare direct buyer offers in one place.",
      },
    ],
  }),
  component: FarmerDashboard,
});

function FarmerDashboard() {
  const {
    crop,
    farmerToken,
    currentToken,
    farmersAhead,
    waitMinutes,
    expectedTurn,
    centre,
    paused,
    offers,
    respondToOffer,
    language,
  } = useAppState();

  const pending = offers.filter((o) => o.status === "Offer Sent" || o.status === "Counter Sent");
  const farmerId = `KPS-2026-${String(farmerToken).padStart(5, "0")}`;
  const tr = useT(language);

  return (
    <PageShell
      title={tr("farmer_title")}
      subtitle={tr("farmer_subtitle")}
      crumbs={[{ label: tr("nav_home"), to: "/" }, { label: tr("farmer_title") }]}
      actions={<GovLinkButton to="/register-crop">{tr("home_btn_register")}</GovLinkButton>}
    >
      <Panel title={tr("farmer_profile")}>
        <dl className="grid gap-2 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase">{tr("farmer_label")}</dt>
            <dd className="font-bold">{crop.farmerName}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase">{tr("farmer_id")}</dt>
            <dd className="font-bold tabular-nums">{farmerId}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase">{tr("farmer_crop_label")}</dt>
            <dd className="font-bold">
              {crop.crop} · {crop.quantity.toLocaleString("en-IN")} {crop.unit} · Grade {crop.grade}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase">{tr("farmer_location")}</dt>
            <dd className="font-bold">
              {crop.village}, {crop.district}, {crop.state}
            </dd>
          </div>
        </dl>
      </Panel>

      {pending.length > 0 ? (
        <Panel title="New Buyer Offers — Action Required">
          <ul className="space-y-2">
            {pending.map((o) => {
              const net = o.price - o.transportPerKg;
              return (
                <li key={o.id} className="border border-saffron bg-warning-soft p-3">
                  <p className="text-sm font-bold">{o.buyerName}</p>
                  <p className="text-sm">
                    {inr(o.price, 2)}/kg · {o.quantityKg.toLocaleString("en-IN")} kg · Estimated
                    transport: {inr(o.transportPerKg, 2)}/kg · Net: {inr(net, 2)}/kg
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <GovButton
                      size="sm"
                      variant="success"
                      onClick={() => respondToOffer(o.id, "Accepted")}
                    >
                      Accept
                    </GovButton>
                    <GovButton
                      size="sm"
                      variant="secondary"
                      onClick={() => respondToOffer(o.id, "Rejected")}
                    >
                      Reject
                    </GovButton>
                    <GovButton
                      size="sm"
                      variant="warning"
                      onClick={() => respondToOffer(o.id, "Counter Sent")}
                    >
                      Counter Offer
                    </GovButton>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel
          title="Section A — Current Procurement Status"
          aside={
            <StatusBadge tone={paused ? "warning" : "success"}>
              {paused ? "Queue Paused" : "Accepting Procurement"}
            </StatusBadge>
          }
        >
          <dl className="mb-3 grid gap-1 text-sm">
            <div className="flex justify-between border-b border-border py-1">
              <dt className="font-semibold">Procurement Centre</dt>
              <dd>
                {centre.name}, {centre.district}
              </dd>
            </div>
            <div className="flex justify-between border-b border-border py-1">
              <dt className="font-semibold">Crop</dt>
              <dd>{crop.crop}</dd>
            </div>
            <div className="flex justify-between border-b border-border py-1">
              <dt className="font-semibold">Expected Procurement</dt>
              <dd>Today, {expectedTurn}</dd>
            </div>
          </dl>
          <div className="grid grid-cols-2 gap-2">
            <StatBox label="Your Token" value={farmerToken} tone="saffron" />
            <StatBox label="Currently Serving" value={currentToken} />
            <StatBox label="Farmers Ahead" value={farmersAhead} />
            <StatBox
              label="Estimated Waiting Time"
              value={formatMinutes(waitMinutes)}
              tone="success"
            />
          </div>
          <div className="mt-3">
            <GovLinkButton to="/queue">View Live Queue</GovLinkButton>
          </div>
        </Panel>

        <Panel title="Section B — Current Market Opportunities">
          <dl className="mb-3 grid gap-1 text-sm">
            <div className="flex justify-between border-b border-border py-1">
              <dt className="font-semibold">Crop</dt>
              <dd>{crop.crop}</dd>
            </div>
            <div className="flex justify-between border-b border-border py-1">
              <dt className="font-semibold">Your Quantity</dt>
              <dd>
                {crop.quantity.toLocaleString("en-IN")} {crop.unit}
              </dd>
            </div>
            <div className="flex justify-between border-b border-border py-1">
              <dt className="font-semibold">Reference Market Price</dt>
              <dd>₹24/kg</dd>
            </div>
          </dl>
          <h3 className="mb-1 text-sm font-bold">Available Buyer Offers</h3>
          <ul className="divide-y divide-border border border-border">
            {buyers.map((b, i) => (
              <li key={b.id} className="flex items-center justify-between gap-2 p-2 text-sm">
                <span>
                  <span className="font-bold">Buyer {String.fromCharCode(65 + i)}</span> — {b.name}
                  <span className="block text-xs text-muted-foreground">
                    Distance: {b.distanceKm} km · Demand: {b.requiredQuantityKg.toLocaleString("en-IN")} kg
                  </span>
                </span>
                <span className="text-base font-bold tabular-nums text-success">
                  {inr(b.offerPrice, 2)}/kg
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            <GovLinkButton to="/prices" variant="secondary">
              Compare Offers
            </GovLinkButton>
            <GovLinkButton to="/market">View Buyers</GovLinkButton>
          </div>
        </Panel>
      </div>

      <GovAlert tone="info" title="Two paths for the same crop">
        Your registered {crop.crop.toLowerCase()} can either be sold at a government procurement
        centre (token {farmerToken}, estimated wait {formatMinutes(waitMinutes)}) or directly to a
        registered buyer. Compare both before travelling.
      </GovAlert>

      <Panel title="Recent Notifications" bodyClassName="p-0">
        <NotificationPanel limit={4} />
      </Panel>
    </PageShell>
  );
}
