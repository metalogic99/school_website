import React from "react";
import Breadcrum from "@/components/common/Breadcrum";

const content = [
  {
    title: "Scouting Activities",
    description:
      "Scouting encompasses a variety of activities designed to develop practical skills, foster personal growth, and build community spirit. These activities are typically categorized into outdoor adventures, community service, and skill development.",
    details:
      "Community service is another core aspect, with scouts participating in projects such as charity events and clean-up drives, instilling a sense of responsibility and empathy. Additionally, scouting provides opportunities for skill development through activities like first aid training and leadership workshops, preparing scouts for future challenges. ",
    image: "/scout/boys.jpg",
    alt: "playing",
  },
  {
    title: "Benefits of Scouting",
    description:
      "The benefits of scouting are manifold: it enhances leadership and teamwork abilities, develops practical outdoor skills, promotes community engagement, and supports personal growth and resilience. Through these experiences, scouting helps individuals build confidence and a well-rounded skill set, making it a profoundly enriching activity.",
    details:
      "These opportunities help scouts gain confidence, set and achieve personal goals, and prepare for future academic and professional endeavors. The combination of outdoor adventure, community service, and skill development ensures that scouting is a comprehensive experience that supports holistic growth.",
    image: "/scout/prize.jpg",
    alt: "playing",
  },
  {
    title: "Significance of Scouting",
    description:
      "Overall, scouting is a dynamic and enriching activity that equips young individuals with the tools they need to thrive. It fosters personal growth, builds character, and prepares scouts to face life's challenges with resilience and integrity. Through its diverse range of activities and its focus on community and personal development, scouting provides a foundation for lifelong success and fulfillment.",
    details:
      "Through its structured programs, scouting helps young people develop essential life skills and a strong sense of community. Outdoor adventures, such as camping, hiking, and nature exploration, not only teach practical skills like navigation and survival but also foster a deep appreciation for the environment. These experiences encourage scouts to tackle challenges, work collaboratively, and build self-reliance.",
    image: "/scout/cutiee.jpg",
    alt: "playing",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrum heading="Scout" bg={"/scout/girls.jpg"} />
      <div className="mx-auto  mb-20 mt-10 max-w-6xl  px-4 2xl:container">
        <div className="w-full">
          <p className="text-justify   text-sm font-normal tracking-tight">
            Scouting is an enriching extracurricular activity that contributes
            significantly to the personal development and character building of
            young individuals. It provides a structured program that promotes
            leadership, teamwork, outdoor skills, and community service. Here’s
            an overview of the significance and types of scouting activities,
            and the benefits they offer:
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
