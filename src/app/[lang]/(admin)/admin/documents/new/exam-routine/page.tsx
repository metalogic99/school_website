"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import dynamic from "next/dynamic";
import {
  examRoutineSchema,
  TExamRoutineForm,
} from "@/schemas/exam.routine.schema";
import { addExamRoutine } from "@/server/actions/examRoutine/examRoutine.action";

const page = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TExamRoutineForm>({
    resolver: zodResolver(examRoutineSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setValue("grade", "1");
    trigger("grade");
    setValue("exam", "a");
    trigger("exam");
  }, []);

  const onSubmit = async (data: TExamRoutineForm) => {
    const { exam, grade, table } = data;

    const res = await addExamRoutine(data);
    toast({
      variant: res.success ? "success" : "destructive",
      title: res.success ? "New Routine Added !" : "Couldn't add routine.",
      description: res.message,
    });
    // if (res.success) {
    //   return router.back();
    // }
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
              <SelectItem value="NEB_SEE">NEB SEE</SelectItem>
              <SelectItem value="NEB_12">NEB 12</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-xs text-red-500">
          {errors.grade && errors.grade.message}
        </p>
      </div>
      <div>
        <LabelWithAsterik>Exam Type</LabelWithAsterik>
        <Select
          {...register("exam")}
          defaultValue="first_term_exam"
          onValueChange={(val: any) => {
            setValue("exam", val);
            trigger("exam");
          }}
        >
          <SelectTrigger className="w-full  ">
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
        <p className="text-xs text-red-500">
          {errors.exam && errors.exam.message}
        </p>
      </div>

      <div>
        <LabelWithAsterik>Routine Table</LabelWithAsterik>
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

export default page;
