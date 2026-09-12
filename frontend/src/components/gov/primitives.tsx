import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------- Panel ---------------------------------- */

export function Panel({
  title,
  aside,
  children,
  className,
  bodyClassName,
}: {
  title?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("gov-panel", className)}>
      {title ? (
        <header className="gov-panel-heading flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-[0.95rem] leading-tight">{title}</h2>
          {aside ? <div className="text-xs font-normal">{aside}</div> : null}
        </header>
      ) : null}
      <div className={cn("p-3 sm:p-4", bodyClassName)}>{children}</div>
    </section>
  );
}

/* ------------------------------- Button --------------------------------- */

type Variant = "primary" | "secondary" | "success" | "warning" | "link" | "danger";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground border-primary hover:bg-primary-dark disabled:opacity-50",
  secondary:
    "bg-secondary text-secondary-foreground border-border-strong hover:bg-accent disabled:opacity-50",
  success:
    "bg-success text-success-foreground border-success hover:brightness-95 disabled:opacity-50",
  warning:
    "bg-saffron text-saffron-foreground border-saffron hover:brightness-95 disabled:opacity-50",
  danger:
    "bg-destructive text-destructive-foreground border-destructive hover:brightness-95 disabled:opacity-50",
  link: "bg-transparent border-transparent text-primary underline underline-offset-2 hover:text-primary-dark",
};

const baseBtn =
  "inline-flex items-center justify-center gap-1.5 rounded-sm border px-3 py-1.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed";

export function GovButton({
  variant = "primary",
  className,
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: "sm" | "md" }) {
  return (
    <button
      {...props}
      className={cn(
        baseBtn,
        variantClass[variant],
        size === "sm" && "px-2 py-1 text-xs",
        className,
      )}
    />
  );
}

export function GovLinkButton({
  variant = "primary",
  className,
  size = "md",
  children,
  ...props
}: React.ComponentProps<typeof Link> & { variant?: Variant; size?: "sm" | "md" }) {
  return (
    <Link
      {...props}
      className={cn(
        baseBtn,
        variantClass[variant],
        size === "sm" && "px-2 py-1 text-xs",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/* ----------------------------- StatusBadge ------------------------------- */

type Tone = "success" | "warning" | "danger" | "neutral" | "info";

const toneClass: Record<Tone, string> = {
  success: "bg-success-soft text-success border-success/40",
  warning: "bg-warning-soft text-warning border-warning/40",
  danger: "bg-destructive-soft text-destructive border-destructive/40",
  neutral: "bg-muted text-muted-foreground border-border-strong",
  info: "bg-info-soft text-primary border-primary/30",
};

const toneMark: Record<Tone, string> = {
  success: "✔",
  warning: "▲",
  danger: "✖",
  neutral: "•",
  info: "i",
};

export function StatusBadge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        toneClass[tone],
      )}
    >
      <span aria-hidden="true">{toneMark[tone]}</span>
      {children}
    </span>
  );
}

/* -------------------------------- Alert ---------------------------------- */

export function GovAlert({
  tone = "info",
  title,
  children,
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="note"
      className={cn("rounded-sm border-l-4 px-3 py-2 text-sm", toneClass[tone])}
    >
      {title ? <p className="font-bold">{title}</p> : null}
      <div className="text-foreground/90">{children}</div>
    </div>
  );
}

/* ------------------------------- Stat cell -------------------------------- */

export function StatBox({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "primary" | "success" | "saffron";
}) {
  return (
    <div className="border border-border bg-surface p-3">
      <p className="text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-2xl font-bold tabular-nums",
          tone === "success" && "text-success",
          tone === "saffron" && "text-saffron-foreground",
          (!tone || tone === "primary") && "text-primary-dark",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

/* ------------------------------- DataTable -------------------------------- */

export interface Column<T> {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  sortValue?: (row: T) => number | string;
  render: (row: T) => ReactNode;
}

export function DataTable<T>({
  columns,
  rows,
  caption,
  sortKey,
  sortDir,
  onSort,
  rowKey,
  highlightRow,
}: {
  columns: Column<T>[];
  rows: T[];
  caption?: string;
  sortKey?: string;
  sortDir?: "asc" | "desc";
  onSort?: (key: string) => void;
  rowKey: (row: T, i: number) => string;
  highlightRow?: (row: T) => boolean;
}) {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[38rem] border-collapse text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="bg-primary text-primary-foreground">
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={cn(
                  "border-r border-primary-dark/40 px-2.5 py-2 text-left text-xs font-bold tracking-wide uppercase last:border-r-0",
                  c.align === "right" && "text-right",
                  c.align === "center" && "text-center",
                )}
              >
                {onSort && c.sortValue ? (
                  <button
                    type="button"
                    onClick={() => onSort(c.key)}
                    className="inline-flex items-center gap-1 uppercase hover:underline"
                    aria-label={`Sort by ${c.header}`}
                  >
                    {c.header}
                    <span aria-hidden="true" className="text-[0.65rem]">
                      {sortKey === c.key ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
                    </span>
                  </button>
                ) : (
                  c.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={rowKey(row, i)}
              className={cn(
                i % 2 === 1 ? "bg-muted/60" : "bg-surface",
                highlightRow?.(row) && "bg-success-soft",
              )}
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={cn(
                    "border-t border-border px-2.5 py-2 align-middle",
                    c.align === "right" && "text-right tabular-nums",
                    c.align === "center" && "text-center",
                  )}
                >
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="border-t border-border px-3 py-6 text-center text-sm text-muted-foreground"
              >
                No records found.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------- FormField -------------------------------- */

export function FormField({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-primary-dark">
        {label}
        {required ? (
          <span className="text-destructive" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? (
        <p className="text-xs font-semibold text-destructive" role="alert">
          ✖ {error}
        </p>
      ) : null}
    </div>
  );
}

export const fieldClass =
  "w-full rounded-sm border border-input bg-surface px-2.5 py-1.5 text-sm text-foreground placeholder:text-muted-foreground";
