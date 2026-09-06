import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/gov/PageShell";
import { GovAlert, GovButton, Panel, StatusBadge } from "@/components/gov/primitives";
import { TransactionTimeline } from "@/components/gov/features";
import { inr } from "@/lib/mock-data";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/transactions")({
  head: () => ({
    meta: [
      { title: "Transactions & History — Kisan Suvidha" },
      {
        name: "description",
        content:
          "Track ongoing transaction status and view unified history of government procurement and direct market sales.",
      },
      { property: "og:title", content: "Transactions — Kisan Suvidha" },
      {
        property: "og:description",
        content: "One history for both procurement and direct market sales.",
      },
    ],
  }),
  component: Transactions;
});

function Transactions() {
  return null;
}
