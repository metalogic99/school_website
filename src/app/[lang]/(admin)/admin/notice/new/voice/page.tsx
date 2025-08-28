"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  TVoiceNoticeSchema,
  voiceNoticeSchema,
} from "@/schemas/voicenotice.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addVoiceNotice } from "@/server/actions/voiceNotice/voiceNotice.action";

const page = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TVoiceNoticeSchema>({
    resolver: zodResolver(voiceNoticeSchema),
  });

  const onSubmit = async (data: TVoiceNoticeSchema) => {
    const { title, voice } = data;
    const fd = new FormData();
    fd.append("title", title);
    fd.append("voice", voice);

    const res = await fetch("/api/voice", {
      method: "POST",
      body: fd,
    });

    const { url } = await res.json();
    const formdata = {
      title,
      voice: url,
    };
    const ress = await addVoiceNotice(formdata);
    toast({
      variant: ress.success ? "success" : "destructive",
      title: ress.success
        ? "New Voice Notice has been added !"
        : "Couldn't add new voice notice.",
      description: ress.message,
    });
    if (ress.success) {
      return router.back();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-4">
      <div>
        <H1>Voice Notice</H1>
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
            {...register("title")}
            name="title"
            placeholder="Title for the voice notice"
          />
          <p className="text-xs text-red-500">
            {errors.title && String(errors.title.message)}
          </p>
        </div>
      </div>

      {/* VOICE MMESSAGE */}
      <div className=" flex  flex-col gap-2">
        <Label className=" text-lg font-semibold">Add a voice notice</Label>

        <input
          accept=".mp3, .wav, .ogg"
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setValue("voice", e.target.files[0]);
              trigger("voice");
            }
          }}
        />
        <p className="text-xs text-red-500">
          {errors.voice && String(errors.voice.message)}
        </p>
      </div>
      <Button disabled={loading} className="flex gap-2">
        {loading && <Loader2 className="animate-spin" />} Add Popup Notice
      </Button>
    </form>
  );
};

export default page;
