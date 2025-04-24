import {  ReactNode } from "react";
type SectionProps = {
  title?: string;
  children: ReactNode;
};
export const Section = ({
  title = "My subheading",
  children,
}: SectionProps) => {
  return (
    <>
      <p>{title}</p>
      <p>{children}</p>
    </>
  );
};
