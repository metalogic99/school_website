import React from "react";
import BackButton from "@/components/common/BackButton";
import SingleCardWithBorder from "./SingleCardWithBorder";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const websiteDonors = [
  {
    person: {
      name: "Bed Prasad Ale",
      profession: "Singapore Police SPF",
      phone: "9812115565",
      per_add: "Lalitpur-26",
      birthplace: "Ekatappa-7, Ilam",
      email: "bpale14695@gmail.com",
    },
    image: "/gift/bedPrasadAle.jpg",
  },
  {
    person: {
      name: "Bhakta Bahadur Godar",
      profession: "Businessman",
      phone: "9852689469",
      per_add: "Arjundhara-9, Jhapa",
      birthplace: "Ekatappa-9, Ilam",
      email: "bhaktagodarthapa1@gmail.com",
    },
    image: "/gift/bhaktaBahadurGodar.jpg",
  },
  {
    person: {
      name: "Bhuwan Bikram Rai",
      profession: "Businessman",
      phone: "9815031375",
      per_add: "Phakphokthum-6, Ilam",
      birthplace: "Chamaita-9, Ilam",
      email: "bhuwan71@gmail.com",
    },
    image: "/gift/bhuwan.jpg",
  },
  {
    person: {
      name: "Devi Charan Paudel",
      profession: "Teacher",
      phone: "9842799181",
      per_add: "Phakphokthum-6, Ilam",
      birthplace: "Ekatappa-4, Ilam",
      email: "devicharan2032@gmail.com",
    },
    image: "/gift/deviCharanPaudyal.jpg",
  },
  {
    person: {
      name: "Dik Bahadur Koirala",
      profession: "Businessman",
      phone: "9842695876",
      per_add: "Birtamod-4, Jhapa",
      birthplace: "Ekatappa-6, Ilam",
      email: "dn.koirala55@gmail.com",
    },
    image: "/gift/dikBahadurKoirala.jpg",
  },
  {
    person: {
      name: "Dik Bahadur Rai",
      profession: "Head Teacher",
      phone: "9862670380",
      per_add: "Phakphokthum-7, Ilam",
      birthplace: "Ekatappa-9, Ilam",
      email: "dikrai217@gmail.com",
    },
    image: "/gift/dikbahadurrainew.jpg",
  },
  {
    person: {
      name: "Dil Bahadur Limbu",
      profession: "Teacher",
      phone: "9842766796",
      per_add: "Phakphokthum-7, Ilam",
      birthplace: "Ekatappa-8, Ilam",
      email: "limbudildahadur75@gmail.com",
    },
    image: "/gift/dilbahadurlimbunew.jpg",
  },
  {
    person: {
      name: "Khadga Bahadur Rai",
      profession: "German Post DHL",
      phone: "-",
      per_add: "Phakphokthum-2, Ilam",
      birthplace: "Phakphok-5, Ilam",
      email: "raikhadga@yahoo.com",
    },
    image: "/gift/khadganew.jpg",
  },
  {
    person: {
      name: "Khamba Singh Khatri",
      profession: "Businessman",
      phone: "9849891721",
      per_add: "Ilam-7, Zero KM",
      birthplace: "Phakphok-6, Ilam",
      email: "khambasingh@gmail.com",
    },
    image: "/gift/khamba.jpg",
  },
  {
    person: {
      name: "Om Prasad Khanal",
      profession: "Hydro Power Developer",
      phone: "9863355627",
      per_add: "Phakphokthum-6, Ilam",
      birthplace: "Ekatappa-5, Ilam",
      email: "okkhanal37@gmail.com",
    },
    image: "/gift/omKhanal.jpg",
  },
  {
    person: {
      name: "Rabin Kumar Rai",
      profession: "Agriculture",
      phone: "9823242356",
      per_add: "Arjundhara-11, Jhapa",
      birthplace: "Chamaita-9, Ilam",
      email: "rrabin799@gmail.com",
    },
    image: "/gift/rabin.jpg",
  },
];

export default function page({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const title = lang === "en" ? "Gifted By Students" : "वेबसाईट दाता";
  const students = lang === "en" ? " SLC 2051 Batch" : "एस.एल.सी. ब्याच-२०५१";
  return (
    <div>
      {" "}
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
          <p className="mt-2 text-center text-lg font-medium text-primary/80 sm:text-xl  ">
            {students}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex">
          <BackButton />
        </div>
      </section>
      <section className=" mx-auto px-2 py-20 sm:container">
        <div className=" relative mx-auto mb-10 max-w-4xl  py-10">
          <FaQuoteLeft className=" text-primary" size={40} />
          <p className=" text-base  font-medium tracking-wide text-muted-foreground">
            We are deeply honored to present this website to our school, a
            heartfelt gift from our SLC batch of 2051. After 30 years, we've
            come together to create something meaningful, reflecting our
            enduring connection and gratitude to the place that shaped us.
          </p>
          <FaQuoteRight className=" absolute bottom-5 right-0 text-primary" />
        </div>
        <div className="flex flex-wrap items-center  justify-center gap-10 pb-10">
          {websiteDonors.map((student, index) => (
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
