import type { ReactNode } from "react";

type MobileShellProps = Readonly<{
  children: ReactNode;
}>;

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="min-h-screen bg-blue-gray sm:px-4 sm:py-6">
      <div className="max-w-md mx-auto min-h-screen bg-[#F3F5F6] shadow-2xl relative pb-20 overflow-x-hidden flex flex-col sm:rounded-[2rem]">
        {children}
      </div>
    </div>
  );
}
