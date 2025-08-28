import React from "react";
import SingleCardWithBorder from "./SingleCardWithBorder";
import BackButton from "@/components/common/BackButton";

const student = [
  {
    person: {
      name: "Bed Prasad Ale",
      address: "Ilam, Nepal",
      profession: "Teacher",
      phone: "9841488401",
      email: "bed@gmail.com",
    },
    image: "/gift/bedPrasadAle.jpg",
  },
  {
    person: {
      name: "Om Khanal",
      address: "Ilam, Nepal",
      profession: "Teacher",
      phone: "9841488401",
      email: "bed@gmail.com",
    },

    image: "/gift/omKhanal.jpg",
  },
  {
    person: {
      name: "Bhakta Bahadur Godar",
      address: "Ilam, Nepal",
      profession: "Teacher",
      phone: "9841488401",
      email: "bed@gmail.com",
    },

    image: "/gift/bhaktaBahadurGodar.jpg",
  },
  {
    person: {
      name: "Dik Bahadur Koirala",
      address: "Ilam, Nepal",
      profession: "Teacher",
      phone: "9841488401",
      email: "bed@gmail.com",
    },

    image: "/gift/dikBahadurKoirala.jpg",
  },
  {
    person: {
      name: "Khadga Rai",
      address: "Ilam, Nepal",
      profession: "Teacher",
      phone: "9841488401",
      email: "bed@gmail.com",
    },

    image: "/gift/khadgaRai.jpg",
  },
  {
    person: {
      name: "Dil Bahadur Limbu",
      address: "Ilam, Nepal",
      profession: "Teacher",
      phone: "9841488401",
      email: "bed@gmail.com",
    },

    image: "/gift/dilBahadurLimbu.jpg",
  },
  {
    person: {
      name: "Devi Charan Paudyal",
      address: "Ilam, Nepal",
      profession: "Teacher",
      phone: "9841488401",
      email: "bed@gmail.com",
    },

    image: "/gift/deviCharanPaudyal.jpg",
  },
  {
    person: {
      name: "Dik Bahadur Rai",
      address: "Ilam, Nepal",
      profession: "Teacher",
      phone: "9841488401",
      email: "bed@gmail.com",
    },

    image: "/gift/dikBahadurRai.jpg",
  },
];

export default function page({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const title =
    lang === "en" ? "Gifted By Students" : "विद्यार्थीहरू द्वारा उपहार";
  const students = lang === "en" ? " SLC 2051 Batch" : "एस.एल.सी २०५१ ब्याच";
  return (
    <div>
      {" "}
      {/* <Breadcrum bg={"/giftedby.svg"} heading="Gited by SLC 2051 Batch" /> */}
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
          <h1 className=" text-5xl font-medium ">{title}</h1>
          <p className="mt-2 text-center text-3xl font-medium  ">{students}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex">
          <BackButton />
        </div>
      </section>
      <section className=" mx-auto px-2 py-20 sm:container">
        <div className="flex flex-wrap items-center  justify-center gap-10 pb-10">
          {student.map((student, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center "
            >
              <SingleCardWithBorder
                name={student.person.name}
                person={student.person}
                image={student.image}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
