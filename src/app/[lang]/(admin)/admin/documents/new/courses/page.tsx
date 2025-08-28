"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SyllabusSchema, TSyllabusSchemaForm } from "@/schemas/syllabus";
import { addSyllabus } from "@/server/actions/syllabus/syllabus.action";

const page = () => {
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TSyllabusSchemaForm>({
    resolver: zodResolver(SyllabusSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: TSyllabusSchemaForm) => {
    const { session, grade, pdf } = data;
    const formData = new FormData();
    formData.append("grade", grade);
    formData.append("session", session);
    formData.append("pdf", pdf);

    const response = await fetch("/api/syllabus", {
      method: "POST",
      body: formData,
    });
    const { url } = await response.json();
    const formdata = {
      grade: data.grade,
      session: data.session,
      pdf: url,
    };
    const res = await addSyllabus(formdata);
    toast({
      variant: res.success ? "success" : "destructive",
      title: res.success ? "New Student  Added !" : "Couldn't add syllabus.",
      description: res.message,
    });
    if (res.success) {
      return router.back();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-3">
      <div>
        <Label>Grade</Label>
        <Input placeholder="Eg: 1 or 2..." {...register("grade")} />
        <p className="text-xs text-red-500">
          {errors.grade && errors.grade.message}
        </p>
      </div>
      <div>
        <Label>Session</Label>
        <Input placeholder="Eg: 2080-2081" {...register("session")} />
        <p className="text-xs text-red-500">
          {errors.session && errors.session.message}
        </p>
      </div>

      <div className=" flex  flex-col gap-2">
        <Label className=" text-lg font-semibold">Add the Syllabus</Label>

        <input
          accept=".pdf, image/*, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setValue("pdf", e.target.files[0]);
              trigger("pdf");
            }
          }}
        />
        <p className="text-xs text-red-500">
          {errors.pdf && String(errors.pdf.message)}
        </p>
      </div>

      <Button disabled={isSubmitting} className="gap-x-2">
        {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : ""}
        Save
      </Button>
    </form>
  );
};

export default page;
