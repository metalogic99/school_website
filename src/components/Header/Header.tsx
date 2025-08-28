import React from "react";
import { MapPin, Phone } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { CiMail } from "react-icons/ci";
import Link from "next/link";

const Header = ({ lang }: { lang: string }) => {
  return (
    <header className="relative">
      <div className="flex flex-wrap items-center justify-between p-1 px-4">
        <div className="flex w-full justify-between gap-x-2  md:flex-row md:items-center  lg:w-fit">
          <div className="flex flex-row gap-4 text-sm sm:text-base">
            <h4 className="text-[12px] font-medium text-gray-600 sm:text-lg">
              <span>"</span>
              {lang === "np"
                ? "शिक्षा प्राप्त गर्नु सबै बालबालिकाको नैसर्गिक अधिकार हो ।"
                : "Education is every child's inherent right."}
              <span>"</span>
            </h4>
          </div>

          <div className="lg:hidden">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="hidden flex-row items-center gap-x-5 gap-y-2 text-[15px] text-gray-600 lg:flex">
          <div className="flex items-center gap-2 pt-4 text-sm md:p-0">
            <span className="text-gray-600 md:p-2">
              <Phone size={16} />
            </span>
            <Link href="tel:9862670380">9862670380</Link>
          </div>
          <div className="flex items-center gap-2 pt-4 text-sm md:p-0">
            <span className="text-gray-600 md:p-2">
              <MapPin size={16} />
            </span>
            {/* इलाम, नेपाल */}
            Ilam, Nepal
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 md:p-2">
              <CiMail size={16} strokeWidth={0.5} />
            </span>
            <Link href="mailto:sighadevisecondary1@gmail.com">
              singhadevimaviekatappa14@gmail.com
            </Link>
          </div>

          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
