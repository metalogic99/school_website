"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { H3 } from "@/components/typography";
import { useState } from "react";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";
import { batchSchema, TBatchForm } from "@/schemas/batch.schema";
import { Label } from "@/components/ui/label";
import { addBatchStudent } from "@/server/actions/batch/batch.action";

const page = () => {
  const { toast } = useToast();
  const [preview, setPreview] = useState<any>(null);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TBatchForm>({
    resolver: zodResolver(batchSchema),
  });

  const onSubmit = async (data: TBatchForm) => {
    try {
      const folder = "batch";
      const imgData = await CloudinaryUpload({ image, folder });
      const formdata = {
        fullname: data.fullname,
        gpa: data.gpa,
        passedYear: data.passedYear,
      };
      const res = await addBatchStudent(formdata, imgData);
      toast({
        variant: res.success ? "success" : "destructive",
        title: res.success
          ? "New Student  Added !"
          : "Couldn't add new Student.",
        description: res.message,
      });
      if (res.success) {
        router.push("/admin/batch");
      }
    } catch (err) {
      console.log("errorororo", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-xl space-y-4">
        <H3>Add a Student</H3>
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

        {/* gpa */}
        <div>
          <Label>GPA</Label>
          <Input
            {...register("gpa", { valueAsNumber: true })}
            type="number"
            step="0.01"
            // pattern="[0-4]"
            placeholder="Eg: 3.65"
          />

          <p className="text-xs text-red-500">
            {errors.gpa && errors.gpa.message}
          </p>
        </div>

        {/* Batch */}
        <div>
          <Label>Passed Out Year</Label>
          <Input
            {...register("passedYear")}
            type="number"
            placeholder="Eg: 2080"
          />

          <p className="text-xs text-red-500">
            {errors.passedYear && errors.passedYear.message}
          </p>
        </div>
      </div>
      <div className="my-4 text-white">
        <Button>
          {isSubmitting ? (
            <>
              <span className="flex gap-2">
                <Loader2 className="animate-spin" /> Adding Student
              </span>
            </>
          ) : (
            "Add Student"
          )}
        </Button>
      </div>
    </form>
  );
};

export default page;
