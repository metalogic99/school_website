"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { ImageUploadBtn } from "@/components/ImageUploadBtn";
import { deleteCloudinaryImage } from "@/server/actions/gallery/upload.action";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";
import { TBatchForm, batchSchema } from "@/schemas/batch.schema";
import { editBatchStudent } from "@/server/actions/batch/batch.action";

const EditBatchForm = ({ student }: { student: any }) => {
  const { toast } = useToast();
  const [img, setImg] = useState<File | null>(null);

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TBatchForm>({
    resolver: zodResolver(batchSchema),

    defaultValues: {
      fullname: student.fullname,
      gpa: student.gpa,
      passedYear: student.passedYear,
    },
  });

  const onSubmit = async (data: TBatchForm) => {
    if (img) {
      //1st delete old image
      await deleteCloudinaryImage(student.image.public_id);

      //now create new image
      const folder = "batch";
      const imgData = await CloudinaryUpload({ image: img, folder });
      const formdata = {
        fullname: data.fullname,
        gpa: data.gpa,
        passedYear: data.passedYear,
      };
      const res = await editBatchStudent(student.id, formdata, imgData);
      toast({
        variant: res.success ? "success" : "destructive",
        title: res.success
          ? "Student Detail has been Updated !"
          : "Couldn't update the student details !",
        description: res.message,
      });
      if (res.success) {
        router.push(`/admin/batch/${student.passedYear}`);
      }
    } else {
      const imgData = student.image;
      const formdata = {
        fullname: data.fullname,
        gpa: data.gpa,
        passedYear: data.passedYear,
      };
      const res = await editBatchStudent(student.id, formdata, imgData);
      toast({
        variant: res.success ? "success" : "destructive",
        title: res.success
          ? "Student Detail has been Updated!"
          : "Couldn't update the student details !",
        description: res.message,
      });
      if (res.success) {
        router.push(`/admin/batch/${student.passedYear}`);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-xl space-y-4">
          <div>
            <ImageUploadBtn
              setImg={setImg}
              img={img}
              initialImage={student?.image?.secure_url}
            />
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
        <div className="my-4">
          <Button>
            {isSubmitting ? (
              <>
                <span className="flex gap-2">
                  <Loader2 className="animate-spin" /> Editing Message
                </span>
              </>
            ) : (
              "Edit Message"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBatchForm;
