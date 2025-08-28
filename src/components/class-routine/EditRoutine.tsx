"use client";
import "./richtexteditor.css";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const RichTextEditor = dynamic(
  () => import("@/components/common/RichTextEditor"),
  { ssr: false },
);
import LabelWithAsterik from "@/components/LabelWithAsterik";
import {
  classRoutineSchema,
  TClassRoutineForm,
} from "@/schemas/class.routine.schema";
import dynamic from "next/dynamic";
import {
  addClassRoutine,
  updateClassRoutine,
} from "@/server/actions/classRoutine/classRoutine.action";

const EditRoutine = ({ routine, id }: { routine: any; id: string }) => {
  const {
    handleSubmit,
    register,
    watch,

    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TClassRoutineForm>({
    resolver: zodResolver(classRoutineSchema),
    defaultValues: {
      section: routine.section,
      grade: routine.grade,
      table: routine.table,
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: TClassRoutineForm) => {
    const { section, grade, table } = data;

    const res = await updateClassRoutine(id, data);
    toast({
      variant: res.success ? "success" : "destructive",
      title: res.success ? "Udpated Routine  !" : "Couldn't update routine.",
      description: res.message,
    });
    if (res.success) {
      return router.back();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl space-y-3">
      <div>
        <LabelWithAsterik>Grade</LabelWithAsterik>
        <Select
          {...register("grade")}
          defaultValue="1"
          // value={selected.grade}
          onValueChange={(val) => {
            setValue("grade", val);
            trigger("grade");
          }}
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
              <SelectItem value="11">Eleven</SelectItem>
              <SelectItem value="12">Twelve</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-xs text-red-500">
          {errors.grade && errors.grade.message}
        </p>
      </div>
      <div>
        <LabelWithAsterik>Section</LabelWithAsterik>
        <Select
          {...register("section")}
          defaultValue="a"
          onValueChange={(val: any) => {
            setValue("section", val);
            trigger("section");
          }}
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
        <p className="text-xs text-red-500">
          {errors.section && errors.section.message}
        </p>
      </div>
      <div>
        <LabelWithAsterik>Description</LabelWithAsterik>
        <RichTextEditor
          value={watch("table")}
          setValue={setValue}
          trigger={trigger}
          name="table"
          modules={["table"]}
        />
        {/* <FormErr>{errors.about?.message}</FormErr> */}
      </div>

      <Button disabled={isSubmitting} className="gap-x-2">
        {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : ""}
        Save
      </Button>
    </form>
  );
};

export default EditRoutine;
