"use client";
import { H2 } from "@/components/typography";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
  RegistrationSchema,
  TRegistrationForm,
} from "@/schemas/registration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addStudentRegistration } from "@/server/actions/registration/registration.action";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import LabelWithAsterik from "@/components/LabelWithAsterik";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";
import SubmitButton from "@/components/common/SubmitButton";
import { Label } from "@/components/ui/label";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";

export default function page() {
  const { lang } = useParams();
  const [img, setImg] = useState();
  const [certificate, setCertificate] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm<TRegistrationForm>({
    resolver: zodResolver(RegistrationSchema),
  });

  const onSubmit = async (data: TRegistrationForm) => {
    try {
      setLoading(true);
      const {
        fullname,
        grade,
        gender,
        permanentaddress,
        presentaddress,
        fathername,
        mothername,
        fatherphone,
        email,
        guardian_name,
        guardian_phone,
        motherphone,
        dob,
      } = data;
      const folder = "registration";
      const imgRes = await CloudinaryUpload({ image: img, folder });
      const birthCertificateImg = await CloudinaryUpload({
        image: certificate,
        folder,
      });
      const formdata = {
        fullname,
        gender,
        grade,
        permanentaddress,
        presentaddress,
        email,
        guardian_name,
        guardian_phone,
        fathername,
        mothername,
        fatherphone,
        motherphone,
        dob,
      };
      const res = await addStudentRegistration(
        formdata,
        imgRes,
        birthCertificateImg,
      );

      toast({
        variant: res.success ? "success" : "destructive",
        title: res.success
          ? "Thank you for your Registration"
          : "Something went wrong!",
        description: res.message,
      });
      if (res.success) {
        router.back();
        setLoading(false);
      }
    } catch (Err) {
      console.log(Err);
      if (Err) {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className=" mx-auto my-10  rounded-xl  bg-blue-50 p-6 text-slate-700 shadow-lg sm:max-w-6xl">
        <H2 className=" mb-6  text-center  text-primary">
          {lang === "en"
            ? "Fill up the Application Form"
            : "आवेदन फारम भर्नुहोस्"}
        </H2>
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className=" space-y-1">
              <LabelWithAsterik>Full name</LabelWithAsterik>
              <Input
                {...register("fullname")}
                placeholder="Enter your full name"
              />
              <p className="text-xs text-red-500">
                {errors.fullname && errors.fullname.message}
              </p>
            </div>
            <div className=" space-y-1">
              <LabelWithAsterik>Date of Birth</LabelWithAsterik>
              {/* <Input {...register("dob")} type="date" /> */}
              <div className=" rounded-md  border shadow-sm">
                <NepaliDatePicker
                  inputClassName="form-control"
                  className=" w-full bg-transparent"
                  value={"2000-01-01"}
                  onChange={(value: string) => {
                    setValue("dob", value);
                    trigger("dob");
                  }}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
              </div>
              <p className="text-xs text-red-500">
                {errors.dob && errors.dob.message}
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className=" space-y-1">
              <LabelWithAsterik>Grade</LabelWithAsterik>
              <Select
                {...register("grade")}
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
                    <SelectItem value="one">1</SelectItem>
                    <SelectItem value="two">2</SelectItem>
                    <SelectItem value="Three">3</SelectItem>
                    <SelectItem value="Four">4</SelectItem>
                    <SelectItem value="Five">5</SelectItem>
                    <SelectItem value="Six">6</SelectItem>
                    <SelectItem value="Seven">7</SelectItem>
                    <SelectItem value="Eight">8</SelectItem>
                    <SelectItem value="Nine">9</SelectItem>
                    <SelectItem value="Ten">10</SelectItem>
                    <SelectItem value="Eleven">11</SelectItem>
                    <SelectItem value="Twelve">12</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-xs text-red-500">
                {errors.grade && errors.grade.message}
              </p>
            </div>
            <div className=" space-y-1">
              <LabelWithAsterik>Gender</LabelWithAsterik>
              <Select
                {...register("gender")}
                onValueChange={(val) => {
                  setValue("gender", val);
                  trigger("gender");
                }}
              >
                <SelectTrigger className="w-full  ">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="m">Male</SelectItem>
                    <SelectItem value="f">Female</SelectItem>
                    <SelectItem value="o">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-xs text-red-500">
                {errors.gender && errors.gender.message}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className=" space-y-1">
              <LabelWithAsterik>Present Address</LabelWithAsterik>
              <Input
                {...register("presentaddress")}
                placeholder="Enter your present address"
              />
              <p className="text-xs text-red-500">
                {errors.presentaddress && errors.presentaddress.message}
              </p>
            </div>
            <div className=" space-y-1">
              <LabelWithAsterik> Permanent Address</LabelWithAsterik>
              <Input
                {...register("permanentaddress")}
                placeholder="Enter your permanent address"
              />
              <p className="text-xs text-red-500">
                {errors.permanentaddress && errors.permanentaddress.message}
              </p>
            </div>
          </div>
          {/* FATHERS DETAIL */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className=" space-y-1">
              <LabelWithAsterik>Father's Name</LabelWithAsterik>
              <Input
                {...register("fathername")}
                placeholder="Enter your father's name"
              />
              <p className="text-xs text-red-500">
                {errors.fathername && errors.fathername.message}
              </p>
            </div>
            <div className=" space-y-1">
              <LabelWithAsterik>Father's Phone</LabelWithAsterik>
              <Input
                {...register("fatherphone")}
                placeholder="Enter your father's phone"
              />
              <p className="text-xs text-red-500">
                {errors.fatherphone && errors.fatherphone.message}
              </p>
            </div>
          </div>
          {/* MOTHERS DETAIL */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className=" space-y-1">
              <LabelWithAsterik>Mother's Name</LabelWithAsterik>
              <Input
                {...register("mothername")}
                placeholder="Enter your mother's name"
              />
              <p className="text-xs text-red-500">
                {errors.mothername && errors.mothername.message}
              </p>
            </div>
            <div className=" space-y-1">
              <LabelWithAsterik>Mother's Phone</LabelWithAsterik>
              <Input
                {...register("motherphone")}
                placeholder="Enter your mother's phone"
              />
              <p className="text-xs text-red-500">
                {errors.motherphone && errors.motherphone.message}
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className=" space-y-1">
              <Label>Guardian's Name</Label>
              <Input
                {...register("guardian_name")}
                placeholder="Enter your father's name"
              />
              <p className="text-xs text-red-500">
                {errors.guardian_name && errors.guardian_name.message}
              </p>
            </div>
            <div className=" space-y-1">
              <Label>Guardian's Phone</Label>
              <Input
                {...register("guardian_phone")}
                placeholder="Enter your father's phone"
              />
              <p className="text-xs text-red-500">
                {errors.guardian_phone && errors.guardian_phone.message}
              </p>
            </div>
            <div className=" space-y-1">
              <Label>Email</Label>
              <Input {...register("email")} placeholder="Enter your email" />
              <p className="text-xs text-red-500">
                {errors.email && errors.email.message}
              </p>
            </div>
          </div>
          {/* PHOTOS */}
          <div className=" grid gap-4 sm:grid-cols-2">
            <div className=" space-y-1">
              <LabelWithAsterik>Passport Size Photo</LabelWithAsterik>
              <Input
                type="file"
                accept=" image/*"
                onChange={(e: any) => {
                  if (e.target.files) {
                    setImg(e.target.files[0]);
                    setValue("photo", e.target.files[0]);
                    trigger("photo");
                  }
                }}
                placeholder="Upload your passport size photo"
              />
              <p className="text-xs text-red-500">
                {errors.photo &&
                  typeof errors.photo.message === "string" &&
                  errors.photo.message}
              </p>
            </div>
            <div className=" space-y-1">
              <LabelWithAsterik>Birth Ceritificate Photo</LabelWithAsterik>
              <Input
                type="file"
                accept=" image/*"
                onChange={(e: any) => {
                  if (e.target.files) {
                    setCertificate(e.target.files[0]);
                    setValue("birth_certificate", e.target.files[0]);
                    trigger("birth_certificate");
                  }
                }}
                placeholder="Upload your passport size photo"
              />
              <p className="text-xs text-red-500">
                {errors.birth_certificate &&
                  typeof errors.birth_certificate.message === "string" &&
                  errors.birth_certificate.message}
              </p>
            </div>
          </div>
          <div className=" grid place-items-end">
            <SubmitButton title="Submit" isSubmitting={loading} />
          </div>
        </form>
      </div>
    </div>
  );
}
