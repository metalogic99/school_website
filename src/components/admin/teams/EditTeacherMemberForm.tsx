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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ImageUploadBtn } from "@/components/ImageUploadBtn";
import { deleteCloudinaryImage } from "@/server/actions/gallery/upload.action";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";
import { teacherSchema, TTeacherForm } from "@/schemas/teacher.schema";
import { editTeacherMember } from "@/server/actions/teacher/teacher.action";
import LabelWithAsterik from "@/components/LabelWithAsterik";
import { Label } from "@/components/ui/label";
const EditTeacherMemberForm = ({ member }: { member: any }) => {
  const { toast } = useToast();
  const [img, setImg] = useState<File | null>(null);
  // const [selectedStatus, setSelectedStatus] = useState(member.status);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TTeacherForm>({
    resolver: zodResolver(teacherSchema),

    defaultValues: {
      fullname: member.fullname,
      designation: member.designation,
      address: member.address,
      qualification: member.qualification,
      phone: member.phone,
      rank: member.rank,
      status: member.status,
      appointment_date: member.appointment_date,
      retirement_date: member.retirement_date,
      isHead: member.isHead,
      grade: member.grade,
      type: member.type,
    },
  });

  const onSubmit = async (data: TTeacherForm) => {
    const {
      fullname,
      designation,
      phone,
      appointment_date,
      retirement_date,
      address,
      qualification,
      type,
      grade,
      status,
      rank,
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
        status,
        grade,
        rank,
        retirement_date,
        appointment_date,
        address,
        qualification,
        type,
        isHead,
      };
      const res = await editTeacherMember(member.id, formdata, imgData);
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
        status,
        rank,
        phone,
        retirement_date,
        appointment_date,
        address,
        grade,
        qualification,
        type,
        isHead,
      };
      const res = await editTeacherMember(member.id, formdata, imgData);
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

  const selectedStatus = watch("status");
  useEffect(() => {
    setValue("isHead", member.isHead);
    setValue("status", member.status);
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
            <LabelWithAsterik>Full Name</LabelWithAsterik>
            <Input {...register("fullname")} placeholder="Enter Full Name" />
            <p className="text-xs text-red-500">
              {errors.fullname && errors.fullname.message}
            </p>
          </div>

          <div>
            <LabelWithAsterik>Type</LabelWithAsterik>
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
            <LabelWithAsterik>Designation</LabelWithAsterik>
            <Input {...register("designation")} placeholder="Eg: Chairman" />

            <p className="text-xs text-red-500">
              {errors.designation && errors.designation.message}
            </p>
          </div>
          {/* POSITION */}
          <div>
            <LabelWithAsterik>Phone</LabelWithAsterik>
            <Input {...register("phone")} placeholder="Eg: 98XXXXXXXX" />

            <p className="text-xs text-red-500">
              {errors.phone && errors.phone.message}
            </p>
          </div>
          {/* GRADE */}
          <div>
            <LabelWithAsterik>Grade </LabelWithAsterik>
            <Input {...register("grade")} placeholder="Eg: 1" />

            <p className="text-xs text-red-500">
              {errors.grade && errors.grade.message}
            </p>
          </div>
          <div>
            <LabelWithAsterik>Appointment Date</LabelWithAsterik>
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
            <LabelWithAsterik>Qualification</LabelWithAsterik>
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
            <LabelWithAsterik>Address</LabelWithAsterik>
            <Input
              {...register("address")}
              placeholder="Eg: Bhaktapur, Nepal"
            />

            <p className="text-xs text-red-500">
              {errors.address && errors.address.message}
            </p>
          </div>
          {/* RANK */}
          <div>
            <div className=" mb-1 flex items-center gap-2">
              <LabelWithAsterik>Rank</LabelWithAsterik>
              <div className=" group relative">
                <div className=" flex h-4 w-4  items-center justify-center rounded-full  bg-primary text-sm text-white ">
                  i
                </div>
                <div className="absolute bottom-6 hidden whitespace-nowrap rounded-lg bg-primary p-4 text-sm text-white group-hover:block">
                  <h3>"1" for the Principal</h3>
                  <h3>"2" for the Vice-Principal</h3>
                  <h3>"3" for the Teachers</h3>
                </div>
              </div>
            </div>
            <Input
              type="number"
              step={0}
              {...register("rank")}
              placeholder="Eg: SEE passed"
            />

            <p className="text-xs text-red-500">
              {errors.rank && errors.rank.message}
            </p>
          </div>
          {/* IS HEAD OT NOT */}
          {/* STATUS */}
          <div>
            <LabelWithAsterik>Status</LabelWithAsterik>
            <RadioGroup
              defaultValue={
                member.status === "ongoing"
                  ? "ongoing"
                  : member.status === "retired"
                    ? "retired"
                    : "transfered"
              }
              {...register("status")}
              onValueChange={(val) => {
                if (val === "ongoing") {
                  setValue("status", "ongoing");
                  trigger("status");
                } else if (val === "retired") {
                  setValue("status", val);
                  trigger("status");
                } else if (val === "transfered") {
                  setValue("status", val);
                  trigger("status");
                }
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ongoing" id="r1" />
                <Label>On Going</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="retired" id="r2" />
                <Label>Retired</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="transfered" id="r2" />
                <Label>Transfered</Label>
              </div>
            </RadioGroup>
            <p className="text-xs text-red-500">
              {errors.type && errors.type.message}
            </p>
          </div>
          {/* RETIREMENT DATE */}
          {selectedStatus === "retired" && (
            <div>
              <LabelWithAsterik>Retirement Date</LabelWithAsterik>
              <Input
                type="date"
                {...register("retirement_date")}
                placeholder="Retirement date here"
              />

              <p className="text-xs text-red-500">
                {errors.retirement_date && errors.retirement_date.message}
              </p>
            </div>
          )}

          <div>
            <LabelWithAsterik>Is Head?</LabelWithAsterik>
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

export default EditTeacherMemberForm;
