import { createFileRoute, Link } from "@tanstack/react-router";
import { GovAlert, GovLinkButton, Panel, StatusBadge } from "@/components/gov/primitives";
import { procurementCentres, referencePrices, inr } from "@/lib/mock-data";

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
  return (
    <div className="mx-auto max-w-[78rem] px-3 py-5">
      <section className="border border-border bg-surface p-4">
        <h1 className="text-2xl font-bold">Kisan Suvidha</h1>
        <p className="mt-1 text-base font-semibold text-primary">
          Know where to sell, when to arrive and what price you can get.
        </p>
        <p className="mt-2 max-w-4xl text-sm text-foreground/90">
          Access procurement-centre queue information and connect directly with buyers to reduce
          waiting time, improve price transparency and reduce unnecessary intermediaries.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <GovLinkButton to="/register-crop">Register Crop</GovLinkButton>
          <GovLinkButton to="/farmer" variant="secondary">
            Farmer Dashboard
          </GovLinkButton>
          <GovLinkButton to="/procurement" variant="secondary">
            Find Procurement Centre
          </GovLinkButton>
        </div>
      </section>

      <h2 className="mt-6 mb-2 border-b-2 border-primary pb-1 text-lg font-bold">
        Primary Services
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
        <Panel title="Procurement Centres — Current Status">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase">
                <th scope="col" className="py-1.5">
                  Centre
                </th>
                <th scope="col">District</th>
                <th scope="col" className="text-right">
                  Waiting
                </th>
                <th scope="col" className="text-right">
                  Status
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
              View all procurement centres
            </Link>
          </p>
        </Panel>

        <Panel title="Reference Prices (Illustrative)">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase">
                <th scope="col" className="py-1.5">
                  Crop
                </th>
                <th scope="col" className="text-right">
                  Reference
                </th>
                <th scope="col" className="text-right">
                  Buyer Offer Range
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
              View price information and supply chain comparison
            </Link>
          </p>
        </Panel>
      </div>

      <div className="mt-4">
        <GovAlert tone="info" title="Prototype Notice">
          Kisan Suvidha is a Smart India Hackathon 2026 prototype. All figures, centres, buyers and
          notifications shown are illustrative mock data. This is not an official Government of India
          website.
        </GovAlert>
      </div>
    </div>
  );
}
