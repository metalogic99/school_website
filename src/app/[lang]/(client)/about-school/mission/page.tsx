import Breadcrum from "@/components/common/Breadcrum";
import { DefaultProps } from "@/types";
import React from "react";

export default function page({ params }: DefaultProps) {
  const heading = params.lang === "en" ? "Our Mission" : "हाम्रो मिशन";

  return (
    <div>
      <Breadcrum bg="/about/about-school.png" heading={heading} />

      <div className=" px-4 py-20 ">
        {/* DESCRIPTION OF SCHOOL */}
        <div className=" mx-auto max-w-5xl  rounded-xl  border p-4 text-center text-sm leading-7  tracking-wide shadow-lg">
          <p>
            Our mission is to provide a dynamic and inclusive educational
            environment that nurtures the intellectual, social, emotional, and
            physical development of each student. We are dedicated to inspiring
            a love for learning, fostering creativity, and promoting critical
            thinking. Our commitment to excellence in teaching and learning
            ensures that students are equipped with the knowledge, skills, and
            values necessary to thrive in a diverse and evolving world. We
            strive to cultivate a community of respectful, responsible, and
            engaged learners who are prepared to make positive contributions to
            society.
          </p>
        </div>
      </div>
    </div>
  );
}
