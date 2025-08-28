"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { H2 } from "../typography";
import MyImage from "../common/MyImage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { cn } from "@/lib/utils";

const Overlay = ({ gallery }: { gallery: any }) => {
  const galleryObj = JSON.parse(gallery);

  const [overlay, setOverlay] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOverlay(false);
      }
    },
    [setOverlay],
  );

  useEffect(() => {
    if (overlay) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [overlay, handleKeyDown]);

  return (
    <section className=" relative ">
      <div className=" mx-auto max-w-6xl px-4 ">
        <H2 className="  mt-8 text-center">{galleryObj.title}</H2>
        <div className="grid min-h-screen  grid-flow-row-dense grid-cols-2 gap-4  gap-y-2 py-16 sm:grid-cols-3 md:grid-cols-4 lg:mx-10 lg:grid-cols-4 xl:grid-cols-4  ">
          {galleryObj.photos.map((photo: any, idx: number) => (
            <Image
              className={` h-full w-full cursor-pointer  rounded-md border-2 border-primary object-cover drop-shadow-lg ${idx % 2 === 0 ? "row-span-2" : ""}`}
              onClick={() => {
                setCurrent(idx);
                setOverlay(true);
              }}
              key={idx}
              src={photo.url}
              alt="image"
              height={300}
              width={300}
            />
          ))}
        </div>
        <AnimatePresence>
          {overlay && (
            <motion.div
              initial={{ y: -200, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { type: "just" } }}
              exit={{ y: -200, opacity: 0 }}
              className="fixed inset-0  z-50 h-screen w-full bg-[rgba(0,0,0,0.9)]"
            >
              <button onClick={() => setOverlay(false)}>
                <X
                  size={32}
                  className="absolute right-3 top-3 z-50 text-white"
                />
              </button>

              <div className="relative flex h-full w-full items-center justify-center">
                <div className="absolute left-0 flex  h-full  items-center justify-center">
                  <button
                    onClick={() => {
                      setCurrent(
                        (prev) =>
                          (prev - 1 + galleryObj.photos.length) %
                          galleryObj.photos.length,
                      );
                    }}
                  >
                    <ChevronLeft size={32} className="text-white" />
                  </button>
                </div>
                <div className="absolute right-0 flex h-full items-center justify-center">
                  <button
                    onClick={() => {
                      setCurrent(
                        (prev) => (prev + 1) % galleryObj.photos.length,
                      );
                    }}
                  >
                    <ChevronRight size={32} className="text-white" />
                  </button>
                </div>

                <Image
                  className="cursor-pointer"
                  src={galleryObj.photos[current].url}
                  alt="image"
                  height={800}
                  width={800}
                  priority
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Overlay;
