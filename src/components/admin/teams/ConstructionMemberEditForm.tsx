"use client";
import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ImageUploadBtn } from "@/components/ImageUploadBtn";
import { deleteCloudinaryImage } from "@/server/actions/gallery/upload.action";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";
import {
  constructionSchema,
  TConstructionForm,
} from "@/schemas/construction.schema";
import { editConstructionMember } from "@/server/actions/construction/construction.action";

const ConstructionMemberEditForm = ({ member }: { member: any }) => {
  const { toast } = useToast();
  const [img, setImg] = useState<File | null>(null);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TConstructionForm>({
    resolver: zodResolver(constructionSchema),

    defaultValues: {
      fullname: member.fullname,
      designation: member.designation,
      address: member.address,
      qualification: member.qualification,
      phone: member.phone,
      project_title: member.project_title,
      appointment_date: member.appointment_date,
      isHead: member.isHead,
      type: member.type,
    },
  });

  const onSubmit = async (data: TConstructionForm) => {
    const {
      fullname,
      designation,
      phone,
      appointment_date,
      address,
      qualification,
      type,
      project_title,
      isHead,
      image,
    } = data;
    if (img) {
      //1st delete old image
      await deleteCloudinaryImage(member.image.public_id);

      //now create new image
      const folder = "teams";
      const imgData = await CloudinaryUpload({ image: img, folder });
      const formdata = {
        fullname,
        designation,
        phone,
        project_title,
        appointment_date,
        address,
        qualification,
        type,
        isHead,
      };
      const res = await editConstructionMember(member.id, formdata, imgData);
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
    } else {
      const imgData = member.image;
      const formdata = {
        fullname,
        designation,
        project_title,
        phone,
        appointment_date,
        address,
        qualification,
        type,
        isHead,
      };
      const res = await editConstructionMember(member.id, formdata, imgData);
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
    }
  };

  useEffect(() => {
    setValue("isHead", member.isHead);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-xl space-y-4">
          <div>
            <ImageUploadBtn
              setImg={setImg}
              img={img}
              initialImage={member?.image?.secure_url}
            />
          </div>
          <div>
            <Label>Project Title</Label>
            <Input
              {...register("project_title")}
              placeholder="Enter Project Title"
            />
            <p className="text-xs text-red-500">
              {errors.project_title && errors.project_title.message}
            </p>
          </div>
          <div>
            <Label>Full Name</Label>
            <Input {...register("fullname")} placeholder="Enter Full Name" />
            <p className="text-xs text-red-500">
              {errors.fullname && errors.fullname.message}
            </p>
          </div>

          <div>
            <Label>Type</Label>
            <Select
              {...register("type")}
              defaultValue={member.type}
              onValueChange={(val) => {
                setValue("type", val);
                trigger("type");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="bod">Board of Director</SelectItem>
                  <SelectItem value="director">Director</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="academic_staff">Academic Staff</SelectItem>
                  <SelectItem value="non_academic_staff">
                    Non Academic Staff
                  </SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="examination">Examination</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="smc">S.M.C</SelectItem>
                  <SelectItem value="tpc">T.P.C</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-red-500">
              {errors.type && errors.type.message}
            </p>
          </div>
          {/* POSITION */}
          <div>
            <Label>Designation</Label>
            <Input {...register("designation")} placeholder="Eg: Chairman" />

            <p className="text-xs text-red-500">
              {errors.designation && errors.designation.message}
            </p>
          </div>
          {/* POSITION */}
          <div>
            <Label>Phone</Label>
            <Input {...register("phone")} placeholder="Eg: 98XXXXXXXX" />

            <p className="text-xs text-red-500">
              {errors.phone && errors.phone.message}
            </p>
          </div>
          <div>
            <Label>Appointment Date</Label>
            <Input
              type="date"
              {...register("appointment_date")}
              placeholder="address here"
            />

            <p className="text-xs text-red-500">
              {errors.appointment_date && errors.appointment_date.message}
            </p>
          </div>
          {/* POSITION */}
          <div>
            <Label>Qualification</Label>
            <Input
              {...register("qualification")}
              placeholder="Eg: SEE passed"
            />

            <p className="text-xs text-red-500">
              {errors.qualification && errors.qualification.message}
            </p>
          </div>
          {/* POSITION */}
          <div>
            <Label>Address</Label>
            <Input
              {...register("address")}
              placeholder="Eg: Bhaktapur, Nepal"
            />

            <p className="text-xs text-red-500">
              {errors.address && errors.address.message}
            </p>
          </div>
          {/* IS HEAD OT NOT */}

          <div>
            <Label>Is Head?</Label>
            <RadioGroup
              onValueChange={(val) => {
                if (val === "true") {
                  setValue("isHead", true);
                  trigger("isHead");
                } else {
                  setValue("isHead", false);
                  trigger("isHead");
                }
              }}
              {...register("isHead")}
              defaultValue={member.isHead ? "true" : "false"}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="r1" />
                <Label>Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="r2" />
                <Label>No</Label>
              </div>
            </RadioGroup>

            <p className="text-xs text-red-500">
              {errors.isHead && errors.isHead.message}
            </p>
          </div>
        </div>
        <div className="my-4">
          <Button>
            {isSubmitting ? (
              <>
                <span className="flex gap-2">
                  <Loader2 className="animate-spin" /> Editing member
                </span>
              </>
            ) : (
              "Edit Member"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConstructionMemberEditForm;
