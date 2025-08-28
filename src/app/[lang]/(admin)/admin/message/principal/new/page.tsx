"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { H3 } from "@/components/typography";

import { useEffect, useState } from "react";
import Editor from "@/components/editor";
// import { messsageSchema, TMessageForm } from "@/schemas/message.schema";
// import { addMessage } from "@/server/actions/messages/chairman.messages.action";
import { getDynamicSignature } from "@/server/actions/gallery/upload.action";
import {
  PrincipalMesssageSchema,
  TPrincipalMessageForm,
} from "@/schemas/principal.message.schema";
import { addPrincipalMessage } from "@/server/actions/messages/principal.messages.action";

const page = () => {
  const { toast } = useToast();
  const [preview, setPreview] = useState<any>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TPrincipalMessageForm>({
    resolver: zodResolver(PrincipalMesssageSchema),
  });

  const handleImageUpload = async () => {
    const folder = "messages";
    if (image) {
      const { timestamp, signature } = await getDynamicSignature(folder);
      const formData = new FormData();
      formData.append("file", image);

      const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp.toString());
      formData.append("folder", folder);

      const res = await fetch(endpoint, { method: "POST", body: formData });
      if (res.ok) {
        const res_data = await res.json();
        return res_data;
      } else {
        throw new Error("Couldn't upload image.");
      }
    }
  };

  useEffect(() => {
    setValue("message", msg);
    if (msg.length > 0) {
      trigger("message");
    }
  }, [msg]);
  const onSubmit = async (data: TPrincipalMessageForm) => {
    const imgRes = await handleImageUpload();
    const res = await addPrincipalMessage(data, imgRes);
    toast({
      variant: res.success ? "success" : "destructive",
      title: res.success ? "New Message Added !" : "Couldn't add the Message.",
      description: res.message,
    });
    if (res.success) {
      router.back();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-xl space-y-4">
        <H3 className=" font-semibold">Add Message</H3>
        <div className=" space-y-4">
          {preview && (
            <div>
              <Label>Preview</Label>
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
            {/* {errors.doc && String(errors.doc.message)} */}
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
          <Label>Phone No.</Label>
          <Input {...register("phone")} placeholder="Eg: 98XXXXXXX" />
          <p className="text-xs text-red-500">
            {errors.phone && errors.phone.message}
          </p>
        </div>
        <div>
          <Label>Email</Label>
          <Input {...register("email")} placeholder="Enter your email" />
          <p className="text-xs text-red-500">
            {errors.email && errors.email.message}
          </p>
        </div>
        <div>
          <Label>Message</Label>
          <Editor value={msg} setValue={setMsg} />

          <p className="text-xs text-red-500">
            {errors.message && errors.message.message}
          </p>
        </div>
      </div>
      <div className="my-4 text-white">
        <Button>
          {isSubmitting ? (
            <>
              <span className="flex gap-2">
                <Loader2 className="animate-spin" /> Adding Message
              </span>
            </>
          ) : (
            "Add Message"
          )}
        </Button>
      </div>
    </form>
  );
};

export default page;
