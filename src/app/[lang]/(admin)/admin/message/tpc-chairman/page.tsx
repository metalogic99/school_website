import AddButton from "@/components/common/AddButton";
import EditButton from "@/components/common/EditButton";
import { H3 } from "@/components/typography";
import TPCChairmanMessages from "@/server/models/tpc-chairman";
import connectDB from "@/server/utils/connectDB";
import { Mail, Phone } from "lucide-react";
import React from "react";

export default async function page() {
  await connectDB();

  const message = await TPCChairmanMessages.find();

  return (
    <div>
      {message.length !== 0 ? (
        <div>
          <div className=" flex items-center justify-between">
            <H3 className="  font-semibold">Message of T.P.C Chairman</H3>
            <EditButton id={message[0]._id.toString()} />
          </div>
          <div className="mx-auto mb-20 mt-10 flex  max-w-5xl flex-col p-4 md:flex-row">
            <div className="mr-8 flex flex-col items-center md:items-start">
              <img
                src={message[0].image.secure_url}
                alt="person"
                className="mb-4 h-40 w-40 rounded-full object-cover"
              />
              <div className="mb-2 flex items-center gap-1 text-sm  font-medium">
                <Phone size={16} className="mr-2" />
                <span className=" ">{message[0].phone}</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <Mail size={16} className="mr-2" />
                <span>{message[0].email}</span>
              </div>
            </div>
            <div className="mt-10  flex-1 text-justify text-sm leading-relaxed tracking-wide md:mt-0">
              <p dangerouslySetInnerHTML={{ __html: message[0].message }}></p>
            </div>
          </div>
        </div>
      ) : (
        <div className="  grid  h-[50vh] place-items-center">
          <div className=" space-y-1">
            <h2 className="  text-center text-sm ">No Message!!!</h2>
            {/* <Link
            href={`${pathname}/new`}
            className=" flex items-center font-semibold  text-primary"
          >
            <Plus size={16} />
            Add a Message
          </Link> */}
            <AddButton />
          </div>
        </div>
      )}
    </div>
  );
}
