import React from "react";
import { HomeCarousel } from "@/components/home";
import DashboardNotice from "@/server/models/DashboardNotice";
import connectDB from "@/server/utils/connectDB";
import GallaryNotice from "@/components/home/Gallary-Notice";
import Services from "@/components/home/Services";
import NewsArticle from "@/components/home/NewsArticle";
import { Lang } from "@/types";

const page = async ({ params }: { params: { lang: string } }) => {
  const { lang } = params;
  await connectDB();
  const notices = await DashboardNotice.find();

  return (
    <main>
      {notices && notices.length > 0 && (
        <HomeCarousel notices={JSON.stringify(notices)} />
      )}
      <div className=" mx-auto px-4 sm:container">
        <GallaryNotice lang={lang as Lang} />
        <Services lang={lang as Lang} />
        <NewsArticle lang={lang as Lang} />
      </div>
    </main>
  );
};

export default page;
