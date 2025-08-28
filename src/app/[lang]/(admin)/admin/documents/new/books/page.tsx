"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";
import { addYearlyBook } from "@/server/actions/yearlyBook/yearlybook.action";
import { TYearlyBookForm, yearlyBookSchema } from "@/schemas/yearlyBook.schema";

const page = () => {
  const [preview, setPreview] = useState<any>(null);
  const [image, setImage] = useState<File | null>(null);

  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TYearlyBookForm>({
    resolver: zodResolver(yearlyBookSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: TYearlyBookForm) => {
    const { title, book, image } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("book", book);
    formData.append("image", image);

    const response = await fetch("/api/docs", {
      method: "POST",
      body: formData,
    });
    const { url } = await response.json();
    const folder = "book";
    const imgData = await CloudinaryUpload({ image, folder });

    const formdata = {
      title: data.title,
      book: url,
    };
    const res = await addYearlyBook(formdata, imgData);
    toast({
      variant: res.success ? "success" : "destructive",
      title: res.success
        ? "New book has been added !"
        : "Couldn't add new Book.",
      description: res.message,
    });
    if (res.success) {
      return router.back();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-3">
      <div>
        <Label>Title</Label>
        <Input placeholder="Eg: Annual Report 2080" {...register("title")} />
        <p className="text-xs text-red-500">
          {errors.title && errors.title.message}
        </p>
      </div>

      <div className=" flex  flex-col gap-2">
        <Label className=" text-lg font-semibold">Add the book</Label>

        <input
          accept=".pdf, image/*, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setValue("book", e.target.files[0]);
              trigger("book");
            }
          }}
        />
        <p className="text-xs text-red-500">
          {errors.book && String(errors.book.message)}
        </p>
      </div>
      <div className=" flex flex-col space-y-4">
        <Label className=" text-lg font-semibold">Add a Thumbnail</Label>

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
              setValue("image", e.target.files[0]);
              trigger("image");
              const previewUrl = URL.createObjectURL(e.target.files[0]);

              setPreview(previewUrl);
            }
          }}
        />
        <p className="text-xs text-red-500">
          {errors.image && String(errors.image.message)}
        </p>
      </div>
      <Button disabled={isSubmitting} className="gap-x-2">
        {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : ""}
        Save
      </Button>
    </form>
  );
};

export default page;
