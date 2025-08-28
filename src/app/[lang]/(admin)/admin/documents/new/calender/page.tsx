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
import { CalenderSchema, TCalenderSchemaForm } from "@/schemas/calender.schema";
import { addCalender } from "@/server/actions/calender/calender.action";

const page = () => {
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TCalenderSchemaForm>({
    resolver: zodResolver(CalenderSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: TCalenderSchemaForm) => {
    const { title, year, pdf } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    formData.append("pdf", pdf);

    const response = await fetch("/api/calender", {
      method: "POST",
      body: formData,
    });
    const { url } = await response.json();
    const formdata = {
      title: data.title,
      year: data.year,
      pdf: url,
    };
    const res = await addCalender(formdata);
    toast({
      variant: res.success ? "success" : "destructive",
      title: res.success ? "New Calendar  Added !" : "Couldn't add calendar.",
      description: res.message,
    });
    if (res.success) {
      return router.back();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-3">
      <div>
        <Label>Title</Label>
        <Input placeholder="Eg: Academic Calendar " {...register("title")} />
        <p className="text-xs text-red-500">
          {errors.title && errors.title.message}
        </p>
      </div>
      <div>
        <Label>Year</Label>
        <Input placeholder="Eg: 2080-2081" {...register("year")} />
        <p className="text-xs text-red-500">
          {errors.year && errors.year.message}
        </p>
      </div>

      <div className=" flex  flex-col gap-2">
        <Label className=" text-lg font-semibold">Add the Calendar</Label>

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
