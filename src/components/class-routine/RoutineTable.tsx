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
import { Edit, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import CommonDeleteButtonV2 from "../common/CommonDeleteButtonV2";
import { deleteClassRoutine } from "@/server/actions/classRoutine/classRoutine.action";
import ClassRoutineDelete from "../common/ClassRoutineDelete";

export default function RoutineTable({ routines }: { routines: any }) {
  const [selected, setSelected] = useState({ grade: "1", section: "a" });
  const [routine, setRoutine] = useState(routines[0]);

  useEffect(() => {
    const routine = routines.find(
      (r: any) => r.grade === selected.grade && r.section === selected.section,
    );
    setRoutine(routine);
  }, [selected]);
  return (
    <section>
      <div>
        <div className="grid grid-cols-3 gap-4 overflow-auto p-2">
          <div>
            {/* <H4 className="text-primary">Select Class:</H4> */}
            <Select
              defaultValue="1"
              value={selected.grade}
              onValueChange={(val) => setSelected({ ...selected, grade: val })}
            >
              <SelectTrigger className="w-full  ">
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
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            {/* <H4 className="text-primary">Select Section:</H4> */}
            <Select
              defaultValue="a"
              value={selected.section}
              onValueChange={(val: any) =>
                setSelected({ ...selected, section: val })
              }
            >
              <SelectTrigger className="w-full  ">
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
        {routine ? (
          <div className=" mt-8 min-w-[700px] overflow-auto">
            <div className=" mb-2 flex justify-end gap-2">
              <Link href={`/admin/documents/class-routine/${routine._id}/edit`}>
                <Edit size={16} className=" text-primary" />
              </Link>
              {/* <button onClick={()=>}>
                <Trash2 size={20} className=" text-destructive" />
              </button> */}
              <ClassRoutineDelete
                id={routine._id}
                deleteAction={deleteClassRoutine}
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
