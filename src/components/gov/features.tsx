import { useAppState, transactionStages } from "@/state/app-state";
import { GovAlert, GovButton, Panel, StatBox, StatusBadge } from "./primitives";
import { MIN_PER_FARMER, formatMinutes, inr, transportOptions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/* ------------------------------ QueueTracker ------------------------------ */

export function QueueTracker({ compact = false }: { compact?: boolean }) {
  const { farmerToken, currentToken, farmersAhead, waitMinutes, expectedTurn, centre, paused } =
    useAppState();

  const tokens: number[] = [];
  for (let t = currentToken; t <= farmerToken; t++) tokens.push(t);
  const visible =
    tokens.length > 14
      ? [...tokens.slice(0, 6), -1, ...tokens.slice(-6)]
      : tokens.length > 0
        ? tokens
        : [farmerToken];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        <StatBox label="Your Token" value={farmerToken} tone="saffron" />
        <StatBox label="Current Token" value={currentToken} />
        <StatBox label="Farmers Ahead" value={farmersAhead} />
        <StatBox label="Estimated Wait" value={formatMinutes(waitMinutes)} tone="success" />
        <StatBox label="Expected Turn" value={expectedTurn} />
      </div>
      <p className="text-sm">
        <span className="font-semibold">Centre:</span> {centre.name}, {centre.district}{" "}
        <StatusBadge tone={paused ? "warning" : "success"}>
          {paused ? "Queue Paused" : "Accepting Procurement"}
        </StatusBadge>
      </p>

      {!compact ? (
        <div>
          <h3 className="mb-2 text-sm font-bold">Queue Position</h3>
          <ol className="flex flex-wrap gap-1.5">
            {visible.map((t, i) =>
              t === -1 ? (
                <li key={`gap-${i}`} className="px-2 py-2 text-sm text-muted-foreground">
                  …
                </li>
              ) : (
                <li
                  key={t}
                  className={cn(
                    "min-w-[3.4rem] border px-2 py-1 text-center text-sm",
                    t === currentToken && "border-success bg-success-soft font-bold text-success",
                    t === farmerToken &&
                      "border-saffron bg-warning-soft font-bold text-saffron-foreground",
                    t !== currentToken && t !== farmerToken && "border-border bg-surface",
                  )}
                >
                  <span className="block tabular-nums">{t}</span>
                  {t === currentToken ? (
                    <span className="block text-[0.6rem] leading-tight">Currently Serving</span>
                  ) : null}
                  {t === farmerToken ? (
                    <span className="block text-[0.6rem] leading-tight">Your Token</span>
                  ) : null}
                </li>
              ),
            )}
          </ol>
        </div>
      ) : null}
    </div>
  );
}

export function QueueDemoControls() {
  const { processNext, togglePause, resetDemo, paused } = useAppState();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <GovButton onClick={processNext} disabled={paused}>
        Process Next Farmer
      </GovButton>
      <GovButton variant={paused ? "success" : "warning"} onClick={togglePause}>
        {paused ? "Resume Queue" : "Pause Queue"}
      </GovButton>
      <GovButton variant="secondary" onClick={resetDemo}>
        Reset Demo
      </GovButton>
    </div>
  );
}

export function WaitingTimeEstimation() {
  const { farmersAhead, waitMinutes, activeCounters } = useAppState();
  return (
    <Panel title="Waiting Time Estimation">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {[
            ["Farmers ahead", String(farmersAhead)],
            ["Average processing time", `${MIN_PER_FARMER.toFixed(0)} min per farmer`],
            ["Active counters", String(activeCounters)],
            ["Historical processing speed", "7–9 min per farmer"],
          ].map(([k, v]) => (
            <tr key={k} className="border-b border-border last:border-b-0">
              <th scope="row" className="py-1.5 pr-3 text-left font-semibold">
                {k}
              </th>
              <td className="py-1.5 text-right tabular-nums">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 border border-border bg-muted px-3 py-2 text-sm font-semibold">
        Estimated remaining time: Approximately {formatMinutes(waitMinutes)}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Estimated time may change depending on queue movement and centre capacity.
      </p>
    </Panel>
  );
}

/* --------------------------- PriceComparison ------------------------------ */

export function SupplyChainComparison() {
  const traditional = ["Farmer", "Trader", "Wholesaler", "Distributor", "Retailer", "Consumer"];
  const platform = ["Farmer", "Kisan Suvidha", "Buyer / Retailer"];
  const Chain = ({ steps, tone }: { steps: string[]; tone: "neutral" | "success" }) => (
    <ol className="space-y-1">
      {steps.map((s, i) => (
        <li key={s}>
          <span
            className={cn(
              "block border px-3 py-1.5 text-center text-sm font-semibold",
              tone === "success"
                ? "border-success bg-success-soft text-success"
                : "border-border bg-muted",
            )}
          >
            {s}
          </span>
          {i < steps.length - 1 ? (
            <span aria-hidden="true" className="block text-center text-xs">
              ↓
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <h3 className="mb-2 text-sm font-bold">Traditional Supply Chain</h3>
        <Chain steps={traditional} tone="neutral" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-bold">Kisan Suvidha Route</h3>
        <Chain steps={platform} tone="success" />
        <p className="mt-2 text-xs text-muted-foreground">
          Potentially fewer intermediary layers. Actual chain length depends on the buyer and the
          crop.
        </p>
      </div>
    </div>
  );
}

/* --------------------------- LogisticsCalculator -------------------------- */

export function LogisticsCalculator() {
  const { selectedBuyer, crop, selectedTransportId, selectTransport } = useAppState();
  const buyer = selectedBuyer;
  const quantity = buyer ? Math.min(buyer.requiredQuantityKg, crop.quantity) : crop.quantity;
  const perKg = buyer ? buyer.transportPerKg : 1;
  const total = Math.round(quantity * perKg);

  return (
    <div className="space-y-4">
      <GovAlert tone="info">
        {buyer ? (
          <>
            Route: <strong>{crop.district} (Farmer)</strong> ↓{" "}
            <strong>
              {buyer.location} ({buyer.name})
            </strong>
          </>
        ) : (
          <>
            No buyer offer selected yet. Showing an illustrative estimate for {crop.district}. Select
            a buyer from Direct Market to compute an exact route.
          </>
        )}
      </GovAlert>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <StatBox label="Distance" value={`${buyer?.distanceKm ?? 32} km`} />
        <StatBox label="Quantity" value={`${quantity.toLocaleString("en-IN")} kg`} />
        <StatBox label="Estimated Transport Cost" value={inr(total)} />
        <StatBox label="Transport Cost per kg" value={`₹${perKg.toFixed(2)}`} />
      </div>

      <Panel title="Available Transport Options">
        <ul className="space-y-2">
          {transportOptions.map((t) => {
            const distKm = buyer?.distanceKm ?? 32;
            const quantityQuintals = quantity / 100;
            const computedCost = Math.round(t.ratePerKmPerQuintal * distKm * quantityQuintals);
            return (
              <li
                key={t.id}
                className={cn(
                  "flex flex-wrap items-center justify-between gap-2 border p-3",
                  selectedTransportId === t.id
                    ? "border-success bg-success-soft"
                    : "border-border bg-surface",
                )}
              >
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Capacity: {t.capacity} · ₹{t.ratePerKmPerQuintal}/km/quintal · {t.availability}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold tabular-nums">
                    {inr(computedCost)}
                  </span>
                  {selectedTransportId === t.id ? (
                    <StatusBadge tone="success">Selected</StatusBadge>
                  ) : (
                    <GovButton size="sm" onClick={() => selectTransport(t.id)}>
                      Select Transport
                    </GovButton>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}

/* --------------------------- TransactionTimeline -------------------------- */

export function TransactionTimeline({ activeIndex }: { activeIndex: number }) {
  return (
    <ol className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
      {transactionStages.map((stage, i) => (
        <li key={stage} className="flex flex-1 items-center gap-2">
          <div
            className={cn(
              "flex-1 border px-2 py-2 text-center text-xs font-semibold",
              i < activeIndex && "border-success bg-success-soft text-success",
              i === activeIndex && "border-primary bg-primary text-primary-foreground",
              i > activeIndex && "border-border bg-muted text-muted-foreground",
            )}
          >
            <span className="block">{i < activeIndex ? "✔ " : `${i + 1}. `}</span>
            {stage}
          </div>
          {i < transactionStages.length - 1 ? (
            <span aria-hidden="true" className="hidden text-muted-foreground sm:block">
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/* --------------------------- NotificationPanel ---------------------------- */

export function NotificationPanel({ limit }: { limit?: number }) {
  const { notifications } = useAppState();
  const items = limit ? notifications.slice(0, limit) : notifications;
  return (
    <ul className="divide-y divide-border border border-border">
      {items.map((n) => (
        <li key={n.id} className="flex gap-3 bg-surface p-3">
          <span className="w-20 shrink-0 text-xs font-semibold text-muted-foreground tabular-nums">
            {n.time}
          </span>
          <span>
            <span className="block text-sm font-bold">
              {n.title}{" "}
              <StatusBadge tone={n.kind === "market" ? "info" : "neutral"}>
                {n.kind === "market" ? "Market" : n.kind === "procurement" ? "Procurement" : "System"}
              </StatusBadge>
            </span>
            <span className="block text-sm text-foreground/90">{n.message}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
