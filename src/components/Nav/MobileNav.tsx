"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  about,
  aboutSchoolSubMenu,
  educationNetworkSubMenu,
  schoolLifes,
  notices,
  studentsSubMenuMobile,
  Mobilemenus,
  donnersSubMenu,
} from "./menus";
import { MenuIcon, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Lang } from "@/types";

const MobileNav = ({ lang }: { lang: Lang }) => {
  const pathname = usePathname();
  const [mobileNav, setMobileNav] = useState(false);

  const handleClose = () => {
    setMobileNav(false);
  };

  return (
    <div className="sticky top-0 z-40 bg-primary text-white backdrop-blur xl:hidden">
      <div className="flex items-center justify-between px-2 py-4 transition-all duration-200">
        <Link href="/" className="flex flex-1 items-center gap-2 ">
          <img
            src="/schoollogo.svg"
            alt="logo"
            width={50}
            height={30}
            className=" w-10 sm:w-14"
          />
          <div className="flex flex-1  flex-col ">
            <h2
              className={` inline-block w-full text-[19px]  font-semibold sm:text-[21px]`}
            >
              श्री सिंहदेवी माध्यमिक बिद्यालय
            </h2>
            <h2
              className={` inline-block w-full   text-[10.5px] font-semibold sm:text-[14px]`}
            >
              SHREE SINGHADEVI SECONDARY SCHOOL
            </h2>
            {/* <p className="inline-block w-full text-[8px] font-normal sm:text-[12px]"></p> */}
          </div>
        </Link>
        <button
          onClick={() => setMobileNav(!mobileNav)}
          className="text-secondary-400"
        >
          {mobileNav ? <X /> : <MenuIcon size={30} />}
        </button>
      </div>

      <ul
        className={`mobile-nav z-50 flex flex-col gap-3 overflow-auto bg-primary pl-4 text-white transition-all duration-300 ${
          mobileNav ? "h-[280px] pb-4" : "h-0 pb-0"
        }`}
      >
        {Mobilemenus[lang].map((menu, menuIdx) => {
          if (menu.to === "/about") {
            return (
              <Accordion collapsible key={menuIdx} type="single">
                <AccordionItem className="w-fit border-none" value="about-us">
                  <AccordionTrigger className="p-0 pb-0">
                    {menu.title}
                  </AccordionTrigger>
                  <AccordionContent className="pl-6">
                    <div key={menuIdx} className="text-sm">
                      <Accordion type="single" collapsible className="w-full">
                        {about[lang].map((m, idx) => {
                          if (m.to === "/about-school") {
                            return (
                              <AccordionItem
                                key={idx}
                                className="w-fit border-none pb-0"
                                value="about-school"
                              >
                                <AccordionTrigger className="border-none p-0 py-1 pb-0">
                                  {m.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                  >
                                    <ul className="text-s space-y-2 pl-4 font-medium">
                                      {aboutSchoolSubMenu[lang].map(
                                        (m, idx) => {
                                          return (
                                            <li
                                              onClick={() =>
                                                setMobileNav(!mobileNav)
                                              }
                                              key={idx}
                                            >
                                              <Link
                                                href={m.to}
                                                key={idx}
                                                className=" "
                                              >
                                                {m.title}
                                              </Link>
                                            </li>
                                          );
                                        },
                                      )}
                                    </ul>
                                  </Accordion>
                                </AccordionContent>
                              </AccordionItem>
                            );
                          } else if (m.to === "/education-network") {
                            return (
                              <AccordionItem
                                key={idx}
                                className="w-fit border-none"
                                value="education-network"
                              >
                                <AccordionTrigger className="border-none p-0 py-1 pb-0">
                                  {m.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                  >
                                    <ul className="text-s space-y-2 pl-2 font-medium">
                                      {educationNetworkSubMenu[lang].map(
                                        (m, idx) => {
                                          return (
                                            <li
                                              onClick={() =>
                                                setMobileNav(!mobileNav)
                                              }
                                              key={idx}
                                            >
                                              <Link
                                                href={m.to}
                                                key={idx}
                                                className=" "
                                              >
                                                {m.title}
                                              </Link>
                                            </li>
                                          );
                                        },
                                      )}
                                    </ul>
                                  </Accordion>
                                </AccordionContent>
                              </AccordionItem>
                            );
                          } else if (m.to === "/students") {
                            return (
                              <AccordionItem
                                key={idx}
                                className="w-fit border-none"
                                value="students"
                              >
                                <AccordionTrigger className="border-none p-0 py-1 pb-0">
                                  {m.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                  >
                                    <ul className="text-s space-y-2 pl-2 font-medium">
                                      {studentsSubMenuMobile[lang].map(
                                        (m, idx) => {
                                          return (
                                            <li
                                              onClick={() =>
                                                setMobileNav(!mobileNav)
                                              }
                                              key={idx}
                                            >
                                              <Link
                                                href={m.to}
                                                key={idx}
                                                className=" "
                                              >
                                                {m.title}
                                              </Link>
                                            </li>
                                          );
                                        },
                                      )}
                                    </ul>
                                  </Accordion>
                                </AccordionContent>
                              </AccordionItem>
                            );
                          } else {
                            return "";
                          }
                        })}
                      </Accordion>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          } else if (menu.to === "/school-life") {
            return (
              <Accordion collapsible key={menuIdx} type="single">
                <AccordionItem className="w-fit border-none" value="about-us">
                  <AccordionTrigger className="p-0 pb-0">
                    {menu.title}
                  </AccordionTrigger>
                  <AccordionContent className="pl-2">
                    <ul className="space-y-2 pl-4 text-sm font-medium">
                      {schoolLifes[lang].map((m, idx) => {
                        return (
                          <li
                            onClick={() => setMobileNav(!mobileNav)}
                            key={idx}
                          >
                            <Link href={m.to} key={idx} className=" ">
                              {m.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          } else if (menu.to === "/notices") {
            return (
              <Accordion collapsible key={menuIdx} type="single">
                <AccordionItem className="w-fit border-none" value="about-us">
                  <AccordionTrigger className="p-0 pb-0">
                    {menu.title}
                  </AccordionTrigger>
                  <AccordionContent className="pl-2">
                    <ul className="space-y-2 pl-4 text-sm font-medium">
                      {notices[lang].map((m, idx) => {
                        return (
                          <li
                            onClick={() => setMobileNav(!mobileNav)}
                            key={idx}
                          >
                            <Link href={m.to} key={idx} className=" ">
                              {m.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          } else if (menu.to === "/donors") {
            return (
              <Accordion collapsible key={menuIdx} type="single">
                <AccordionItem className="w-fit border-none" value="about-us">
                  <AccordionTrigger className="p-0 pb-0">
                    {menu.title}
                  </AccordionTrigger>
                  <AccordionContent className="pl-2">
                    <ul className="space-y-2 pl-4 text-sm font-medium">
                      {donnersSubMenu[lang].map((m, idx) => {
                        return (
                          <li
                            onClick={() => setMobileNav(!mobileNav)}
                            key={idx}
                          >
                            <Link href={m.to} key={idx} className=" ">
                              {m.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          } else {
            return (
              <li
                onClick={() => setMobileNav(!mobileNav)}
                key={`menu_${menuIdx}`}
              >
                <Link
                  onClick={handleClose}
                  className={`block text-sm font-medium ${
                    pathname === menu.to && "text-yellow-600"
                  }`}
                  href={menu.to}
                >
                  {menu.title}
                </Link>
              </li>
            );
          }
        })}
      </ul>
      <div
        className={`  ${mobileNav ? "opacity-100 " : "hidden opacity-0 "} pb-8 pl-4  pt-4 transition-all  duration-300 `}
      >
        <Link href={"/register"}>
          <Button
            onClick={() => setMobileNav(!mobileNav)}
            className=" h-8 bg-white text-primary hover:bg-white"
          >
            {lang === "en" ? "Student Register" : "विद्यार्थी दर्ता"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
