import clsx from "clsx";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import type { ReactNode } from "react";

type CalloutTone = "info" | "success" | "warning" | "danger";

type CalloutProps = Readonly<{
  label: string;
  tone?: CalloutTone;
  children: ReactNode;
}>;

const styles: Record<CalloutTone, string> = {
  info: "border-petroleum/35 bg-blue-gray text-navy-primary",
  success: "border-success-text/35 bg-success-bg text-success-text",
  warning: "border-warning-text/35 bg-warning-bg text-warning-text",
  danger: "border-danger-text/35 bg-danger-bg text-danger-text",
};

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
} satisfies Record<CalloutTone, typeof Info>;

export function Callout({ label, tone = "info", children }: CalloutProps) {
  const Icon = icons[tone];

  return (
    <aside className={clsx("rounded-2xl border p-4 sm:p-5", styles[tone])}>
      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em]">
        <Icon aria-hidden="true" size={17} strokeWidth={2.1} />
        {label}
      </div>
      <div className="mt-2 text-sm leading-6 text-current/90">{children}</div>
    </aside>
  );
}
