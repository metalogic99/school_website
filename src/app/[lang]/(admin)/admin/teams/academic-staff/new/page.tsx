"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { H3 } from "@/components/typography";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { teacherSchema, TTeacherForm } from "@/schemas/teacher.schema";
import { addNewTeacherMember } from "@/server/actions/teacher/teacher.action";
import { Label } from "@/components/ui/label";
import LabelWithAsterik from "@/components/LabelWithAsterik";

const page = () => {
  const { toast } = useToast();
  const [preview, setPreview] = useState<any>(null);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    watch,

    formState: { errors, isSubmitting },
  } = useForm<TTeacherForm>({
    resolver: zodResolver(teacherSchema),
  });

  useEffect(() => {
    setValue("isHead", false);
    trigger("isHead");
    setValue("status", "ongoing");
    trigger("status");
  }, []);
  const onSubmit = async (data: TTeacherForm) => {
    try {
      const folder = "teacher";
      const imgData = await CloudinaryUpload({ image, folder });
      const formdata = {
        fullname: data.fullname,
        phone: data.phone,
        qualification: data.qualification,
        appointment_date: data.appointment_date,
        retirement_date: data.retirement_date,
        status: data.status,
        rank: data.rank,
        address: data.address,
        type: data.type,
        grade: data.grade,
        designation: data.designation,
        isHead: data.isHead,
      };
      const res = await addNewTeacherMember(formdata, imgData);
      toast({
        variant: res.success ? "success" : "destructive",
        title: res.success
          ? "New Team Member Added !"
          : "Couldn't add new Member.",
        description: res.message,
      });
      if (res.success) {
        router.push("/admin/teams");
      }
    } catch (err) {
      console.log("errorororo", err);
    }
  };

  const selectedStatus = watch("status");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-xl space-y-4">
        <H3>Add a Member</H3>
        <div className=" space-y-4">
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
            accept=".pdf, image/*, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
                const previewUrl = URL.createObjectURL(e.target.files[0]);

                setPreview(previewUrl);
              }
            }}
          />
          <p className="text-xs text-red-500">
            {errors.image && String(errors.image.message)}
          </p>
        </div>
        <div>
          <LabelWithAsterik>Full Name</LabelWithAsterik>
          <Input {...register("fullname")} placeholder="Enter Full Name" />
          <p className="text-xs text-red-500">
            {errors.fullname && errors.fullname.message}
          </p>
        </div>
        {/* TYPE */}
        <div>
          <LabelWithAsterik>Type</LabelWithAsterik>
          <Select
            {...register("type")}
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
          <Input {...register("qualification")} placeholder="Eg: SEE passed" />

          <p className="text-xs text-red-500">
            {errors.qualification && errors.qualification.message}
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

        {/* POSITION */}
        <div>
          <LabelWithAsterik>Address</LabelWithAsterik>
          <Input {...register("address")} placeholder="Eg: Bhaktapur, Nepal" />

          <p className="text-xs text-red-500">
            {errors.address && errors.address.message}
          </p>
        </div>
        {/* STATUS */}
        <div>
          <LabelWithAsterik>Status</LabelWithAsterik>
          <RadioGroup
            defaultValue="ongoing"
            {...register("status")}
            onChange={(e: any) => {
              if (e.target.value === "ongoing") {
                setValue("status", "ongoing");
                trigger("status");
              } else if (e.target.value === "retired") {
                setValue("status", "retired");
                trigger("status");
              } else {
                setValue("status", "transfered");
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
        {/* IS HEAD OT NOT */}
        <div>
          <LabelWithAsterik>Is Head?</LabelWithAsterik>
          <RadioGroup
            defaultValue="no"
            {...register("isHead")}
            onChange={(e: any) => {
              if (e.target.value === "no") {
                setValue("isHead", false);
                trigger("isHead");
              } else {
                setValue("isHead", true);
                trigger("isHead");
              }
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="r1" />
              <Label>Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="r2" />
              <Label>No</Label>
            </div>
          </RadioGroup>

          <p className="text-xs text-red-500">
            {errors.isHead && errors.isHead.message}
          </p>
        </div>
      </div>
      <div className="my-4 text-white">
        <Button>
          {isSubmitting ? (
            <>
              <span className="flex gap-2">
                <Loader2 className="animate-spin" /> Adding Member
              </span>
            </>
          ) : (
            "Add Member"
          )}
        </Button>
      </div>
    </form>
  );
};

export default page;
