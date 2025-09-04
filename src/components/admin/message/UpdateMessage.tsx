"use client";
import { useEffect, useState } from "react";
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
import Editor from "@/components/editor";
import { MessageInput, MessageSchema } from "@/schemas/message.schema";
import { editMessage } from "@/server/actions/messages/message.action";

interface Message {
  _id: string;
  designation: string;
  fullname: string;
  email: string;
  phone: string;
  message: string;
  image: { secure_url: string; public_id: string };
}
const UpdateMessageForm = ({ member }: { member: Message }) => {
  console.log(typeof member);
  const { toast } = useToast();
  const [img, setImg] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  const router = useRouter();
  const {
    handleSubmit,
    register,

    formState: { errors, isSubmitting },
  } = useForm<MessageInput>({
    resolver: zodResolver(MessageSchema),

    defaultValues: {
      fullname: member.fullname,
      email: member.email,
      phone: member.phone,
      message: member.message,
      designation: member.designation,
    },
  });

  const onSubmit = async (data: MessageInput) => {
    if (img) {
      //1st delete old image
      await deleteCloudinaryImage(member.image.public_id);

      const folder = "message";
      const imgData = await CloudinaryUpload({ image: img, folder });
      const formdata = {
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        designation: data.designation,
        message: msg,
      };
      const res = await editMessage(member._id, formdata, imgData);
      toast({
        variant: res.success ? "success" : "destructive",
        title: res.success
          ? "Message has been Updated !"
          : "Couldn't update the message !",
        description: res.message,
      });
      if (res.success) {
        router.push(`/admin/message/${member._id}`);
      }
    } else {
      const imgData = member.image;
      const formdata = {
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        designation: data.designation,
        message: msg,
      };
      const res = await editMessage(member._id, formdata, imgData);
      toast({
        variant: res.success ? "success" : "destructive",
        title: res.success
          ? "Message has been Updated !"
          : "Couldn't update the message !",
        description: res.message,
      });
      if (res.success) {
        router.push(`/admin/message/${member._id}`);
      }
    }
  };

  useEffect(() => {
    // setValue("isHead", member.isHead);
    setMsg(member.message);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-xl space-y-4">
          <div>
            <ImageUploadBtn
              setImg={setImg}
              img={img}
              initialImage={member?.image?.secure_url}
            />
          </div>
          <div>
            <Label>Full Name</Label>
            <Input {...register("fullname")} placeholder="Enter Full Name" />
            <p className="text-xs text-red-500">
              {errors.fullname && errors.fullname.message}
            </p>
          </div>
          <div>
            <Label>Designation</Label>
            <Input
              {...register("designation")}
              placeholder="Enter designation"
            />
            <p className="text-xs text-red-500">
              {errors.designation && errors.designation.message}
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

export default UpdateMessageForm;
