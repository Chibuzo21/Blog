"use client";
import { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Link = {
  children: ReactNode;
  href: string;
  onClick: MouseEventHandler;
};
const Links: React.FC<Link> = ({ children, href, onClick }) => {
  const pathname = usePathname();

  return (
    <Link
      className={`${
        pathname === href
          ? `dark:text-gray-500 text-gray-400`
          : `dark:text-white text-slate-950`
      } `}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
export default Links;
