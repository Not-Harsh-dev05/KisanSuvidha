import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/gov/PageShell";
import { GovAlert, Panel } from "@/components/gov/primitives";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help, SMS & IVR Services — Kisan Suvidha" },
      {
        name: "description",
        content:
          "Support information, accessibility options and SMS/IVR services for farmers with limited internet access.",
      },
      { property: "og:title", content: "Help & Support — Kisan Suvidha" },
      {
        property: "og:description",
        content: "IVR menu, SMS formats and accessibility settings for the platform.",
      },
    ],
  }),
  component: Help,
});

const ivr = [
  "1 — Check Procurement Token",
  "2 — Check Queue Position",
  "3 — Check Waiting Time",
  "4 — Find Procurement Centre",
  "5 — Check Buyer Offers",
];

function Help() {
  const { changeFontScale, fontScale, language, toggleLanguage } = useAppState();

  return (
    <PageShell
      title="Help & Support"
      subtitle="Services for farmers with limited internet access, accessibility options and contact information."
      crumbs={[{ label: "Home", to: "/" }, { label: "Help & Support" }]}
    >
      <GovAlert tone="info" title="Prototype visualization">
        SMS and IVR screens shown here are demonstrations. No real calls or messages are sent.
      </GovAlert>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Services for Farmers with Limited Internet Access">
          <p className="text-sm">
            Farmers can access essential information through SMS and IVR without using the website.
          </p>
          <h3 className="mt-3 text-sm font-bold">Interactive Voice Response (IVR)</h3>
          <p className="text-sm">
            Dial: <strong className="tabular-nums">1800-XXX-XXXX</strong>
          </p>
          <ul className="mt-2 divide-y divide-border border border-border">
            {ivr.map((line) => (
              <li key={line} className="bg-surface px-3 py-1.5 text-sm">
                {line}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="SMS Formats">
          <h3 className="text-sm font-bold">Procurement Status SMS</h3>
          <pre className="mt-1 overflow-x-auto border border-border bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
{`Kisan Suvidha:
Token 147
Current Token 121
Farmers Ahead 26
Estimated Wait 3h 40m
Rampur Procurement Centre`}
          </pre>
          <h3 className="mt-3 text-sm font-bold">Market Offer SMS</h3>
          <pre className="mt-1 overflow-x-auto border border-border bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
{`Kisan Suvidha:
New Buyer Offer
Punjab Grain Retail
Rs 27/kg
Quantity 2000 kg
Reply 1 to view`}
          </pre>
        </Panel>
      </div>

      <Panel title="Accessibility Settings">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-semibold">Text size ({fontScale}px):</span>
          <div className="flex gap-1">
            <button
              onClick={() => changeFontScale("dec")}
              className="border border-border-strong px-2 py-1"
            >
              A-
            </button>
            <button
              onClick={() => changeFontScale("reset")}
              className="border border-border-strong px-2 py-1"
            >
              A
            </button>
            <button
              onClick={() => changeFontScale("inc")}
              className="border border-border-strong px-2 py-1"
            >
              A+
            </button>
          </div>
          <span className="font-semibold">Language:</span>
          <button onClick={toggleLanguage} className="border border-border-strong px-2 py-1">
            {language === "en" ? "Switch to हिन्दी" : "Switch to English"}
          </button>
        </div>
        <ul className="mt-3 list-disc pl-5 text-sm">
          <li>All interactive elements are reachable by keyboard with visible focus outlines.</li>
          <li>Status information uses text and symbols, not colour alone.</li>
          <li>Forms use labels, hints and clear error messages.</li>
        </ul>
      </Panel>

      <Panel title="Frequently Asked Questions">
        <dl className="space-y-3 text-sm">
          {[
            [
              "How is the waiting time calculated?",
              "From the number of farmers ahead of your token, the average processing time per farmer and the number of active counters at the centre. It is an estimate and can change.",
            ],
            [
              "Is the net farmer price guaranteed?",
              "No. Net farmer price is the buyer's offer price minus the estimated transport cost. Actual transport cost depends on vehicle, load and route.",
            ],
            [
              "Does the platform remove all intermediaries?",
              "No. It can potentially reduce intermediary layers by connecting farmers to registered buyers directly.",
            ],
            [
              "Is this an official government website?",
              "No. Kisan Suvidha is a Smart India Hackathon 2026 prototype built for demonstration.",
            ],
          ].map(([q, a]) => (
            <div key={q} className="border-l-4 border-border pl-3">
              <dt className="font-bold">{q}</dt>
              <dd className="text-foreground/90">{a}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </PageShell>
  );
}
