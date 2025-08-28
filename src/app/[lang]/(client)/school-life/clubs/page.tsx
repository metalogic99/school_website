import React from "react";
import Breadcrum from "@/components/common/Breadcrum";

const content = [
  {
    title: "Scout Club",
    description:
      "Scout clubs are extracurricular groups that focus on outdoor adventures, community service, and skill development. These clubs provide students with opportunities to learn practical skills, engage in community projects, and develop leadership abilities.",
    details:
      "Scout clubs offer a range of activities that promote personal growth, teamwork, and community engagement. Outdoor adventures such as camping, hiking, and nature exploration teach practical skills like navigation, survival, and environmental stewardship. Community service projects, such as charity events and clean-up drives, instill a sense of responsibility and empathy. Skill development activities, including first aid training and leadership workshops, prepare students for future challenges.",
    image: "/scout/line1.jpg",
    alt: "playing",
  },
  {
    title: "Sports Club",
    description:
      "Sports clubs are extracurricular groups that focus on physical fitness, teamwork, and sportsmanship. These clubs offer students opportunities to participate in team sports, individual sports, and fitness activities that promote health and well-being.",
    details:
      "Sports clubs provide a variety of activities that cater to different interests and fitness levels. Team sports such as soccer, basketball, volleyball, cricket, hockey, rugby, baseball, and softball encourage teamwork and unity. Individual sports including tennis, badminton, swimming, track and field, gymnastics, martial arts, and boxing focus on personal skill development. Fitness activities such as yoga, aerobics, and strength training promote physical health and well-being.",
    image: "/sports/game.jpg",
    alt: "playing",
  },
  {
    title: "Entertainment Club",
    description:
      "Entertainment clubs are extracurricular groups that focus on creative expression, performance arts, and cultural activities. These clubs provide students with opportunities to showcase their talents, develop their creativity, and engage in artistic pursuits.",
    details:
      "Entertainment clubs offer a range of activities that foster artistic skills, self-expression, and cultural appreciation. Music clubs, dance clubs, drama clubs, and art clubs provide platforms for students to explore their talents and interests. Cultural activities such as poetry recitals, storytelling, and musical performances promote creativity and self-confidence. These clubs contribute to the vibrant cultural life of the school and help students develop their artistic abilities.",
    image: "/eca/cultural-dance.jpg",
    alt: "playing",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrum heading="Clubs" bg={"/scout/girls.jpg"} />
      <div className="mx-auto  mb-20 mt-10 max-w-6xl  px-4 2xl:container">
        <div className="w-full">
          <p className="text-justify   text-sm font-normal tracking-tight">
            Clubs are extracurricular groups that offer students opportunities
            to explore their interests, develop their talents, and engage in a
            variety of activities. These clubs provide platforms for students to
            learn new skills, build friendships, and contribute to the school
            community. Here’s an overview of the different types of clubs and
            the benefits they offer:
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
