"use client";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";
import SubmitButton from "@/components/common/SubmitButton";
import LabelWithAsterik from "@/components/LabelWithAsterik";
import { H2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  houseDivisionSchema,
  houseMemberSchema,
  THouseDivisionForm,
  THouseMemberSchemaForm,
} from "@/schemas/house.schema";
import { addHouseMember } from "@/server/actions/house/house.division.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function page() {
  const [preview, setPreview] = useState<any>(null);
  const [memberImage, setMemberImage] = useState<File | null>(null);
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
    reset,
    control,
    handleSubmit,
  } = useForm<THouseMemberSchemaForm>({
    resolver: zodResolver(houseMemberSchema),
    defaultValues: {
      role: "member",
    },
  });

  const onSubmit = async (data: THouseMemberSchemaForm) => {
    try {
      console.log("formdata", data);
      const folder = "house_member";
      const imgData = await CloudinaryUpload({
        image: memberImage,
        folder,
      });

      const formdata = {
        house_color: data.house_color,
        house_name: data.house_name,
        fullname: data.fullname,
        grade: data.grade,
        section: data.section,
        role: data.role,
      };
      const res = await addHouseMember(formdata, imgData);
      // let res = "dsad";
      const { message, error } = res;
      toast({
        variant: !error ? "success" : "destructive",
        title: !error ? message : error,
        description: res.message,
      });
      if (!error) {
        reset();
        setPreview(null);
        // router.back();
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: err.message || "Something went worong0",
      });
    }
  };

  const houseRole = watch("role");
  console.log("role hai", houseRole);
  console.log("form mo reroreor", errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className=" max-w-3xl space-y-4">
        {/* HOUSE BASIC DETAIL */}
        <div className=" w-full  ">
          <H2 className=" mb-4">House Member Details</H2>
          <div className=" flex w-full flex-col  gap-2">
            <div className=" w-full max-w-xl">
              <Label>House Color</Label>
              <Select
                {...register("house_color")}
                onValueChange={(val) => {
                  setValue("house_color", val);
                  trigger("house_color");
                }}
              >
                <SelectTrigger className=" max-w-xl">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="yellow">Yellow</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors?.house_color && (
                <p className="text-xs text-red-500">
                  {errors.house_color.message}
                </p>
              )}
            </div>
            <div className=" w-full  max-w-xl">
              <LabelWithAsterik>House Name</LabelWithAsterik>
              <Input
                {...register("house_name")}
                placeholder="Enter the house name"
              />
              {errors?.house_name && (
                <p className="text-xs text-red-500">
                  {errors.house_name.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <section className=" flex flex-col gap-4">
          {/* House Captain Detail */}
          <div className=" w-full max-w-xl">
            <div className=" w-full">
              <Label>Fullname</Label>
              <Input
                className=" w-full"
                {...register("fullname")}
                placeholder="enter your fullname"
              />
              {errors?.fullname && (
                <p className="text-xs text-red-500">
                  {errors.fullname.message}
                </p>
              )}
            </div>
            <div>
              <Label>Grade</Label>
              <Input {...register("grade")} placeholder="enter your grade" />
              {errors?.grade && (
                <p className="text-xs text-red-500">{errors.grade.message}</p>
              )}
            </div>
            <div>
              <Label>Section</Label>
              <Input
                {...register("section")}
                placeholder="enter your section"
              />
              {errors?.section && (
                <p className="text-xs text-red-500">{errors.section.message}</p>
              )}
            </div>
            {/* role select */}
            <div>
              <Label>Section</Label>
              <RadioGroup
                {...register("role")}
                onValueChange={(val) => {
                  setValue("role", val);
                  trigger("role");
                  console.log(val);
                }}
                defaultValue="member"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="member" id="member" />
                  <Label htmlFor="member">Member</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="captain" id="captain" />
                  <Label htmlFor="captain">Captain</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vice_captain" id="vice_captain" />
                  <Label htmlFor="vice_captain">Vice Captain</Label>
                </div>
              </RadioGroup>
              {errors?.role && (
                <p className="text-xs text-red-500">{errors.role.message}</p>
              )}
            </div>
          </div>
          {/* IMage uplaod */}
          {(houseRole === "captain" || houseRole === "vice_captain") && (
            <div className=" mt-4 space-y-4">
              {preview && (
                <div>
                  <img
                    src={preview}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="mt-2 h-40 w-40 max-w-full rounded-full   border object-cover "
                  />
                </div>
              )}
              <input
                className=" w-[200px] overflow-hidden"
                accept=".pdf, image/*, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setMemberImage(e.target.files[0]);
                    const previewUrl = URL.createObjectURL(e.target.files[0]);
                    setValue("photo", e.target.files[0]);
                    trigger("photo");
                    setPreview(previewUrl);
                  }
                }}
              />
              <p className="text-xs text-red-500">
                {errors?.photo && String(errors.photo.message)}
              </p>
            </div>
          )}
        </section>

        <SubmitButton isSubmitting={isSubmitting} title="Submit" />
        {/* <SubmitBtn /> */}
      </form>
    </div>
  );
}
