"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDonor } from "@/server/actions/donors/donor.action";
import { singleDonor, TSingleDonorSchemaForm } from "@/schemas/donor.schema";
import { ImageUploadBtn } from "@/components/ImageUploadBtn";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";

const page = ({ params }: { params: { slug: string } }) => {
  console.log("params hai", params);
  const { slug } = params;
  const pathname = usePathname();
  const [img, setImg] = useState(null);
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TSingleDonorSchemaForm>({
    resolver: zodResolver(singleDonor),
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: TSingleDonorSchemaForm) => {
    const {
      fullname,
      address,
      phone,
      donation_type,
      donation_title,
      donation_amount,
    } = data;
    const folder = "donors";
    const imgData = await CloudinaryUpload({
      image: img,
      folder,
    });
    const formdata = {
      address,
      fullname,
      phone,
      donation_title,
      donation_amount,
      donation_type,
    };
    const res = await addDonor(formdata, imgData);
    toast({
      variant: res.success ? "success" : "destructive",
      title: res.success
        ? "New Donor has been created !"
        : "Couldn't add new donor.",
      description: res.message,
    });
    if (res.success) {
      reset();
      setImg(null);
      router.back();
    }
  };

  useEffect(() => {
    setValue("donation_type", slug);
    trigger("donation_type");
  }, []);

  const donationType = watch("donation_type");
  console.log("donation amounttt", donationType);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-3">
      <div>
        <ImageUploadBtn setImg={setImg} img={img} />
        <p className="text-xs text-red-500">
          {errors?.photo && String(errors.photo.message)}
        </p>
      </div>
      <div>
        <Label>Full name</Label>
        <Input placeholder="Enter donor's name" {...register("fullname")} />
        <p className="text-xs text-red-500">
          {errors.fullname && errors.fullname.message}
        </p>
      </div>
      <div>
        <Label>Address</Label>
        <Input placeholder="Enter donor's address" {...register("address")} />
        <p className="text-xs text-red-500">
          {errors.address && errors.address.message}
        </p>
      </div>
      <div>
        <Label>Phone no.</Label>
        <Input placeholder="Enter donor's phone no." {...register("phone")} />
        <p className="text-xs text-red-500">
          {errors.phone && errors.phone.message}
        </p>
      </div>
      {/* DONATION TYPE */}
      {/* <div>
        <Label>Donation Type</Label>
        <Select
          onValueChange={(val) => {
            setValue("donation_type", val);
            trigger("donation_type");
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="building">Building</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="computer">Computer</SelectItem>
              <SelectItem value="uniform">Uniform</SelectItem>
              <SelectItem value="akshyakosh">Akshyakosh</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-xs text-red-500">
          {errors.donation_type && errors.donation_type.message}
        </p>
      </div> */}

      {/* DONATION AMOUNT */}
      {slug === "akshyakosh" && (
        <div>
          <Label>Donation Amount</Label>
          <Input
            placeholder="Enter donation amount"
            {...register("donation_amount")}
          />
          <p className="text-xs text-red-500">
            {errors.donation_amount && errors.donation_amount.message}
          </p>
        </div>
      )}
      {/* OTHERS TITLE */}
      {slug === "others" && (
        <div>
          <Label>Donation Title</Label>
          <Input
            placeholder="Enter donation amount"
            {...register("donation_title")}
          />
          <p className="text-xs text-red-500">
            {errors.donation_title && errors.donation_title.message}
          </p>
        </div>
      )}

      <Button disabled={isSubmitting} className="gap-x-2">
        {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : ""}
        Save
      </Button>
    </form>
  );
};

export default page;
