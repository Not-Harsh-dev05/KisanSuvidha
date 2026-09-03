import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/gov/PageShell";
import { FormField, GovAlert, GovButton, Panel, fieldClass } from "@/components/gov/primitives";
import { crops, districts, grades, states } from "@/lib/mock-data";
import { useAppState } from "@/state/app-state";

export const Route = createFileRoute("/register-crop")({
  head: () => ({
    meta: [
      { title: "Register Crop — Kisan Suvidha" },
      {
        name: "description",
        content:
          "Register your crop details once and choose between government procurement or direct market selling on Kisan Suvidha.",
      },
      { property: "og:title", content: "Register Crop — Kisan Suvidha" },
      {
        property: "og:description",
        content: "Enter crop, quantity, grade and availability date to see both selling options.",
      },
    ],
  }),
  component: RegisterCrop,
});

function RegisterCrop() {
  const { crop, registerCrop, setChosenPath } = useAppState();
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...crop, quantity: String(crop.quantity) });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.farmerName.trim()) e.farmerName = "Enter the farmer's full name.";
    if (!/^[0-9 ]{10,12}$/.test(form.mobile.trim()))
      e.mobile = "Enter a valid 10-digit mobile number.";
    if (!form.village.trim()) e.village = "Enter the village name.";
    const q = Number(form.quantity);
    if (!q || q <= 0) e.quantity = "Enter quantity greater than zero.";
    if (!form.availableDate) e.availableDate = "Select the expected availability date.";
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    registerCrop({ ...form, quantity: Number(form.quantity) });
    setSubmitted(true);
  };

  return (
    <PageShell
      title="Register Crop"
      subtitle="Step 1 of 2 — crop details. Step 2 — choose your selling path."
      crumbs={[{ label: "Home", to: "/" }, { label: "Farmer Services", to: "/farmer" }, { label: "Register Crop" }]}
    >
      <Panel title="Crop & Farmer Details">
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          {Object.keys(errors).length > 0 ? (
            <GovAlert tone="danger" title="Please correct the following">
              <ul className="list-disc pl-5">
                {Object.values(errors).map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </GovAlert>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <FormField label="Farmer Name" htmlFor="farmerName" required error={errors.farmerName}>
              <input
                id="farmerName"
                className={fieldClass}
                value={form.farmerName}
                onChange={(e) => set("farmerName", e.target.value)}
              />
            </FormField>
            <FormField
              label="Mobile Number"
              htmlFor="mobile"
              required
              hint="10-digit mobile number for SMS updates"
              error={errors.mobile}
            >
              <input
                id="mobile"
                inputMode="numeric"
                className={fieldClass}
                value={form.mobile}
                onChange={(e) => set("mobile", e.target.value)}
              />
            </FormField>
            <FormField label="State" htmlFor="state" required>
              <select
                id="state"
                className={fieldClass}
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
              >
                {states.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </FormField>
            <FormField label="District" htmlFor="district" required>
              <select
                id="district"
                className={fieldClass}
                value={form.district}
                onChange={(e) => set("district", e.target.value)}
              >
                {districts.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Village" htmlFor="village" required error={errors.village}>
              <input
                id="village"
                className={fieldClass}
                value={form.village}
                onChange={(e) => set("village", e.target.value)}
              />
            </FormField>
            <FormField label="Crop" htmlFor="crop" required>
              <select
                id="crop"
                className={fieldClass}
                value={form.crop}
                onChange={(e) => set("crop", e.target.value)}
              >
                {crops.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Quantity" htmlFor="quantity" required error={errors.quantity}>
              <input
                id="quantity"
                inputMode="numeric"
                className={fieldClass}
                value={form.quantity}
                onChange={(e) => set("quantity", e.target.value)}
              />
            </FormField>
            <FormField label="Unit" htmlFor="unit" required>
              <select
                id="unit"
                className={fieldClass}
                value={form.unit}
                onChange={(e) => set("unit", e.target.value)}
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="quintal">Quintal</option>
              </select>
            </FormField>
            <FormField
              label="Expected Harvest / Availability Date"
              htmlFor="availableDate"
              required
              error={errors.availableDate}
            >
              <input
                id="availableDate"
                type="date"
                className={fieldClass}
                value={form.availableDate}
                onChange={(e) => set("availableDate", e.target.value)}
              />
            </FormField>
            <FormField label="Quality / Grade" htmlFor="grade" required>
              <select
                id="grade"
                className={fieldClass}
                value={form.grade}
                onChange={(e) => set("grade", e.target.value)}
              >
                {grades.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </FormField>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-border pt-3">
            <GovButton type="submit">Save Crop Details</GovButton>
            <Link to="/farmer" className="gov-link self-center text-sm">
              Cancel and return to dashboard
            </Link>
          </div>
        </form>
      </Panel>

      {submitted ? (
        <Panel title="What would you like to do?">
          <GovAlert tone="success" title="Crop details saved">
            {form.crop} · {Number(form.quantity).toLocaleString("en-IN")} {form.unit} · Grade{" "}
            {form.grade} · Available {form.availableDate}
          </GovAlert>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="border border-border bg-surface p-3">
              <h3 className="text-base font-bold">Option 1 — Government Procurement</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Check nearby procurement centres and queue status.
              </p>
              <div className="mt-3">
                <GovButton
                  onClick={() => {
                    setChosenPath("procurement");
                    navigate({ to: "/procurement" });
                  }}
                >
                  Continue to Procurement Centres
                </GovButton>
              </div>
            </div>
            <div className="border border-border bg-surface p-3">
              <h3 className="text-base font-bold">Option 2 — Direct Market</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Find registered buyers and compare offers.
              </p>
              <div className="mt-3">
                <GovButton
                  variant="success"
                  onClick={() => {
                    setChosenPath("market");
                    navigate({ to: "/market" });
                  }}
                >
                  Continue to Direct Market
                </GovButton>
              </div>
            </div>
          </div>
        </Panel>
      ) : null}
    </PageShell>
  );
}
