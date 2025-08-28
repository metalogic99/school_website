"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

const NoticeOverlay = ({ imgurl }: { imgurl: string }) => {
  const [overlay, setOverlay] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    // Check local storage to see if the popup has been shown before
    const noticeRead = sessionStorage.getItem("noticeRead");

    // If not, show the popup and set the local storage flag
    if (!noticeRead) {
      setOverlay(true);
    }
  }, []);
  const handleClose = () => {
    sessionStorage.setItem("noticeRead", "true");
    setOverlay(false);
  };

  return (
    <AnimatePresence>
      {overlay && (
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { type: "just" } }}
          exit={{ y: -200, opacity: 0 }}
          className={` ${pathname.includes("/login") && "hidden"} fixed inset-0 z-[1000] h-screen w-full bg-[rgba(0,0,0,0.9)]`}
        >
          <button onClick={handleClose} className="">
            <X
              size={30}
              className="fixed  right-3 top-3 z-50 h-8 w-8 rounded-full bg-primary text-white"
            />
          </button>

          <div className="flex h-full w-full items-start justify-center overflow-auto">
            <img className="h-full" src={imgurl} alt="image" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoticeOverlay;
