"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { H2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { getAllMessages } from "@/server/actions/messages/message.action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const [messages, setMessages] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const getMessages = async () => {
      const response = await getAllMessages();
      console.log("response is", response);
      if (!response || !response.success || !response.data) {
        toast({
          variant: "destructive",
          title: "error Fetching messages",
        });
      } else {
        setMessages(response.data);
      }
    };
    getMessages();
  }, []);

  useEffect(() => {
    console.log("messages received is", messages);
  }, [messages]);

  const handleMessageClick = (id: string) => {
    router.push(`/admin/message/${id}`);
  };

  return (
    <div>
      <div className="pb-5">
        <div className="space-y-8 pb-5">
          <div className=" flex items-center  justify-between">
            <H2 className=" font-semibold">All Messages</H2>
            <Button asChild>
              <Link
                href="/admin/message/new"
                className="flex items-center gap-2 text-white"
              >
                <PlusCircle size={16} /> Add Message
              </Link>
            </Button>
          </div>
          <div className="  flex flex-col gap-4 font-medium">
            {/* <div className="  cursor-pointer  rounded-xl border p-4 shadow-md">
              Message of S.M.C Chairman
            </div> */}
            {messages.length > 0 &&
              messages.map((message: any) => (
                <div
                  onClick={() => handleMessageClick(message._id)}
                  className="  cursor-pointer  rounded-xl border p-4 shadow-md"
                >
                  Message of {message.designation}
                </div>
              ))}
            {/* <Link
              href="/admin/message/tpc-chairman"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Message of T.P.C Chairman
            </Link>
            <Link
              href="/admin/message/principal"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Message of Principal
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
