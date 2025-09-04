"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
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
import { teamSchema, TTeamForm } from "@/schemas/team.schema";
import { addNewTeamMember } from "@/server/actions/teams/teams.action";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { transform } from "next/dist/build/swc";

const page = () => {
  const { toast } = useToast();
  const params = useParams();
  const [preview, setPreview] = useState<any>(null);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    trigger,

    formState: { errors, isSubmitting },
  } = useForm<TTeamForm>({
    resolver: zodResolver(teamSchema),
  });

  useEffect(() => {
    setValue("isHead", false);
    trigger("isHead");
  }, []);
  const onSubmit = async (data: TTeamForm) => {
    try {
      const folder = "teams";
      const imgData = await CloudinaryUpload({ image, folder });
      const formdata = {
        fullname: data.fullname,
        phone: data.phone,
        qualification: data.qualification,
        appointment_date: data.appointment_date,
        address: data.address,
        type: data.type,
        designation: data.designation,
        isHead: data.isHead,
      };
      const res = await addNewTeamMember(formdata, imgData);
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
          <Label>Full Name</Label>
          <Input {...register("fullname")} placeholder="Enter Full Name" />
          <p className="text-xs text-red-500">
            {errors.fullname && errors.fullname.message}
          </p>
        </div>
        {/* TYPE */}
        {/* <div>
          <Label>Type</Label>
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
        </div> */}
        <div>
          <Label>Type</Label>
          <Select
            {...register("type")}
            defaultValue="finance"
            onValueChange={(val) => {
              setValue("type", val);
              trigger("type");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="finance">Finance</SelectItem>
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
          <Input {...register("qualification")} placeholder="Eg: SEE passed" />

          <p className="text-xs text-red-500">
            {errors.qualification && errors.qualification.message}
          </p>
        </div>
        {/* POSITION */}
        <div>
          <Label>Address</Label>
          <Input {...register("address")} placeholder="Eg: Bhaktapur, Nepal" />

          <p className="text-xs text-red-500">
            {errors.address && errors.address.message}
          </p>
        </div>
        {/* IS HEAD OT NOT */}
        <div>
          <Label>Is Head?</Label>
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
