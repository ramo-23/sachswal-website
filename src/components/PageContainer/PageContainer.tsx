import type { ReactNode } from "react";

export default function PageContainer({ children }: { children?: ReactNode }) {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8">
      {children}
    </main>
  );
}
