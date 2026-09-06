import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/gov/PageShell";
import {
  GovButton,
  Panel,
  StatBox,
  StatusBadge,
} from "@/components/gov/primitives";
import { QueueDemoControls } from "@/components/gov/features";
import { formatMinutes, queueFarmers, MIN_PER_FARMER } from "@/lib/mock-data";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/officer")({
  head: () => ({
    meta: [
      { title: "Procurement Centre Management — Kisan Suvidha" },
      {
        name: "description",
        content:
          "Officer view for live queue management, counter status, centre capacity and nearby buyer demand overview.",
      },
      { property: "og:title", content: "Officer Dashboard — Kisan Suvidha" },
      {
        property: "og:description",
        content: "Call next farmer, mark completed and monitor centre capacity.",
      },
    ],
  }),
  component: Officer,
});

function Bar({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs">
        <span>{label}</span>
        <span className="font-semibold tabular-nums">{value}</span>
      </div>
      <div className="h-3 w-full border border-border bg-muted">
        <div
          className="h-full bg-primary"
          style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
        />
      </div>
    </div>
  );
}

function Officer() {
  const { currentToken, farmersAhead, paused, centre, processNext, togglePause, activeCounters } =
    useAppState();

  const processed = currentToken - 1 - 0;
  const capacity = 200;
  const waiting = farmersAhead;
  const pending = Math.max(0, capacity - processed - waiting);

  return (
    <PageShell
      title="Procurement Centre Management"
      subtitle={`Officer: S. Sharma · Centre: ${centre.name}, ${centre.district}`}
      crumbs={[{ label: "Home", to: "/" }, { label: "Officer Dashboard" }]}
      actions={
        <StatusBadge tone={paused ? "warning" : "success"}>
          {paused ? "Counter Paused" : "Centre Accepting"}
        </StatusBadge>
      }
    >
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        <StatBox label="Today's Capacity" value={capacity} />
        <StatBox label="Processed" value={processed} tone="success" />
        <StatBox label="Waiting" value={waiting} />
        <StatBox label="Pending" value={pending} />
        <StatBox label="Active Counters" value={activeCounters} />
      </div>

      <Panel title="Live Queue Management" bodyClassName="p-0 sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[38rem] border-collapse text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                {["Token", "Farmer", "Crop", "Quantity", "Status", "Action"].map((h) => (
                  <th key={h} scope="col" className="px-2.5 py-2 text-left text-xs uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {queueFarmers.map((f, i) => {
                const offset = currentToken - 121;
                const token = f.token + offset;
                const isCurrent = i === 0;
                return (
                  <tr key={f.name} className={i % 2 ? "bg-muted/60" : "bg-surface"}>
                    <td className="border-t border-border px-2.5 py-2 font-bold tabular-nums">
                      {token}
                    </td>
                    <td className="border-t border-border px-2.5 py-2">{f.name}</td>
                    <td className="border-t border-border px-2.5 py-2">{f.crop}</td>
                    <td className="border-t border-border px-2.5 py-2 tabular-nums">
                      {f.quantityKg.toLocaleString("en-IN")} kg
                    </td>
                    <td className="border-t border-border px-2.5 py-2">
                      <StatusBadge tone={isCurrent ? "info" : "neutral"}>
                        {isCurrent ? "Processing" : "Waiting"}
                      </StatusBadge>
                    </td>
                    <td className="border-t border-border px-2.5 py-2">
                      <GovButton
                        size="sm"
                        variant={isCurrent ? "success" : "secondary"}
                        onClick={processNext}
                        disabled={paused}
                      >
                        {isCurrent ? "Complete" : "Call"}
                      </GovButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Counter Controls">
        <div className="flex flex-wrap gap-2">
          <GovButton onClick={processNext} disabled={paused}>
            Call Next Farmer
          </GovButton>
          <GovButton variant="success" onClick={processNext} disabled={paused}>
            Mark Completed
          </GovButton>
          <GovButton variant="warning" onClick={togglePause}>
            {paused ? "Resume Counter" : "Pause Counter"}
          </GovButton>
        </div>
        <div className="mt-3 border-t border-border pt-3">
          <QueueDemoControls />
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Centre & Market Overview">
          <Bar label="Procurement demand today (quintal)" value={1840} max={2500} />
          <Bar label="Available crop quantity registered (quintal)" value={2210} max={2500} />
          <Bar label="Farmers waiting" value={waiting} max={60} />
          <Bar label="Nearby buyer demand (quintal)" value={1000} max={2500} />
          <p className="mt-2 text-xs text-muted-foreground">
            Average processing time: {MIN_PER_FARMER.toFixed(0)} minutes per farmer · Estimated queue
            clearance: {formatMinutes(waiting * MIN_PER_FARMER)}
          </p>
        </Panel>
        <Panel title="Counter Status">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase">
                <th scope="col" className="py-1.5">
                  Counter
                </th>
                <th scope="col">Operator</th>
                <th scope="col" className="text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Counter 1", "S. Sharma"],
                ["Counter 2", "R. Bansal"],
                ["Counter 3", "P. Kaur"],
              ].map(([c, o], i) => (
                <tr key={c} className="border-b border-border last:border-b-0">
                  <td className="py-1.5">{c}</td>
                  <td>{o}</td>
                  <td className="text-right">
                    <StatusBadge tone={paused && i === 0 ? "warning" : "success"}>
                      {paused && i === 0 ? "Paused" : "Active"}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </PageShell>
  );
}
