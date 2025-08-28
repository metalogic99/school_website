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
  const [selected, setSelected] = useState({ grade: "1", section: "a" });
  const [routine, setRoutine] = useState(routines[0]);

  useEffect(() => {
    const selectedRoutine = routines.find(
      (r: any) => r.grade === selected.grade && r.section === selected.section,
    );
    setRoutine(selectedRoutine);
  }, [selected, routines]);

  return (
    <section className="flex flex-col items-center justify-center gap-8 overflow-hidden rounded-md bg-gray-100 p-4  md:flex-row md:p-6 lg:p-8">
      <div className="w-full  md:w-[550px]  lg:w-[800px]  ">
        <H2 className="text-center text-2xl font-semibold text-gray-800">
          Class Routine
        </H2>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row ">
          <div>
            <Select
              defaultValue="1"
              value={selected.grade}
              onValueChange={(val) => setSelected({ ...selected, grade: val })}
            >
              <SelectTrigger className="w-[200px] rounded-md border border-gray-300 bg-white p-2">
                <SelectValue placeholder="Select grade" />
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
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              defaultValue="a"
              value={selected.section}
              onValueChange={(val: any) =>
                setSelected({ ...selected, section: val })
              }
            >
              <SelectTrigger className="w-[200px] rounded-md border border-gray-300 bg-white p-2">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="a">A</SelectItem>
                  <SelectItem value="b">B</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                  <SelectItem value="d">D</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex justify-start sm:justify-center">
          {routine ? (
            <div className="mt-8 overflow-auto">
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
