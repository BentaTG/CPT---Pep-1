import type { ReactNode } from "react";

type SectionHeadingProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}>;

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-navy-primary/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-petroleum">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-navy-primary sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-graphite/75 sm:text-base">
          {description}
        </p>
      </div>
      {action}
    </header>
  );
}
