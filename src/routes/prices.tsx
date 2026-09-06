import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/gov/PageShell";
import { FormField, GovAlert, Panel, StatBox, fieldClass } from "@/components/gov/primitives";
import { SupplyChainComparison } from "@/components/gov/features";
import { buyers, inr, referencePrices } from "@/lib/mock-data";

export const Route = createFileRoute("/prices")({
  head: () => ({
    meta: [
      { title: "Price Information & Impact Calculator — Kisan Suvidha" },
      {
        name: "description",
        content:
          "Reference crop prices, current buyer offer range, supply chain comparison and an illustrative calculator comparing selling options.",
      },
      { property: "og:title", content: "Price Information — Kisan Suvidha" },
      {
        property: "og:description",
        content: "Compare traditional chain returns with direct market offers for your quantity.",
      },
    ],
  }),
  component: Prices,
});

function Prices() {
  const [qty, setQty] = useState(5000);
  const [traditional, setTraditional] = useState(20);
  const [direct, setDirect] = useState(27);
  const [transport, setTransport] = useState(1);

  const tradRevenue = qty * traditional;
  const netPrice = direct - transport;
  const directRevenue = qty * netPrice;
  const difference = directRevenue - tradRevenue;

  return (
    <PageShell
      title="Price Information"
      subtitle="Reference prices, buyer offer ranges and an illustrative comparison of selling options."
      crumbs={[{ label: "Home", to: "/" }, { label: "Price Information" }]}
    >
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <StatBox label="Crop" value="Wheat" />
        <StatBox label="Reference Price" value="₹24.00/kg" />
        <StatBox label="Current Buyer Offers" value="₹25.50 – ₹27.00/kg" />
        <StatBox label="Highest Offer" value="₹27.00/kg" tone="success" />
      </div>

      <Panel title="Crop Price Table (Illustrative)">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th scope="col" className="px-2 py-1.5 text-left text-xs uppercase">
                Crop
              </th>
              <th scope="col" className="px-2 py-1.5 text-right text-xs uppercase">
                Reference Price
              </th>
              <th scope="col" className="px-2 py-1.5 text-right text-xs uppercase">
                Lowest Buyer Offer
              </th>
              <th scope="col" className="px-2 py-1.5 text-right text-xs uppercase">
                Highest Buyer Offer
              </th>
            </tr>
          </thead>
          <tbody>
            {referencePrices.map((p, i) => (
              <tr key={p.crop} className={i % 2 ? "bg-muted/60" : ""}>
                <td className="border-t border-border px-2 py-1.5">{p.crop}</td>
                <td className="border-t border-border px-2 py-1.5 text-right tabular-nums">
                  {inr(p.reference, 2)}
                </td>
                <td className="border-t border-border px-2 py-1.5 text-right tabular-nums">
                  {inr(p.low, 2)}
                </td>
                <td className="border-t border-border px-2 py-1.5 text-right tabular-nums">
                  {inr(p.high, 2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Panel title="Current Wheat Buyer Offers">
        <ul className="grid gap-2 sm:grid-cols-3">
          {buyers.map((b) => (
            <li key={b.id} className="border border-border p-3 text-sm">
              <p className="font-bold">{b.name}</p>
              <p className="text-muted-foreground">{b.location}</p>
              <p className="mt-1 text-lg font-bold tabular-nums">{inr(b.offerPrice, 2)}/kg</p>
              <p className="text-xs">
                Net after transport: {inr(b.offerPrice - b.transportPerKg, 2)}/kg
              </p>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Supply Chain Comparison">
        <SupplyChainComparison />
      </Panel>

      <Panel title="Compare Selling Options — Impact Calculator">
        <GovAlert tone="warning" title="Illustrative calculation">
          The figures below are demonstration values entered by the user. They are not real market
          statistics.
        </GovAlert>
        <div className="mt-3 grid gap-3 sm:grid-cols-4">
          <FormField label="Quantity (kg)" htmlFor="qty">
            <input
              id="qty"
              inputMode="numeric"
              className={fieldClass}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value) || 0)}
            />
          </FormField>
          <FormField label="Traditional selling price (₹/kg)" htmlFor="trad">
            <input
              id="trad"
              inputMode="decimal"
              className={fieldClass}
              value={traditional}
              onChange={(e) => setTraditional(Number(e.target.value) || 0)}
            />
          </FormField>
          <FormField label="Direct buyer offer (₹/kg)" htmlFor="direct">
            <input
              id="direct"
              inputMode="decimal"
              className={fieldClass}
              value={direct}
              onChange={(e) => setDirect(Number(e.target.value) || 0)}
            />
          </FormField>
          <FormField label="Estimated transport (₹/kg)" htmlFor="transport">
            <input
              id="transport"
              inputMode="decimal"
              className={fieldClass}
              value={transport}
              onChange={(e) => setTransport(Number(e.target.value) || 0)}
            />
          </FormField>
        </div>

        <table className="mt-4 w-full border-collapse text-sm">
          <caption className="sr-only">Comparison of traditional route and direct market route</caption>
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th scope="col" className="px-2 py-1.5 text-left text-xs uppercase">
                Particulars
              </th>
              <th scope="col" className="px-2 py-1.5 text-right text-xs uppercase">
                Traditional Route
              </th>
              <th scope="col" className="px-2 py-1.5 text-right text-xs uppercase">
                Direct Market Route
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Quantity", `${qty.toLocaleString("en-IN")} kg`, `${qty.toLocaleString("en-IN")} kg`],
              ["Price received by farmer", `${inr(traditional, 2)}/kg`, `${inr(direct, 2)}/kg`],
              ["Estimated transport borne by farmer", "—", `${inr(transport, 2)}/kg`],
              ["Net farmer price", `${inr(traditional, 2)}/kg`, `${inr(netPrice, 2)}/kg`],
              ["Net farmer revenue", inr(tradRevenue), inr(directRevenue)],
            ].map((r) => (
              <tr key={r[0]}>
                <th scope="row" className="border-t border-border px-2 py-1.5 text-left font-semibold">
                  {r[0]}
                </th>
                <td className="border-t border-border px-2 py-1.5 text-right tabular-nums">{r[1]}</td>
                <td className="border-t border-border px-2 py-1.5 text-right tabular-nums">{r[2]}</td>
              </tr>
            ))}
            <tr className="bg-success-soft">
              <th scope="row" className="border-t border-border px-2 py-1.5 text-left font-bold">
                Potential difference
              </th>
              <td className="border-t border-border px-2 py-1.5" />
              <td className="border-t border-border px-2 py-1.5 text-right font-bold tabular-nums text-success">
                {inr(difference)}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="mt-4 w-full border-collapse text-sm">
          <tbody>
            <tr>
              <th scope="row" className="border border-border px-2 py-1.5 text-left">
                Consumer price under traditional chain (illustrative)
              </th>
              <td className="border border-border px-2 py-1.5 text-right tabular-nums">₹40.00/kg</td>
            </tr>
            <tr>
              <th scope="row" className="border border-border px-2 py-1.5 text-left">
                Potential direct-market consumer price (illustrative)
              </th>
              <td className="border border-border px-2 py-1.5 text-right tabular-nums">₹32.00/kg</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </PageShell>
  );
}
