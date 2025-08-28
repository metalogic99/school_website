import React from "react";
import { NewsHero, AllNews } from "@/components/news";
import connectDB from "@/server/utils/connectDB";
import Blogs from "@/server/models/blogs";

const page = async () => {
  await connectDB();
  const news = await Blogs.find().sort({ createdAt: -1 });

  if (news && news.length > 0) {
    const latestNews = news[0];

    return (
      <div>
        <NewsHero
          news={{
            title: latestNews.title,
            desc: latestNews.desc,
            image: latestNews.image.secure_url,
            _id: latestNews._id,
          }}
        />
        <AllNews data={JSON.stringify(news)} />
      </div>
    );
  } else {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        No news for today
      </div>
    );
  }
};

export default page;
