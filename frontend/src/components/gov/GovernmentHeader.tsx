import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAppState } from "@/state/app-state";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home", hi: "मुख पृष्ठ" },
  { to: "/farmer", label: "Farmer Services", hi: "किसान सेवाएँ" },
  { to: "/procurement", label: "Procurement Centres", hi: "खरीद केंद्र" },
  { to: "/market", label: "Direct Market", hi: "प्रत्यक्ष बाज़ार" },
  { to: "/prices", label: "Price Information", hi: "मूल्य जानकारी" },
  { to: "/transactions", label: "Transactions", hi: "लेन-देन" },
  { to: "/help", label: "Help & Support", hi: "सहायता" },
] as const;

function Emblem() {
  return (
    <span
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-surface"
    >
      <svg viewBox="0 0 48 48" className="h-9 w-9">
        <circle cx="24" cy="24" r="20" fill="none" stroke="var(--primary)" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="3.2" fill="var(--primary)" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * Math.PI) / 12;
          return (
            <line
              key={i}
              x1={24 + Math.cos(a) * 4}
              y1={24 + Math.sin(a) * 4}
              x2={24 + Math.cos(a) * 19}
              y2={24 + Math.sin(a) * 19}
              stroke="var(--primary)"
              strokeWidth="1.1"
            />
          );
        })}
      </svg>
    </span>
  );
}

export function GovernmentHeader() {
  const { fontScale, changeFontScale, language, toggleLanguage, notifications } = useAppState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--gov-base-font-size", `${fontScale}px`);
  }, [fontScale]);

  useEffect(() => {
  document.documentElement.lang = language;
}, [language]);

  return (
    <header className="border-b-4 border-saffron bg-surface">
      {/* utility bar */}
      <div className="bg-primary-dark text-primary-foreground">
        <div className="mx-auto flex max-w-[78rem] flex-wrap items-center justify-between gap-2 px-3 py-1 text-xs">
          <p>Government Services Portal</p>
          <div className="flex items-center gap-2">
           <button
  type="button"
  onClick={toggleLanguage}
  disabled={language === "hi"}
  aria-current={language === "hi" ? "true" : undefined}
  className={cn(
    "underline-offset-2",
    language === "hi" ? "font-bold" : "underline",
  )}
>
  हिन्दी
</button>
<span aria-hidden="true">|</span>
<button
  type="button"
  onClick={toggleLanguage}
  disabled={language === "en"}
  aria-current={language === "en" ? "true" : undefined}
  className={cn(
    "underline-offset-2",
    language === "en" ? "font-bold" : "underline",
  )}
>
  English
</button>
            <span aria-hidden="true">|</span>
            <Link to="/help" className="underline underline-offset-2">
              Accessibility
            </Link>
            <span className="ml-1 flex items-center gap-1" role="group" aria-label="Text size">
              <button
                type="button"
                onClick={() => changeFontScale("dec")}
                className="h-5 w-5 border border-primary-foreground/50 leading-none"
                aria-label="Decrease text size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => changeFontScale("reset")}
                className="h-5 w-5 border border-primary-foreground/50 leading-none"
                aria-label="Reset text size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => changeFontScale("inc")}
                className="h-5 w-5 border border-primary-foreground/50 leading-none"
                aria-label="Increase text size"
              >
                A+
              </button>
            </span>
          </div>
        </div>
      </div>

      {/* main header */}
      <div className="mx-auto flex max-w-[78rem] flex-wrap items-center justify-between gap-3 px-3 py-3">
        <Link to="/" className="flex items-center gap-3">
          <Emblem />
          <span>
            <span className="block text-lg leading-tight font-bold tracking-wide text-primary-dark sm:text-xl">
              KISAN SUVIDHA
            </span>
            <span className="block text-xs font-semibold text-primary sm:text-sm">
              Digital Farmer Procurement &amp; Market Platform
            </span>
            <span className="block text-[0.7rem] text-muted-foreground">
              Procurement information and direct market access for farmers
            </span>
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <Link
            to="/notifications"
            className="rounded-sm border border-border-strong bg-secondary px-2 py-1.5 font-semibold"
          >
            Notifications ({notifications.length})
          </Link>
          <Link
            to="/farmer"
            className="rounded-sm border border-primary bg-primary px-2.5 py-1.5 font-semibold text-primary-foreground"
          >
            Farmer Login
          </Link>
          <Link
            to="/buyers"
            className="rounded-sm border border-border-strong bg-secondary px-2.5 py-1.5 font-semibold text-secondary-foreground"
          >
            Buyer Login
          </Link>
          <Link
            to="/officer"
            className="rounded-sm border border-border-strong bg-secondary px-2.5 py-1.5 font-semibold text-secondary-foreground"
          >
            Officer Login
          </Link>
        </div>
      </div>

      {/* navigation */}
      <nav aria-label="Main navigation" className="border-t border-border bg-primary">
        <div className="mx-auto max-w-[78rem] px-3">
          <button
            type="button"
            className="flex w-full items-center gap-2 py-2 text-sm font-semibold text-primary-foreground lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="primary-nav-list"
          >
            <span aria-hidden="true">☰</span> Menu
          </button>
          <ul
            id="primary-nav-list"
            className={cn(
              "flex-col lg:flex lg:flex-row lg:items-stretch",
              open ? "flex pb-2" : "hidden",
            )}
          >
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "bg-surface! text-primary-dark!" }}
                  className="block border-b border-primary-dark/40 px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-dark lg:border-r lg:border-b-0"
                >
                  {language === "hi" ? item.hi : item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export function GovernmentFooter() {
  return (
    <footer className="mt-8 border-t-4 border-primary bg-secondary">
      <div className="mx-auto grid max-w-[78rem] gap-4 px-3 py-6 text-sm sm:grid-cols-3">
        <div>
          <h2 className="text-sm font-bold">Kisan Suvidha</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            A prototype unified platform for procurement queue information and direct market access.
            This is a demonstration project built for Smart India Hackathon 2026 and is not an
            official Government of India website.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold">Quick Links</h2>
          <ul className="mt-1 space-y-1 text-xs">
            <li>
              <Link to="/register-crop" className="gov-link">
                Register Crop
              </Link>
            </li>
            <li>
              <Link to="/queue" className="gov-link">
                Live Procurement Queue
              </Link>
            </li>
            <li>
              <Link to="/logistics" className="gov-link">
                Logistics
              </Link>
            </li>
            <li>
              <Link to="/help" className="gov-link">
                Help &amp; Support
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Farmer Helpline (Demo)</h2>
          <p className="mt-1 text-xs">Toll Free: 1800-XXX-XXXX</p>
          <p className="text-xs">SMS &amp; IVR services available for low connectivity areas.</p>
        </div>
      </div>
      <div className="border-t border-border bg-surface py-2 text-center text-xs text-muted-foreground">
        Prototype build · Content shown is illustrative mock data
      </div>
    </footer>
  );
}
