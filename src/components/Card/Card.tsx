import type { ReactNode } from "react";

export default function Card({ title, children }: { title?: string; children?: ReactNode }) {
  return (
    <article className="border border-gray-200 rounded-sm p-4">
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      <div>{children}</div>
    </article>
  );
}
