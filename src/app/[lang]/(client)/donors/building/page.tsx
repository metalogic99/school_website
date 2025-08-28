import { H2, H4 } from "@/components/typography";
import React from "react";
import BackButton from "@/components/common/BackButton";
import Donors from "@/server/models/Donors";

export default async function page({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const title = lang === "en" ? "Building Donors" : "भवन दाताहरू";

  const donors = await Donors.find({ donation_type: "building" });
  console.log("buiildinf donode", donors);
  return (
    <div>
      <section className="  relative mx-auto h-[50vh] cursor-pointer bg-primary/20">
        <img
          src="/gift1.png"
          alt="gift"
          width={80}
          className=" absolute left-0 drop-shadow-xl"
        />
        {/* AROUND THE TITLE */}
        <img
          src="/gift2.png"
          alt="gift"
          width={70}
          className=" absolute left-[20%] top-14 drop-shadow-xl  sm:left-[40%]"
        />
        {/* AROUND THE TITLE */}
        <img
          src="/gift3.png"
          alt="gift"
          width={70}
          className=" absolute right-[20%] top-10 rotate-45 drop-shadow-xl sm:right-[40%]"
        />
        <img
          src="/gift1.png"
          alt="gift"
          width={150}
          className=" absolute right-8 top-40 hidden drop-shadow-xl sm:block"
        />
        <img
          src="/gift2.png"
          alt="gift"
          width={80}
          className=" absolute right-0 drop-shadow-xl"
        />
        <img
          src="/gift2.png"
          alt="gift"
          width={200}
          className=" absolute bottom-10 left-20 hidden drop-shadow-xl  sm:block"
        />
        {/* BOTTOM GIFTS */}
        <img
          src="/gift2.png"
          alt="gift"
          width={200}
          className=" absolute -bottom-10 left-[40%] w-[120px] drop-shadow-xl  sm:w-[200px]"
        />
        <img
          src="/gift3.png"
          alt="gift"
          width={200}
          className="absolute -bottom-10 right-[20%]  hidden  rotate-45 drop-shadow-xl  sm:block  "
        />
        <div className=" absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] whitespace-nowrap py-10 text-center">
          <h1 className=" text-2xl font-medium text-primary sm:text-4xl ">
            {title}
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex">
          <BackButton />
        </div>
      </section>
      <section className="mx-auto px-4 py-20 2xl:container">
        <section className=" mx-auto mt-8 flex flex-col gap-8">
          <div className=" mx-auto flex  max-w-7xl flex-wrap items-center justify-center gap-8">
            {donors &&
              donors.length > 0 &&
              donors.map((pp: any, idx: number) => {
                return (
                  <div
                    key={idx}
                    className="flex  w-[270px] flex-col text-wrap  "
                  >
                    <img
                      src={pp.photo.secure_url}
                      alt="donor"
                      width={200}
                      className=" h-[350px] w-full rounded-t-xl object-cover"
                    />
                    <div className=" rounded-b-xl bg-primary py-4 text-center text-sm font-medium text-muted-foreground text-white">
                      <p className=" font-medium ">{pp?.fullname}</p>
                      {/* <p>{pp?.address}</p>
                              <p>{pp?.phone}</p> */}
                    </div>
                  </div>
                );
              })}
          </div>
          {(!donors || donors.length === 0) && (
            <div className=" flex h-[80vh] items-center justify-center">
              <H2>NO donner's yet</H2>
            </div>
          )}
        </section>
      </section>
    </div>
  );
}
