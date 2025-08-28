"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import styles from "./Navbar.module.css";
import Link from "next/link";
import {
  aboutSchoolSubMenu,
  educationNetworkSubMenu,
  schoolLifes,
  notices,
  Mobilemenus,
  donnersSubMenu,
  studentsSubMenuMobile,
} from "./menus";
import MobileNav from "./MobileNav";
import { Lang } from "@/types";
import { Button } from "../ui/button";

const DesktopNav = ({ lang }: { lang: Lang }) => {
  const pathname = usePathname();
  const isEnglish = lang === "en";

  return (
    <>
      <MobileNav lang={lang} />
      <nav className="sticky top-0 z-50 hidden w-full items-center justify-between bg-primary px-4 py-3 text-white lg:font-semibold xl:flex xl:px-8">
        <Link href="/" className=" flex items-center gap-2 ">
          <img src="/schoollogo.svg" alt="logo" width={60} height={40} />
          <div className="flex flex-col  font-bold ">
            <h2 className="inline-block w-full text-[13px] font-semibold xl:text-[20px]">
              श्री सिंहदेवी माध्यमिक बिद्यालय, एकतप्पा
            </h2>
            <h2 className="inline-block w-full text-[13px] font-semibold xl:text-[12px] ">
              SHREE SINGHADEVI SECONDARY SCHOOL, EKATAPPA
            </h2>
          </div>
        </Link>

        <ul className="flex items-center gap-4 text-xs md:text-sm">
          {Mobilemenus[lang].map((m, idx) =>
            m.to === "/about" ? (
              <DropdownMenu key={`about-${idx}`}>
                <DropdownMenuTrigger className="flex outline-none">
                  {m.title} <ChevronDown size={18} strokeWidth={1} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" translate-y-[26px] rounded-b-2xl p-4 shadow-xl">
                  <div className=" flex  gap-4 rounded-b-full">
                    {/* about school SUBNAV */}
                    <div>
                      <h2 className=" rounded-full border border-primary px-4 py-1 text-center text-sm font-medium">
                        {isEnglish ? "About School" : "विद्यालयको बारेमा"}
                      </h2>
                      <ul className=" mt-4 space-y-2 pl-2 ">
                        {aboutSchoolSubMenu[lang].map((m, subIdx) => (
                          <li key={`about-sub-${subIdx}`}>
                            <DropdownMenuItem
                              asChild
                              className="cursor-pointer rounded-full text-[13px] font-medium  focus:bg-primary/20 "
                            >
                              <Link href={m.to}>{m.title}</Link>
                            </DropdownMenuItem>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <hr className=" h-auto w-[2px] rounded-full bg-primary" />
                    {/* Educational network SUBNAV */}
                    <div>
                      <h2 className=" rounded-full border border-primary px-4 py-1 text-center text-sm font-medium">
                        {isEnglish ? "Education Network" : "शिक्षा नेटवर्क"}
                      </h2>
                      <ul className=" mt-4 space-y-2 pl-2 text-[13px] font-medium">
                        {educationNetworkSubMenu[lang].map((m, subIdx) => (
                          <li key={`network-sub-${subIdx}`}>
                            <DropdownMenuItem
                              asChild
                              className="cursor-pointer rounded-full text-[13px] font-medium  focus:bg-primary/20  "
                            >
                              <Link className="" href={m.to}>
                                {m.title}
                              </Link>
                            </DropdownMenuItem>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <hr className=" h-auto w-[2px] rounded-full bg-primary" />
                    {/* STUDENTS SUBNAV */}
                    <div>
                      <h2 className=" rounded-full border border-primary px-4 py-1 text-center text-sm font-medium">
                        {isEnglish ? "Our Students" : "हाम्रा विद्यार्थीहरू"}
                      </h2>
                      <ul className=" mt-4 space-y-2 pl-2 text-[13px] font-medium">
                        {studentsSubMenuMobile[lang].map((m, subIdx) => (
                          <li key={`students-sub-${subIdx}`}>
                            <DropdownMenuItem
                              asChild
                              className="cursor-pointer rounded-full text-[13px] font-medium  focus:bg-primary/20 "
                            >
                              <Link href={m.to}>{m.title}</Link>
                            </DropdownMenuItem>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : m.to === "/school-life" ? (
              <DropdownMenu key={`school-life-${idx}`}>
                <DropdownMenuTrigger className="flex outline-none">
                  {m.title} <ChevronDown size={18} strokeWidth={1} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex translate-y-[26px] gap-4 rounded-b-2xl p-4 shadow-xl">
                  {schoolLifes[lang].map((m, subIdx) => (
                    <React.Fragment key={`school-life-sub-${subIdx}`}>
                      <DropdownMenuItem
                        asChild
                        className=" cursor-pointer  rounded-full border border-primary px-4 py-1 text-center text-sm font-medium focus:bg-primary/20"
                      >
                        <Link href={m.to}>{m.title}</Link>
                      </DropdownMenuItem>
                      {subIdx < schoolLifes[lang].length - 1 && (
                        <hr className=" h-auto w-[2px] rounded-full bg-primary" />
                      )}
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : m.to === "/notices" ? (
              <DropdownMenu key={`notices-${idx}`}>
                <DropdownMenuTrigger className="flex outline-none">
                  {m.title} <ChevronDown size={18} strokeWidth={1} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex translate-y-[26px] gap-4 rounded-b-2xl p-4 shadow-xl">
                  {notices[lang].map((m, subIdx) => (
                    <React.Fragment key={`notices-sub-${subIdx}`}>
                      <DropdownMenuItem
                        asChild
                        className=" cursor-pointer  rounded-full border border-primary px-4 py-1 text-center text-sm font-medium focus:bg-primary/20"
                      >
                        <Link href={m.to}>{m.title}</Link>
                      </DropdownMenuItem>
                      {subIdx < notices[lang].length - 1 && (
                        <hr className=" h-auto w-[2px] rounded-full bg-primary" />
                      )}
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : m.to === "/donors" ? (
              <DropdownMenu key={`school-life-${idx}`}>
                <DropdownMenuTrigger className="flex outline-none">
                  {m.title} <ChevronDown size={18} strokeWidth={1} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex translate-y-[26px] gap-4 rounded-b-2xl p-4 shadow-xl">
                  {donnersSubMenu[lang].map((m, subIdx) => (
                    <React.Fragment key={`school-life-sub-${subIdx}`}>
                      <DropdownMenuItem
                        asChild
                        className=" cursor-pointer  rounded-full border border-primary px-4 py-1 text-center text-sm font-medium focus:bg-primary/20"
                      >
                        <Link href={m.to}>{m.title}</Link>
                      </DropdownMenuItem>
                      {subIdx + 1 < donnersSubMenu[lang].length && (
                        <hr className=" h-auto w-[2px] rounded-full bg-primary" />
                      )}
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <li key={`menu-${idx}`}>
                <Link
                  href={m.to}
                  className={`${styles.link} ${
                    pathname === m.to ? styles.active : null
                  } relative pb-1`}
                >
                  {m.title}
                </Link>
              </li>
            ),
          )}
          <Link href={"/register"}>
            <Button className=" h-8 bg-white text-primary hover:bg-white">
              {isEnglish ? "Student Register" : "विद्यार्थी दर्ता"}
            </Button>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default DesktopNav;
