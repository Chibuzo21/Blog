// import Link from "next/link";
"use client";
// import ServerDarkMode from "../../hooks/use-server-dark-mode";
import DarkMode from "./dark-mode";
import { useState } from "react";
import Links from "./Links";
import { IoMenu } from "react-icons/io5";
export const Header = () => {
  // const theme = ServerDarkMode();

  const LinkArr = [
    // {
    //   id: 0,
    //   href: "/",
    //   name: "Chibuzo",
    // },
    {
      id: 1,
      href: "/about",
      name: "About",
    },
    {
      id: 2,
      href: "/about/contact",
      name: "Contact",
    },
    {
      id: 3,
      href: "/project",
      name: "Project",
    },
    {
      id: 4,
      href: "/photos",
      name: "Photos",
    },
    {
      id: 5,
      href: "/blog",
      name: "Blog",
    },
  ];
  const [menu, setMenu] = useState<boolean>(true);
  const handleMenu = () => {
    setMenu(!menu);
  };
  const Handleclick = () => {
    setMenu(!menu);
  };
  const showmenu = menu
    ? "max-h-screen md:max-h-fit md:py-0 pt-8  translate-y-0 "
    : "max-h-0 md:max-h-fit h-0 h-fit pt-0 -translate-y-2 md:translate-y-0";
  return (
    <header className="m-auto md:w-[80%] md:px-8  py-5 fixed top-0 left-0 w-[100%]  md:h-fit  flex items-center md:justify-between justify-around text-xl font-bold ">
      <Links href="/" onClick={Handleclick}>
        Chibuzo
      </Links>

      <nav
        className={`overflow-hidden transition-all duration-700   ease-in-out flex flex-col md:flex-row space-y-5 h-screen md:space-y-0 md:h-fit md:translate-y-0 md:items-center items-start ${showmenu}  md:space-x-7   md:pt-0 md:top-0   w-[100%] top-[93%] absolute md:static   md:w-fit md:bg-transparent dark:bg-slate-950 bg-white px-5 md:px-0 md:dark:bg-transparent `}
      >
        {LinkArr.map((link) => (
          <Links key={link.id} href={link.href} onClick={Handleclick}>
            {link.name}
          </Links>
        ))}
      </nav>
      <div
        className="dark:text-white text-gray-950 text-3xl  md:hidden"
        onClick={handleMenu}
      >
        <IoMenu />
      </div>
      <div className=" ">
        <DarkMode />
      </div>
    </header>
  );
};
