import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/gov/PageShell";
import { GovAlert, GovLinkButton, Panel } from "@/components/gov/primitives";
import {
  QueueDemoControls,
  QueueTracker,
  WaitingTimeEstimation,
  NotificationPanel,
} from "@/components/gov/features";

export const Route = createFileRoute("/queue")({
  head: () => ({
    meta: [
      { title: "Live Procurement Status — Kisan Suvidha" },
      {
        name: "description",
        content:
          "Live token tracking with farmers ahead, estimated waiting time and expected turn at your selected procurement centre.",
      },
      { property: "og:title", content: "Live Procurement Status — Kisan Suvidha" },
      {
        property: "og:description",
        content: "Track your token, queue position and estimated waiting time in real time.",
      },
    ],
  }),
  component: LiveQueue,
});

function LiveQueue() {
  return (
    <PageShell
      title="Live Procurement Status"
      subtitle="Token tracking and waiting-time estimation for your selected centre."
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Procurement Centres", to: "/procurement" },
        { label: "Live Queue" },
      ]}
      actions={<GovLinkButton to="/farmer" variant="secondary">Back to Dashboard</GovLinkButton>}
    >
      <Panel title="Your Queue Position">
        <QueueTracker />
      </Panel>

      <Panel title="Queue Demonstration Controls">
        <p className="mb-2 text-sm text-muted-foreground">
          For demonstration purposes, the queue can be advanced manually. The farmer dashboard,
          officer dashboard and waiting-time estimate all update from the same queue state.
        </p>
        <QueueDemoControls />
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <WaitingTimeEstimation />
        <Panel title="Queue Notifications" bodyClassName="p-0">
          <NotificationPanel limit={5} />
        </Panel>
      </div>

      <GovAlert tone="warning" title="Please note">
        Estimated time may change depending on queue movement and centre capacity. Arrive at least 30
        minutes before your expected turn.
      </GovAlert>
    </PageShell>
  );
}
