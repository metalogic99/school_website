import { H2 } from "@/components/typography";
import React from "react";
import Breadcrum from "@/components/common/Breadcrum";

export default function Page() {
  return (
    <>
      <Breadcrum bg={"/newsArticles/bg.svg"} heading="News & Articles" />
      <div className="mt-10 p-4">
        <div className="mx-auto flex max-w-[80%] flex-col gap-4">
          <H2>Article Title</H2>
          <div className=" space-y-2 text-sm font-normal tracking-wide">
            <p>Dear enthusiastic learners and parents,</p>
            {/* <H3>News Article Title</H3> */}
            <p>
              With a long experience, learning and planning, the year 2068 BS
              (2010 AD) incubated Liverpool Education Network Pvt. Ltd. and
              started its servings with the formal name Liverpool International
              Higher Secondary School affiliated by the then Higher Secondary
              Board (HSEB), Ministry of Education & Sports, Government of Nepal.
              The very first enrollment gave us a huge encouragement, support
              and responsibility to work better for the students, parents and
              the whole community. As a result, within a couple of years,
              Liverpool became a port of enthusiastic learners and
              quality-seeking parents. Liverpoolians started leading in all
              national and international competitions, including HSEB Board
              First and Medicine and Engineering top rankings which inspired to
              be more responsible and extend our service from Pre-School to
              Bachelor Levels. Our first intake started in Pre-School to Grade
              IX in the year 2073 BS (2015 AD) acquiring Metro Secondary School
              and Milton International College in Bachelor Level with the
              affiliation of Tribhuvan University (TU). Now, we are serving with
              Liverpool Montessori, Liverpool Secondary School (from Grade I to
              X), Liverpool International SS/College (Grade XI and XII, Science,
              Management, Humanities & Law) and Milton International College
              (BBM, BCA, BASW, BBS Programs). We are very indebted to our valued
              parents, students, fellow faculties and well-wishers to bring this
              institution to this level. We shouldn’t speak our quality in
              words, it’s all realized and shown in our action, performance and
              results which give us great happiness when our student leads the
              community at home and abroad. This, indeed, gives us more courage
              and inspiration to upgrade our physical infrastructure and human
              resources without any compromise for quality education. I,
              therefore, request one and all SEE Graduates to take an
              opportunity to be the proud Liverpoolian/s.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
