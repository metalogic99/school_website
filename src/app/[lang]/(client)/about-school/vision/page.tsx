import Breadcrum from "@/components/common/Breadcrum";
import { DefaultProps } from "@/types";
import React from "react";

export default function page({ params }: DefaultProps) {
  const heading = params.lang === "en" ? "Our Vision" : "हाम्रो भिजन";

  return (
    <div>
      <Breadcrum bg="/about/about-school.png" heading={heading} />

      <div className=" px-4 py-20 ">
        {/* DESCRIPTION OF SCHOOL */}
        <div className=" mx-auto max-w-5xl  rounded-xl  border p-4 text-center text-sm leading-7  tracking-wide shadow-lg">
          <p>
            Our vision is to cultivate a community of lifelong learners who are
            empowered to achieve academic excellence, demonstrate integrity, and
            contribute positively to society. We aspire to create an inclusive
            and nurturing environment where every student is encouraged to
            explore their passions, develop critical thinking skills, and
            embrace innovation. By fostering a culture of respect,
            collaboration, and continuous improvement, we aim to prepare our
            students to be responsible, compassionate, and engaged global
            citizens. Our ultimate goal is to inspire each student to reach
            their full potential and make a meaningful impact in an
            ever-changing world.
          </p>
        </div>
      </div>
    </div>
  );
}
