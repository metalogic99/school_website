import React from "react";
import Breadcrum from "@/components/common/Breadcrum";

const content = [
  {
    title: "Physical Activities",
    description:
      "Participating in physical activities is a popular extracurricular pursuit that helps students develop fitness, teamwork, leadership, and sportsmanship. In addition, engagement in sports enhances concentration, discipline, and time management skills.",
    details:
      "Physical activities encompass a variety of sports and exercises that cater to different interests and fitness levels. Team sports like soccer, basketball, volleyball, cricket, hockey, rugby, baseball, and softball promote collaboration and unity. Individual sports such as tennis, badminton, swimming, track and field, gymnastics, martial arts, and boxing focus on individual skill enhancement.",
    image: "/sports/volleyball.jpg",
    alt: "playing",
  },
  {
    title: "Athletic Pursuits",
    description:
      "Athletic pursuits for girls encompass a range of sports that help in building physical fitness, teamwork, and leadership skills. These activities also contribute to improved concentration, discipline, and time management, making them a valuable part of the extracurricular experience.",
    details:
      "Our School features a variety of sports including soccer, basketball, and track and field, tailored for female students. Each activity is designed to develop both individual skills and team collaboration, providing a well-rounded athletic experience.",
    image: "/sports/girlsvollyeyball.jpg",
    alt: "playing",
  },
  {
    title: "Sports Programs",
    description:
      "Our sports programs are more than just activities; they are opportunities for students to develop important life skills such as teamwork, discipline, and leadership. By participating in these diverse sports, students not only stay physically active but also build lasting friendships and gain valuable experiences. We are committed to fostering a supportive environment where every student can thrive and find joy in their athletic journey.",
    details:
      "We designed to build coordination, discipline, and a love for physical activity, ensuring every student finds a sport that inspires and challenges them. Through these activities, students not only stay active but also develop essential life skills and create lasting friendships.",
    image: "/sports/kabbadiii.jpg",
    alt: "playing",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrum heading="Sports" bg={"/sports/teams.jpg"} />

      <div className="mx-auto  mb-20 mt-10 max-w-6xl  px-4 2xl:container">
        <div className="w-full">
          <p className="text-justify   text-sm font-normal tracking-tight">
            Sports are non-academic pursuits that complement the formal
            curriculum and offer students opportunities to develop a wide range
            of skills, interests, and experiences. These activities play a
            crucial role in holistic education, fostering personal growth,
            social development, and overall well-being. Here’s an overview of
            the importance and types of extracurricular activities, and the
            benefits they offer:
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
