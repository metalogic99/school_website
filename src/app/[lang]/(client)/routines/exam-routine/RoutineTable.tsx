"use client";
import { H2 } from "@/components/typography";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NoData from "@/components/common/NoData";
import "./richtexteditor.css";

export default function Page({ routines }: { routines: any }) {
  const [selected, setSelected] = useState({
    grade: routines[0].grade,
    exam: routines[0].exam,
  });
  const [routine, setRoutine] = useState(routines[0]);
  useEffect(() => {
    const routine = routines.find(
      (r: any) => r.grade === selected.grade && r.exam === selected.exam,
    );
    setRoutine(routine);
  }, [selected]);
  return (
    <section className="flex flex-col items-center justify-center gap-8 overflow-hidden rounded-md bg-gray-100 p-4  md:flex-row md:p-6 lg:p-8">
      <div className="w-full md:w-[490px] lg:w-[600px] xl:w-[600px]">
        <H2 className="text-center text-2xl font-semibold text-gray-800">
          Exam Routine
        </H2>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row ">
          <div>
            {/* <H4 className="text-primary">Select Class:</H4> */}
            <Select
              defaultValue="1"
              value={selected.grade}
              onValueChange={(val) => setSelected({ ...selected, grade: val })}
            >
              <SelectTrigger className="w-[200px] bg-white  ">
                <SelectValue placeholder="Select  grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Nursery">Nursery</SelectItem>
                  <SelectItem value="jkg">JKG</SelectItem>
                  <SelectItem value="skg">SKG</SelectItem>
                  <SelectItem value="1">One</SelectItem>
                  <SelectItem value="2">Two</SelectItem>
                  <SelectItem value="3">Three</SelectItem>
                  <SelectItem value="4">Four</SelectItem>
                  <SelectItem value="5">Five</SelectItem>
                  <SelectItem value="6">Six</SelectItem>
                  <SelectItem value="7">Seven</SelectItem>
                  <SelectItem value="8">Eight</SelectItem>
                  <SelectItem value="9">Nine</SelectItem>
                  <SelectItem value="10">Ten</SelectItem>
                  <SelectItem value="11">Eleven</SelectItem>
                  <SelectItem value="12">Twelve</SelectItem>
                  <SelectItem value="NEB_SEE">NEB SEE</SelectItem>
                  <SelectItem value="NEB_12">NEB 12</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              value={selected.exam}
              defaultValue="first_term_exam"
              onValueChange={(val) => setSelected({ ...selected, exam: val })}
            >
              <SelectTrigger className="w-[200px]  bg-white ">
                <SelectValue placeholder="Select exam type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="first_term_exam">
                    First Term Examination
                  </SelectItem>
                  <SelectItem value="second_term_exam">
                    Second Term Examination
                  </SelectItem>
                  <SelectItem value="third_term_exam">
                    Third Term Examination
                  </SelectItem>
                  <SelectItem value="final_term_exam">
                    Final Term Examination
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex justify-start sm:justify-center">
          {routine ? (
            <div className="mt-8  overflow-auto ">
              <div
                className="tiptap"
                dangerouslySetInnerHTML={{ __html: routine.table }}
              ></div>
            </div>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </section>
  );
}
