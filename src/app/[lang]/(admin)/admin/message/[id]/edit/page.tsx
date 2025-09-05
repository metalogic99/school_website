"use client";
import { H3 } from "@/components/typography";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getMessageById } from "@/server/actions/messages/message.action";
import { toast } from "@/components/ui/use-toast";
import UpdateMessageForm from "@/components/admin/message/UpdateMessage";

interface Message {
  _id: string;
  designation: string;
  designationNepali: string;
  fullname: string;
  email: string;
  phone: string;
  message: string;
  image: { secure_url: string; public_id: string };
}
const page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[3];
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getMessage = async () => {
      const response = await getMessageById(id);

      if (!response || !response.success || !response.data) {
        toast({
          variant: "destructive",
          title: "error Fetching message",
        });
        setLoading(false);
      } else {
        setMessage(response.data);
        setLoading(false);
      }
    };
    getMessage();
  }, []);
  if (loading) {
    return <div>Loading ......</div>;
  }

  if (!loading && !message) {
    return <div>Failed to fetch message</div>;
  }
  if (!message || !id) {
    return <div>Failed to fetch message</div>;
  }

  return (
    <div>
      <H3 className=" my-4">Edit Details of {message.designation} </H3>
      <UpdateMessageForm member={message} />
    </div>
  );
};

export default page;
