"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TDocumentForm, documentSchema } from "@/schemas/document.schema";

const page = () => {
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TDocumentForm>({
    resolver: zodResolver(documentSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: TDocumentForm) => {
    const { title, doc } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("doc", doc);

    const res = await fetch("/api/docs", { method: "POST", body: formData });

    toast({
      variant: res.ok ? "success" : "destructive",
      title: res.ok ? "Success !!" : "Failed !!",
      description: res.json().then((res) => res.message),
    });
    if (res.ok) {
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

      <div>
        <input
          accept=".pdf, image/*, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setValue("doc", e.target.files[0]);
              trigger("doc");
            }
          }}
        />
        <p className="text-xs text-red-500">
          {errors.doc && String(errors.doc.message)}
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
