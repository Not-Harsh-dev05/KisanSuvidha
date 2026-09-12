import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export interface Crumb {
  label: string;
  to?: "/" | "/farmer" | "/procurement" | "/market" | "/prices" | "/transactions" | "/buyers";
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-muted">
      <ol className="mx-auto flex max-w-[78rem] flex-wrap items-center gap-1 px-3 py-1.5 text-xs">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 ? (
              <span aria-hidden="true" className="text-muted-foreground">
                ›
              </span>
            ) : null}
            {item.to && i < items.length - 1 ? (
              <Link to={item.to} className="gov-link">
                {item.label}
              </Link>
            ) : (
              <span aria-current={i === items.length - 1 ? "page" : undefined}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageShell({
  title,
  subtitle,
  crumbs,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <div className="mx-auto max-w-[78rem] px-3 py-4">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b-2 border-primary pb-2">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
            {subtitle ? <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </>
  );
}
