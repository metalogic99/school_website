"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const arr = [1, 2, 3, 4, 5];

export function HomeCarousel({ notices }: { notices: string }) {
  const noticeArr = JSON.parse(notices);

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className=" ">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{ loop: true }}
        className="relative mx-auto h-fit w-full"
      >
        <CarouselContent>
          {noticeArr.map((notice: any) => (
            <CarouselItem key={notice._id}>
              <div className="relative  h-[30vh] sm:h-[70vh]">
                <img
                  src={notice.image.secure_url}
                  alt="image"
                  className="h-full w-full object-cover "
                />
                <div className="absolute inset-0 bg-black opacity-10"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-5" />
        <CarouselNext className="absolute right-5" />
        <div className="absolute bottom-0 flex w-full justify-center gap-3 py-4">
          {noticeArr.map((notice: any, idx: number) => (
            <div
              key={notice._id}
              style={{ transition: "width 0.2s ease" }}
              className={cn(
                "h-2 w-4 rounded-full border-2 border-white",
                idx === current - 1 ? "w-8 bg-white" : "",
              )}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
