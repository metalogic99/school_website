"use client";
import React from "react";
import { setCookie } from "@/lib/cookies";
import { useParams, useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const { lang } = useParams();
  const router = useRouter();

  const switchLanguage = () => {
    if (lang === "np") {
      setCookie("lang", "en", 100);
      window.location.reload();
      return;
    }
    setCookie("lang", "np", 100);
    window.location.reload();
    return;
  };

  const isNepali = lang === "np";

  return (
    <button
      onClick={switchLanguage}
      className="flex items-center gap-1 font-semibold"
    >
      {isNepali ? "EN" : "NP"}
      <img
        width={20}
        src={isNepali ? "/uk.svg" : "/nepal.svg"}
        alt="language switcher"
      />
    </button>
  );
};

export default LanguageSwitcher;
