import React from "react";
import { notFound } from "next/navigation";
import { Types } from "mongoose";
import connectDB from "@/server/utils/connectDB";
import EditNewsForm from "@/components/admin/news/EditForm";
import Blogs from "@/server/models/blogs";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  if (!Types.ObjectId.isValid(id)) return notFound();
  await connectDB();
  const blogs = await Blogs.findById(id);

  if (blogs) {
    return <EditNewsForm news={JSON.stringify(blogs)} />;
  } else {
    return notFound();
  }
};

export default page;
