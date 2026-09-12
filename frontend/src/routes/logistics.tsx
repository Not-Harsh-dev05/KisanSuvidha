import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/gov/PageShell";
import { GovButton, GovLinkButton, Panel } from "@/components/gov/primitives";
import { LogisticsCalculator, TransactionTimeline } from "@/components/gov/features";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/logistics")({
  head: () => ({
    meta: [
      { title: "Logistics & Transport Matching — Kisan Suvidha" },
      {
        name: "description",
        content:
          "Estimate transport cost between farmer and buyer location and assign a suitable vehicle for crop pickup.",
      },
      { property: "og:title", content: "Logistics — Kisan Suvidha" },
      {
        property: "og:description",
        content: "Distance, quantity and transport cost estimation with vehicle options.",
      },
    ],
  }),
  component: Logistics,
});

function Logistics() {
  const { transactionStageIndex, advanceTransaction, selectedTransportId } = useAppState();

  return (
    <PageShell
      title="Logistics"
      subtitle="Transport cost estimation and vehicle matching for the selected buyer offer."
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Direct Market", to: "/market" },
        { label: "Logistics" },
      ]}
      actions={
        <GovLinkButton to="/transactions" variant="secondary">
          View Transaction
        </GovLinkButton>
      }
    >
      <LogisticsCalculator />

      <Panel title="Transaction Progress">
        <TransactionTimeline activeIndex={transactionStageIndex} />
        <div className="mt-3">
          <GovButton onClick={advanceTransaction} disabled={!selectedTransportId}>
            Advance to Next Stage
          </GovButton>
          {!selectedTransportId ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Select a transport option above to enable stage progress.
            </p>
          ) : null}
        </div>
      </Panel>
    </PageShell>
  );
}
