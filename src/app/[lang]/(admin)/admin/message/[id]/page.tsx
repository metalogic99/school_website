"use client";
import EditButton from "@/components/common/EditButton";
import { H3 } from "@/components/typography";
import { toast } from "@/components/ui/use-toast";
import { getMessageById } from "@/server/actions/messages/message.action";
import { Edit, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Message {
  _id: string;
  designation: string;
  fullname: string;
  email: string;
  phone: string;
  message: string;
  image: { secure_url: string; public_id: string };
}

function page({ params: { id } }: { params: { id: string } }) {
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getMessage = async () => {
      const response = await getMessageById(id as string);
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
  if (!message) {
    return <div>Failed to fetch message</div>;
  }
  return (
    <div>
      <div className=" flex items-center justify-between">
        <H3 className="  font-semibold">Message of {message.designation}</H3>
        <Link
          href={`/admin/message/${id}/edit`}
          className=" flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
        >
          {" "}
          <Edit size={16} /> Edit
        </Link>
      </div>
      <div className="mx-auto mb-20 mt-10 flex  max-w-5xl flex-col p-4 md:flex-row">
        <div className="mr-8 flex flex-col items-center md:items-start">
          <img
            src={message.image.secure_url}
            alt="person"
            className="mb-4 h-40 w-40 rounded-full object-cover"
          />
          <div className="mb-2 flex items-center gap-1 text-sm  font-medium">
            <User size={16} className="mr-2" />
            <span className=" ">{message.fullname}</span>
          </div>
          <div className="mb-2 flex items-center gap-1 text-sm  font-medium">
            <Phone size={16} className="mr-2" />
            <span className=" ">{message.phone}</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Mail size={16} className="mr-2" />
            <span>{message.email}</span>
          </div>
        </div>
        <div className="mt-10  flex-1 text-justify text-sm leading-relaxed tracking-wide md:mt-0">
          <p dangerouslySetInnerHTML={{ __html: message.message }}></p>
        </div>
      </div>
    </div>
  );
}

export default page;
