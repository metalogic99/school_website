import React from "react";
import Link from "next/link";
import { FaWhatsapp, FaFacebook, FaViber } from "react-icons/fa";
import { Phone, MapPin, Mail } from "lucide-react";
import { Lang } from "@/types";
import { cn } from "@/lib/utils";

const quickLinks = {
  en: [
    { title: "Moecdc", to: " https://moecdc.gov.np/en" },
    { title: "Nast", to: "https://nast.gov.np/" },
    { title: "Moest", to: "https://moest.gov.np" },
    { title: "NEB", to: "https://www.neb.gov.np" },
    { title: "Kaiser Library", to: "https://klib.gov.np/" },
    { title: "Admin", to: "/login" },
  ],
  np: [
    { title: " पाठ्यक्रम विकास केन्द्र ", to: "https://moecdc.gov.np/np" },
    {
      title: "नेपाल विज्ञान तथा प्रविधि प्रज्ञा-प्रतिष्ठान ",
      to: "https://nast.gov.np/",
    },
    {
      title: "शिक्षा, विज्ञान तथा प्रविधि मन्त्रालय",
      to: "https://moest.gov.np",
    },
    { title: "राष्ट्रिय परीक्षा बोर्ड", to: "https://www.neb.gov.np" },
    { title: "काइसर पुस्तकालय", to: "https://klib.gov.np/" },
    { title: "Admin", to: "/login" },
  ],
};

const Footer = ({ lang }: { lang: Lang }) => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer
      style={{
        background: "#0051ba url(/footer/effect.svg) no-repeat center/cover ",
      }}
    >
      <div className="bg-primary/50">
        <div className="relative  z-20 w-full bg-primary/50 px-4  py-10 text-white sm:py-20 md:px-16">
          <div className="flex flex-col justify-between gap-y-8 xl:flex-row">
            <div className="mt-8 flex items-center gap-4 md:mt-0">
              <img
                src="/schoollogo.svg"
                alt="logo"
                className=" w-[50px] sm:w-[80px]"
              />
              <div className="flex flex-col">
                <h2
                  className={` inline-block w-full text-[18px]  font-semibold sm:text-[21px]`}
                >
                  श्री सिंहदेवी माध्यमिक बिद्यालय, एकतप्पा (कक्षा १-१२)
                </h2>
                <h2
                  className={` inline-block w-full   text-xs font-semibold sm:text-[14px]`}
                >
                  SHREE SINGHADEVI SECONDARY SCHOOL, EKATAPPA (Class 1-12)
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-y-8 md:flex-row md:gap-8 xl:mx-0">
              {/* QUICK LINKS SECTION */}
              <div>
                <h3 className="mb-2 text-base font-semibold">Quick Links</h3>
                <ul
                  className={cn(
                    "flex flex-col gap-2 text-xs",
                    lang === "np" ? "text-base" : "",
                  )}
                >
                  {quickLinks[lang].map((d, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Link
                        target={d.to === "/login" ? "_blank" : "_self"}
                        href={d.to}
                      >
                        {d.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CONTACT US SECTION */}
              <div>
                <h3 className="mb-2 text-base font-semibold">Contact Us</h3>
                <ul className="flex flex-col gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Phone size={16} />{" "}
                    {lang === "np" ? " ९८६२६७०३८०" : "9862670380"}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin size={16} />{" "}
                    {lang === "np"
                      ? "फाकफोकथुम–७, एकतप्पा, इलाम"
                      : "Phakphokthum-7, Ekatappa, Ilam"}
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail size={16} /> singhadevimaviekatappa14@gmail.com
                  </li>
                </ul>
              </div>

              {/* SOCIAL MEDIA SECTION */}
              <div>
                <h3 className="mb-2 font-semibold">
                  {lang === "en"
                    ? "Join us in social media"
                    : "हामीसंग जोडिनुहोस् "}
                </h3>
                <ul className="flex gap-8 text-sm md:justify-around">
                  <li className="rounded-full border-2 p-2">
                    <Link href="https://wa.me/9862670380" target="_blank">
                      <FaWhatsapp size={20} />
                    </Link>
                  </li>
                  <li className="rounded-full border-2 p-2">
                    <Link
                      href="https://www.facebook.com/profile.php?id=100088965098796&mibextid=ZbWKwL"
                      target="_blank"
                    >
                      <FaFacebook size={20} />
                    </Link>
                  </li>
                  <li className="rounded-full border-2 p-2">
                    <Link href="viber://add?number=9862670380" target="_blank">
                      <FaViber size={20} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* COPYRIGHT SECTION */}
          <div className="mt-8 flex flex-col justify-between gap-y-2 text-sm md:flex-row">
            <span>
              &copy; Copyright {year} SHREE SINGHADEVI SECONDARY SCHOOL. All
              rights reserved.
            </span>
            <span>
              Powered by:{" "}
              <Link
                className="text-blue-300"
                href="https://metalogic.com.np"
                target="_blank"
              >
                Metalogic Software Pvt. Ltd
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
