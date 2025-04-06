"use client";

import Link from "next/link";
import { useState } from "react";

const NavbarItems = () => {
  const [isActive, setIsActive] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = [
    { text: "Beranda", href: "/" },
    { text: "Tentang", href: "/" },
    { text: "Program Kerja", href: "/" },
    { text: "Artikel", href: "/" },
  ];

  const NavElements = NavItems.map((item, idx) => (
    <li key={idx}>
      <Link
        href={item.href}
        className={`flex border-b-2 px-4 py-7 text-heading-s
         text-primary-darker transition duration-300 hover:border-primary-normal-hover 
         hover:text-primary-normal-hover lg:border-none lg:py-2 ${
           isActive === idx ? "font-bold" : " "
         }`}
        onClick={() => handleNavItemClick(idx)}
      >
        {item.text}
      </Link>
    </li>
  ));

  const handleNavItemClick = (idx: number) => {
    setIsActive(idx);
    setIsOpen(false);
  };

  return (
    <ul className="flex items-center justify-center gap-4 px-4 py-2">
      <button
        className="flex h-5 flex-col justify-between px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`ease block h-[3px] w-[30px] origin-top-left rounded-lg bg-primary-darker transition duration-300 ${
            isOpen
              ? " origin-top-left -translate-x-px -translate-y-0 rotate-45 transition duration-500 ease-in-out"
              : ""
          } `}
        ></span>
        <span
          className={`ease block h-[3px] w-[30px] rounded-lg bg-primary-darker transition duration-300 ${
            isOpen ? "scale-0 transition duration-500 ease-in-out" : ""
          } `}
        ></span>
        <span
          className={`ease block h-[3px] w-[30px] origin-bottom-left rounded-lg bg-primary-darker transition duration-300 ${
            isOpen
              ? " origin-bottom-left -translate-x-px translate-y-1 -rotate-45 transition duration-500 ease-in-out"
              : ""
          } `}
        ></span>
      </button>
      {isOpen ? (
        <nav className="absolute right-0 top-full h-screen w-screen bg-secondary-white p-10 lg:static lg:mt-0 lg:h-auto lg:w-auto lg:p-0">
          <ul className="block lg:flex ">{NavElements}</ul>
        </nav>
      ) : (
        <nav className="hidden lg:block">
          <ul className="flex">{NavElements}</ul>
        </nav>
      )}
    </ul>
  );
};
export default NavbarItems;
