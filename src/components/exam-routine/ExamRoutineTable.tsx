"use client";
import React, { useEffect, useState } from "react";
import "./richtexteditor.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NoData from "../common/NoData";
import { Edit } from "lucide-react";
import Link from "next/link";

import ClassRoutineDelete from "../common/ClassRoutineDelete";

import { deleteExamRoutine } from "@/server/actions/examRoutine/examRoutine.action";

export default function ExamRoutineTable({ routines }: { routines: any }) {
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
    <section>
      <div>
        <div className="flex gap-4">
          <div>
            <Select
              defaultValue="1"
              value={selected.grade}
              onValueChange={(val) => setSelected({ ...selected, grade: val })}
            >
              <SelectTrigger className="w-[200px]  ">
                <SelectValue placeholder="Select  grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Nursery">Nursery</SelectItem>
                  <SelectItem value="lkg">LKG</SelectItem>
                  <SelectItem value="ukg">UKG</SelectItem>
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
              <SelectTrigger className="w-[200px]  ">
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
        {routine ? (
          <div className=" mt-8 min-w-[700px] overflow-auto">
            <div className=" mb-2 flex justify-end gap-2">
              <Link href={`/admin/documents/exam-routine/${routine._id}/edit`}>
                <Edit size={16} className=" text-primary" />
              </Link>

              <ClassRoutineDelete
                id={routine._id}
                deleteAction={deleteExamRoutine}
              />
            </div>
            <div
              className="tiptap"
              dangerouslySetInnerHTML={{ __html: routine.table }}
            ></div>
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </section>
  );
}
