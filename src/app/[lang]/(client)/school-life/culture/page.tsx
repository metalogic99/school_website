import React from "react";
import Breadcrum from "@/components/common/Breadcrum";

const content = [
  {
    title: "Cultural Activities",
    description:
      "Cultural activities in school are essential for fostering an appreciation of diverse traditions, arts, and customs. These activities help students develop a sense of identity and cultural awareness, promoting inclusivity and mutual respect.",
    details:
      "Cultural activities include a wide range of pursuits such as music, dance, drama, and visual arts. Students can participate in school plays, cultural festivals, music bands, dance performances, and art exhibitions. These activities provide a platform for creative expression and help students build confidence, communication skills, and emotional intelligence.",
    image: "/eca/gorup.jpg",
    alt: "playing",
  },
  {
    title: "Annual Day Celebrations",
    description:
      "Celebrating Annual Day is an important tradition in schools, marking the culmination of the academic year with cultural performances, awards ceremonies, and other festivities. Annual Day celebrations provide students with an opportunity to showcase their talents, creativity, and teamwork.",
    details:
      "Annual Day events typically include music, dance, drama, and other performances by students, as well as speeches, skits, and presentations. These celebrations bring the school community together, fostering a sense of pride, unity, and school spirit. They also provide a platform for students to develop their performance skills, confidence, and stage presence.",
    image: "/parents-day/all.jpg",
    alt: "playing",
  },
  {
    title: "Arts and Culture",
    description:
      "Participating in arts and culture activities is a valuable part of school life, helping students to appreciate different forms of cultural expression. These activities support the development of personal and social skills, as well as a deeper understanding of cultural heritage.",
    details:
      "Arts and culture activities encompass music, theatre, dance, and visual arts. Students can engage in band practice, theatre productions, cultural dance, and art workshops. These pursuits promote artistic skills, teamwork, and cultural literacy, enriching the overall educational experience.",
    image: "/parents-day/giftt.jpg",
    alt: "playing",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrum heading="Culture" bg={"/parents-day/cultural.jpg"} />

      <div className="mx-auto  mb-20 mt-10 max-w-6xl  px-4 2xl:container">
        <div className="w-full">
          <p className="text-justify text-sm font-normal tracking-tight">
            Cultural activities in school are essential non-academic pursuits
            that enrich students' educational experience. These activities
            provide opportunities for students to explore and appreciate diverse
            cultural expressions, traditions, and heritage. Engaging in cultural
            activities helps students develop a sense of identity, promotes
            cultural awareness, and fosters inclusivity. Here’s an overview of
            the importance and types of cultural activities, and the benefits
            they offer:
          </p>
        </div>
        <div className=" space-y-10">
          {content.map((item, index) => (
            <div
              key={index}
              className={`mt-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-start ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="lg:w-[900px]">
                <h3 className=" text-base font-semibold">{item.title}</h3>
                <div className=" text-sm ">
                  <p className="mt-2 text-justify ">{item.description}</p>
                  <p className="mt-1  text-justify">{item.details}</p>
                </div>
              </div>
              <div className="lg:flex lg:w-[400px] lg:justify-end">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="mt-6  h-[200px] w-full rounded-2xl object-cover md:w-[350px] lg:mt-0 "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
