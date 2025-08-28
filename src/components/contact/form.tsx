"use client";
import React, { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import LabelWithAsterik from "@/components/LabelWithAsterik";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TContactForm, contactFormSchema } from "@/schemas/contact.schema";
import { Loader2 } from "lucide-react";

const content = {
  en: {
    feedback: "Send Us Your Feedback",
    name: "Full name",
    email: "Email",
    subject: "Subject",
    desc: "Description",
    send: "Send Message",
    sending: "Sending Message",
    phone: "Contact No.",
  },
  np: {
    feedback: "हामीलाई आफ्नो प्रतिक्रिया पठाउनुहोस्",
    name: "पुरा नाम",
    email: "इमेल ",
    subject: "बिषय",
    desc: "विवरण",
    send: "सन्देश पठाउनुहोस्",
    sending: "सन्देश पठाउँदै",
    phone: "संपर्क नम्बर",
  },
};

export const Form = ({ lang }: { lang: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TContactForm>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: TContactForm) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      reset();
      toast({
        title: "Thank You for contacting us. 🎉",
        description:
          "We've got your inquiry and are on it! Expect a response soon. Your thoughts matter to us! 🤝",
        variant: "success",
      });
      return;
    } else {
      toast({
        title: "Sorry something went wrong. 🚫",
        description:
          "Looks like there's a small glitch in the system. Please verify your information and resend your message. We're working to fix this issue! 🛠️",
      });
      return;
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className="px-8">
      <form
        ref={formRef}
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="rounded-xl bg-white md:w-[80%]"
      >
        <span className="mb-2 block rounded-md bg-primary py-1 text-center font-semibold text-white">
          {content[lang as keyof typeof content].feedback}
        </span>
        <div className="rounded-xl border p-0">
          <CardHeader>
            <CardContent className="flex flex-col gap-4 p-0">
              <div className="flex-1">
                <div className="flex flex-col gap-3">
                  <LabelWithAsterik>
                    {content[lang as keyof typeof content].name}
                  </LabelWithAsterik>
                  <Input
                    {...register("fullName")}
                    className="focus:ring-none bg-gray-50 font-normal  text-neutral-800 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <p className="text-xs text-red-500">
                  {errors ? errors.fullName?.message : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="flex-1 flex-col gap-3">
                    <LabelWithAsterik>
                      {content[lang as keyof typeof content].email}
                    </LabelWithAsterik>

                    <Input
                      {...register("email")}
                      className="focus:ring-none bg-gray-50 font-normal  text-neutral-800 focus:outline-none"
                      placeholder="Enter your email"
                    />
                  </div>

                  <p className="text-xs text-red-500">
                    {errors ? errors.email?.message : ""}
                  </p>
                </div>

                <div className="flex-1">
                  <div className="flex-1 flex-col gap-3">
                    <LabelWithAsterik>
                      {content[lang as keyof typeof content].phone}
                    </LabelWithAsterik>

                    <Input
                      {...register("contact")}
                      className="focus:ring-none bg-gray-50 font-normal  text-neutral-800 focus:outline-none"
                      placeholder="Eg: 98xxxxxxxx"
                    />
                  </div>

                  <p className="text-xs text-red-500">
                    {errors ? errors.contact?.message : ""}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="flex flex-col gap-3">
                    <LabelWithAsterik>
                      {content[lang as keyof typeof content].subject}
                    </LabelWithAsterik>
                    <Input
                      {...register("subject")}
                      className="focus:ring-none bg-gray-50 font-normal  text-neutral-800 focus:outline-none"
                      placeholder="Enter your subject"
                    />
                  </div>
                  <p className="text-xs text-red-500">
                    {errors.subject ? errors.subject?.message : ""}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-3">
                  <LabelWithAsterik>
                    {content[lang as keyof typeof content].desc}
                  </LabelWithAsterik>
                  <Textarea
                    rows={5}
                    {...register("description")}
                    className="focus:ring-none bg-gray-50 font-normal  text-neutral-800 focus:outline-none"
                    placeholder="Describe your enquiry here"
                  />
                </div>
                <p className="text-xs text-red-500">
                  {errors ? errors.description?.message : ""}
                </p>
              </div>
            </CardContent>
            <div className="w-full py-3">
              <Button disabled={isSubmitting} className="w-full text-white">
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={20} className="animate-spin" />
                    Submitting
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </CardHeader>
        </div>
      </form>
    </div>
  );
};
