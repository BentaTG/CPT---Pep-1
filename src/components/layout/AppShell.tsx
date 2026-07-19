import clsx from "clsx";
import type { ReactNode } from "react";

type AppShellProps = Readonly<{
  navigation: ReactNode;
  sidebarCollapsed: boolean;
  children: ReactNode;
}>;

export function AppShell({
  navigation,
  sidebarCollapsed,
  children,
}: AppShellProps) {
  return (
    <div data-testid="app-shell" className="min-h-screen bg-blue-gray text-graphite">
      {navigation}
      <div
        data-testid="app-shell-content"
        className={clsx(
          "min-w-0 bg-light-gray pb-24 transition-[margin] duration-200 md:pb-0",
          sidebarCollapsed ? "md:ml-0" : "md:ml-60 lg:ml-[17rem]",
        )}
      >
        <div className="mx-auto min-h-screen w-full max-w-[100rem]">{children}</div>
      </div>
    </div>
  );
}
