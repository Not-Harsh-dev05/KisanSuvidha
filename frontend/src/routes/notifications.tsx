import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/gov/PageShell";
import { GovAlert, Panel } from "@/components/gov/primitives";
import { NotificationPanel } from "@/components/gov/features";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Kisan Suvidha" },
      {
        name: "description",
        content:
          "Queue movement alerts, turn-approaching reminders and buyer offer notifications for the registered farmer.",
      },
      { property: "og:title", content: "Notifications — Kisan Suvidha" },
      {
        property: "og:description",
        content: "Procurement and market alerts in a single list.",
      },
    ],
  }),
  component: Notifications,
});

function Notifications() {
  return (
    <PageShell
      title="Notifications"
      subtitle="Alerts for Ramesh Kumar (KPS-2026-00147)"
      crumbs={[{ label: "Home", to: "/" }, { label: "Notifications" }]}
    >
      <GovAlert tone="info">
        Notifications are also delivered by SMS for farmers with limited internet access.
      </GovAlert>
      <Panel title="All Notifications" bodyClassName="p-0">
        <NotificationPanel />
      </Panel>
    </PageShell>
  );
}
