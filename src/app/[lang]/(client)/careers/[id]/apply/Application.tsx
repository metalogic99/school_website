"use client";
import React, { useState, useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { applicationSchema } from "@/schemas/application.schema";
import { useToast } from "@/components/ui/use-toast";

type TApplicationSchema = z.infer<typeof applicationSchema>;

import { Loader2 } from "lucide-react";

const Application = ({ jobId }: { jobId: string }) => {
  const { toast } = useToast();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TApplicationSchema>({
    resolver: zodResolver(applicationSchema),
  });

  useEffect(() => {
    setValue("vacancy", jobId);
  }, []);

  const onSubmit: SubmitHandler<TApplicationSchema> = async (data) => {
    const { vacancy, firstName, resume, lastName, email, contact } = data;

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("resume", resume[0]);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("vacancy", vacancy);

    const res = await fetch("/api/application", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) reset();
    toast({
      variant: res.status === 200 ? "success" : "destructive",
      title: res.status === 200 ? "Applied !!" : "Request failed !!",
      description: res.json().then((res) => res.message),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex flex-col gap-y-4 px-2 md:w-[60%]"
    >
      <h3 className="py-2 text-xl font-bold">Fill the form to apply</h3>
      <div className="flex gap-3">
        <div className="flex-1">
          <Label>First Name</Label>
          <Input {...register("firstName")} placeholder="Eg: John" />
          <p className="px-2 text-xs text-red-500">
            {errors.firstName ? errors.firstName.message : ""}
          </p>
        </div>
        <div className="flex-1">
          <Label>Last Name</Label>
          <Input {...register("lastName")} placeholder="Eg: Doe" />
          <p className="px-2 text-xs text-red-500">
            {errors.lastName ? errors.lastName.message : ""}
          </p>
        </div>
      </div>

      <div className="flex-1">
        <Label>Email</Label>
        <Input {...register("email")} placeholder="Eg: JohnDoe@gmail.com" />
        <p className="px-2 text-xs text-red-500">
          {errors.email ? errors.email.message : ""}
        </p>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Label>Contact</Label>
          <Input
            type="string"
            {...register("contact")}
            placeholder="Eg: 98xxxxxxxx"
          />
          <p className="px-2 text-xs text-red-500">
            {errors.contact ? errors.contact.message : ""}
          </p>
        </div>
      </div>

      <div>
        <Label>Upload CV </Label>
        <input
          className="block py-2"
          {...register("resume")}
          accept=".pdf, .doc, .docx, .txt"
          type="file"
        />
        <p className="px-2 text-xs text-red-500">
          {errors.resume?.message
            ? (errors.resume.message as React.ReactNode)
            : ""}
        </p>
      </div>

      <Button disabled={isSubmitting} size="lg" className="w-fit self-center">
        {isSubmitting ? (
          <span className="flex gap-2">
            <Loader2 className="animate-spin" />
            Submitting
          </span>
        ) : (
          "Submit Application"
        )}
      </Button>
    </form>
  );
};

export default Application;
