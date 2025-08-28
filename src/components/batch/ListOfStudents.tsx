import React from "react";
import MyImage from "../common/MyImage";

export default function ListOfStudents({
  filteredStudents,
}: {
  filteredStudents: any;
}) {
  return (
    <>
      <div className=" flex flex-wrap items-center justify-center gap-8 ">
        {filteredStudents?.map((student: any, idx: number) => {
          return (
            <div key={idx}>
              {/* <img
                src={student.image.secure_url}
                alt="student"
                className=" h-40 w-40 rounded-xl object-cover object-center"
              /> */}
              <div className=" h-40 w-40">
                <MyImage
                  height="100%"
                  width="100%"
                  image={student.image.secure_url}
                  classname={" h-40 w-40"}
                />
              </div>
              <div className=" text-center text-sm">
                <p>{student.fullname}</p>
                <p className="  text-xs">GPA: {student.gpa}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
