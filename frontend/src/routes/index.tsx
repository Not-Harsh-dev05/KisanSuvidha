import { createFileRoute, Link } from "@tanstack/react-router";
import { GovAlert, GovLinkButton, Panel, StatusBadge } from "@/components/gov/primitives";
import { procurementCentres, referencePrices, inr } from "@/lib/mock-data";
import { useAppState } from "@/state/app-state";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kisan Suvidha — Procurement Queue & Direct Market for Farmers" },
      {
        name: "description",
        content:
          "Check procurement centre queue status, estimated waiting time and compare direct buyer offers for your crop on one platform.",
      },
      { property: "og:title", content: "Kisan Suvidha — Home" },
      {
        property: "og:description",
        content:
          "Know where to sell, when to arrive and what price you can get. Procurement queue and direct market access for farmers.",
      },
    ],
  }),
  component: Home,
});

const services = [
  {
    to: "/queue" as const,
    title: "Procurement Queue",
    text: "Check centre status and estimated waiting time",
  },
  {
    to: "/market" as const,
    title: "Direct Market",
    text: "Find buyers and compare offers",
  },
  {
    to: "/prices" as const,
    title: "Price Information",
    text: "View reference and buyer prices",
  },
  {
    to: "/transactions" as const,
    title: "Transactions",
    text: "Track your completed and ongoing transactions",
  },
];

function Home() {
  const { language } = useAppState();
  const tr = useT(language);
  return (
    <div className="mx-auto max-w-[78rem] px-3 py-5">
      <section className="border border-border bg-surface p-4">
        <h1 className="text-2xl font-bold">{tr("home_title")}</h1>
        <p className="mt-1 text-base font-semibold text-primary">
          {tr("home_tagline")}
        </p>
        <p className="mt-2 max-w-4xl text-sm text-foreground/90">
          {tr("home_desc")}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <GovLinkButton to="/register-crop">{tr("home_btn_register")}</GovLinkButton>
          <GovLinkButton to="/farmer" variant="secondary">
            {tr("home_btn_dashboard")}
          </GovLinkButton>
          <GovLinkButton to="/procurement" variant="secondary">
            {tr("home_btn_procurement")}
          </GovLinkButton>
        </div>
      </section>

      <h2 className="mt-6 mb-2 border-b-2 border-primary pb-1 text-lg font-bold">
        {tr("home_primary_services")}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <li key={s.to} className="border border-border bg-surface">
            <div className="border-l-4 border-saffron p-3">
              <p className="text-xs font-semibold text-muted-foreground">
                Service {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-base font-bold">
                <Link to={s.to} className="gov-link">
                  {s.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title={tr("home_procurement_status")}>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase">
                <th scope="col" className="py-1.5">
                  {tr("common_centre")}
                </th>
                <th scope="col">{tr("common_district")}</th>
                <th scope="col" className="text-right">
                  {tr("common_waiting")}
                </th>
                <th scope="col" className="text-right">
                  {tr("common_status")}
                </th>
              </tr>
            </thead>
            <tbody>
              {procurementCentres.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-b-0">
                  <td className="py-1.5">{c.name}</td>
                  <td>{c.district}</td>
                  <td className="text-right tabular-nums">{c.waitingFarmers}</td>
                  <td className="text-right">
                    <StatusBadge tone={c.status === "Accepting" ? "success" : "warning"}>
                      {c.status}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2">
            <Link to="/procurement" className="gov-link text-sm">
              {tr("common_view_all_centres")}
            </Link>
          </p>
        </Panel>

        <Panel title={tr("home_reference_prices")}>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase">
                <th scope="col" className="py-1.5">
                  {tr("common_crop")}
                </th>
                <th scope="col" className="text-right">
                  {tr("common_reference")}
                </th>
                <th scope="col" className="text-right">
                  {tr("common_buyer_range")}
                </th>
              </tr>
            </thead>
            <tbody>
              {referencePrices.map((p) => (
                <tr key={p.crop} className="border-b border-border last:border-b-0">
                  <td className="py-1.5">{p.crop}</td>
                  <td className="text-right tabular-nums">{inr(p.reference, 2)}/kg</td>
                  <td className="text-right tabular-nums">
                    {inr(p.low, 2)} – {inr(p.high, 2)}/kg
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2">
            <Link to="/prices" className="gov-link text-sm">
              {tr("common_view_prices")}
            </Link>
          </p>
        </Panel>
      </div>

      <div className="mt-4">
        <GovAlert tone="info" title={tr("common_prototype_notice")}>
          {tr("home_prototype_notice")}
        </GovAlert>
      </div>
    </div>
  );
}
