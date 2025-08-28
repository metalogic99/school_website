import React from "react";
import Breadcrum from "@/components/common/Breadcrum";

const content = [
  {
    title: "Yoga",
    description:
      "Yoga, as an extracurricular activity, offers students a holistic approach to physical and mental well-being. It emphasizes flexibility, strength, and balance, while also fostering mental clarity and emotional stability. Yoga encourages mindfulness and self-awareness, helping students manage their emotions better and develop a positive outlook crucial for emotional growth.",
    details:
      "It improves overall physical fitness by enhancing flexibility, strength, and endurance through different poses and sequences that work on various muscle groups, promoting balanced body development. Regular practice of yoga helps in reducing stress and anxiety, improving focus, and enhancing cognitive functions, with breathing exercises and meditation techniques calming the mind and improving concentration. ",
    image: "/eca/yoga2.jpg",
    alt: "Yoga",
  },
  {
    title: "Entertainment Programs",
    description:
      "Entertainment programs play a vital role in school life, offering students opportunities to showcase their talents, creativity, and teamwork. These programs include a diverse range of activities such as singing, dancing, drama, and other competitions, each contributing to the vibrant cultural life of the school.",
    details:
      "Beyond singing, dancing, and drama, schools often host other entertainment competitions, such as poetry recitals, storytelling, and musical instrument performances. These activities offer students opportunities to explore and showcase their diverse talents and interests, contributing to a rich cultural environment in the school. These events collectively contribute to a vibrant and dynamic school environment, fostering student confidence, teamwork, and a sense of community.",
    image: "/eca/danceee.jpg",
    alt: "playing",
  },
  {
    title: "Intelligence Programs",
    description:
      "Intelligence Programs in schools are designed to foster cognitive development, problem-solving skills, and intellectual curiosity among students. These programs include various competitions and activities that challenge students' knowledge and mental agility.",
    details:
      "These programs not only complement academic learning but also promote intellectual curiosity and creativity, preparing students for future academic and personal success. By integrating such activities into the school curriculum, educational institutions contribute to a well-rounded and dynamic learning environment that supports the holistic development of students.",
    image: "/eca/quiz.jpg",
    alt: "playing",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrum heading="ECA" bg={"/eca/dance1.jpg"} />

      <div className="mx-auto  mb-20 mt-10 max-w-6xl  px-4 2xl:container">
        <div className="w-full">
          <p className="text-justify   text-sm font-normal tracking-tight">
            Extracurricular activities (ECA) are non-academic pursuits that
            complement the formal curriculum and offer students opportunities to
            develop a wide range of skills, interests, and experiences. These
            activities play a crucial role in holistic education, fostering
            personal growth, social development, and overall well-being. Here’s
            an overview of the importance and types of extracurricular
            activities, and the benefits they offer:
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
