"use client";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";
import { ImageUploadBtn } from "@/components/ImageUploadBtn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { singleDonor, TSingleDonorSchemaForm } from "@/schemas/donor.schema";
import { editDonor } from "@/server/actions/donors/donor.action";
import { deleteCloudinaryImage } from "@/server/actions/gallery/upload.action";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditDonorForm({ member }: { member: any }) {
  const [preview, setPreview] = useState<any>(null);
  const [memberImage, setMemberImage] = useState<File | null>(null);
  const router = useRouter();
  const [img, setImg] = useState<File | null>(null);

  const { slug } = useParams();
  console.log("edt ko parmas ", slug);
  console.log("prams ko type ", typeof slug);
  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
    control,
    handleSubmit,
  } = useForm<TSingleDonorSchemaForm>({
    resolver: zodResolver(singleDonor),
    defaultValues: {
      fullname: member.fullname,
      address: member.address,
      phone: member.phone,
      donation_type: String(slug),
      donation_amount: member.donation_amount,
      donation_title: member.donation_title,
    },
  });

  useEffect(() => {
    setValue("donation_type", String(slug));
    trigger("donation_type");
  }, []);

  const onSubmit = async (data: TSingleDonorSchemaForm) => {
    try {
      console.log("formdata", data);
      const {
        fullname,
        address,
        phone,
        donation_type,
        donation_title,
        donation_amount,
      } = data;
      let res;
      const formdata = {
        fullname,
        address,
        phone,
        donation_type,
        donation_title,
        donation_amount,
      };
      if (img) {
        await deleteCloudinaryImage(member.photo.public_id);
        const folder = "house_member";
        const imgData = await CloudinaryUpload({ image: img, folder });
        res = await editDonor(member._id, formdata, imgData);
      } else {
        //old photo
        let imgData;
        imgData = member.photo;
        res = await editDonor(member._id, formdata, imgData);
      }

      toast({
        variant: res.success ? "success" : "destructive",
        title: res.success
          ? "Member Detail Updated !"
          : "Couldn't update the member !",
        description: res.message,
      });
      if (res.success) {
        router.back();
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: err.message || "Something went worong0",
      });
    }
  };

  const donationType = watch("donation_type");
  console.log("form mo reroreor", errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-3">
        <div>
          <ImageUploadBtn
            setImg={setImg}
            img={img}
            initialImage={member.photo.secure_url}
          />
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

        {/* DONATION AMOUNT */}
        {donationType === "akshyakosh" && (
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
        {donationType === "others" && (
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
    </div>
  );
}
