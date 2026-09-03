import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/gov/PageShell";
import { DataTable, GovAlert, GovButton, StatusBadge, type Column } from "@/components/gov/primitives";
import { MIN_PER_FARMER, formatMinutes, procurementCentres, type ProcurementCentre } from "@/lib/mock-data";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/procurement")({
  head: () => ({
    meta: [
      { title: "Nearby Procurement Centres — Kisan Suvidha" },
      {
        name: "description",
        content:
          "Compare nearby procurement centres by distance, current token, waiting farmers and estimated waiting time before travelling.",
      },
      { property: "og:title", content: "Nearby Procurement Centres — Kisan Suvidha" },
      {
        property: "og:description",
        content: "Sort centres by distance, waiting time or queue size and select one to get a token.",
      },
    ],
  }),
  component: ProcurementCentres,
});

function ProcurementCentres() {
  const { selectCentre, centreId, crop } = useAppState();
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState("distance");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const rows = useMemo(() => {
    const list = [...procurementCentres];
    const get = (c: ProcurementCentre) =>
      sortKey === "distance"
        ? c.distanceKm
        : sortKey === "wait"
          ? c.waitingFarmers * MIN_PER_FARMER
          : sortKey === "waiting"
            ? c.waitingFarmers
            : c.currentToken;
    list.sort((a, b) => (sortDir === "asc" ? get(a) - get(b) : get(b) - get(a)));
    return list;
  }, [sortKey, sortDir]);

  const onSort = (key: string) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const columns: Column<ProcurementCentre>[] = [
    { key: "centre", header: "Centre", render: (c) => <span className="font-semibold">{c.name}</span> },
    { key: "district", header: "District", render: (c) => c.district },
    {
      key: "distance",
      header: "Distance",
      align: "right",
      sortValue: (c) => c.distanceKm,
      render: (c) => `${c.distanceKm} km`,
    },
    {
      key: "token",
      header: "Current Token",
      align: "right",
      sortValue: (c) => c.currentToken,
      render: (c) => c.currentToken,
    },
    {
      key: "waiting",
      header: "Waiting Farmers",
      align: "right",
      sortValue: (c) => c.waitingFarmers,
      render: (c) => c.waitingFarmers,
    },
    {
      key: "wait",
      header: "Estimated Wait",
      align: "right",
      sortValue: (c) => c.waitingFarmers,
      render: (c) => formatMinutes(c.waitingFarmers * MIN_PER_FARMER),
    },
    {
      key: "status",
      header: "Status",
      render: (c) => (
        <StatusBadge tone={c.status === "Accepting" ? "success" : "warning"}>{c.status}</StatusBadge>
      ),
    },
    {
      key: "action",
      header: "Action",
      align: "center",
      render: (c) => (
        <GovButton
          size="sm"
          variant={centreId === c.id ? "success" : "primary"}
          onClick={() => {
            selectCentre(c.id);
            navigate({ to: "/queue" });
          }}
        >
          {centreId === c.id ? "Selected" : "Select"}
        </GovButton>
      ),
    },
  ];

  return (
    <PageShell
      title="Nearby Procurement Centres"
      subtitle={`Showing centres for ${crop.crop} · ${crop.district}, ${crop.state}`}
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Farmer Services", to: "/farmer" },
        { label: "Procurement Centres" },
      ]}
    >
      <GovAlert tone="info">
        Click a column heading to sort by distance, waiting time or queue size. Selecting a centre
        issues a demonstration token and opens the live queue page.
      </GovAlert>
      <DataTable
        caption="Nearby procurement centres with queue information"
        columns={columns}
        rows={rows}
        rowKey={(c) => c.id}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={onSort}
        highlightRow={(c) => c.id === centreId}
      />
      <p className="text-xs text-muted-foreground">
        Waiting time is estimated from queue size and average processing time. Values are illustrative.
      </p>
    </PageShell>
  );
}
