"use client";
import { Input } from "@/components/ui/input";
import React, { FormEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { H1 } from "@/components/typography";

import { getSignatureNotice } from "@/server/actions/gallery/upload.action";

import { createPopupNotice } from "@/server/actions/notice/popup.action";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [file, setFile] = useState<File | null>();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { timestamp, signature } = await getSignatureNotice();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
        formData.append("signature", signature);
        formData.append("timestamp", timestamp.toString());
        formData.append("folder", "notice");

        const cloud_res = await fetch(
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!,
          {
            method: "POST",
            body: formData,
          },
        );

        if (cloud_res.ok) {
          const { public_id, secure_url } = await cloud_res.json();
          const { message, success } = await createPopupNotice(
            title,
            public_id,
            secure_url,
          );
          toast({
            variant: success ? "success" : "destructive",
            title: success ? "Successful !!" : "Failed !!",
            description: message,
          });
          if (success) router.back();
        }
      } catch (err) {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Couldn't upload image!!",
          description: "Please contact to relevant party.",
        });
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-4">
      <div>
        <H1>Popup Notice</H1>
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:gap-5">
        <div>
          <Label>
            Title
            <span className="text-xs text-neutral-400">
              (This will be displayed in admin panel.)
            </span>
          </Label>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="Title for the popup notice"
          />
        </div>
      </div>
      <input
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
        name="file"
        type="file"
      />

      <Button disabled={loading} className="flex gap-2">
        {loading && <Loader2 className="animate-spin" />} Add Popup Notice
      </Button>
    </form>
  );
};

export default page;
