import { ReactNode } from "react";

export default function H1({ children }: { children: ReactNode }) {
  return <h1 className="not-prose text-2xl mb-8">{children}</h1>;
}
