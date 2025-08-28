import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Footer";
import DesktopNav from "@/components/Nav/DesktopNav";
import dynamic from "next/dynamic";
import Header from "../../../components/Header/Header";

import { Toaster } from "@/components/ui/toaster";

const ProgressBar = dynamic(() => import("@/components/ProgressBar"), {
  ssr: false,
});

import PopupNotice from "@/server/models/PopupNotice";
import connectDB from "@/server/utils/connectDB";
import { Lang } from "@/types";
import { url } from "inspector";
const NoticeOverlay = dynamic(() => import("@/components/Notice"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SHREE SINGHADEVI SECONDARY SCHOOL",
  description:
    "SHREE SINGHADEVI SECONDARY SCHOOL offers a comprehensive education with a focus on academic excellence, holistic development, and character building in a supportive and nurturing environment.",

  openGraph: {
    title: "SHREE SINGHADEVI SECONDARY SCHOOL",
    description:
      "SHREE SINGHADEVI SECONDARY SCHOOL provides quality education aimed at developing students into knowledgeable and responsible citizens.",
    images: [
      {
        url: "http://singhadevimaviekatappa.edu.np/school.png",
        width: 100,
        height: 100,
        alt: "SHREE SINGHADEVI SECONDARY SCHOOL Building",
      },
    ],
    url: "http://singhadevimaviekatappa.edu.np",
    type: "website",
  },
};

export default async function RootLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  await connectDB();
  const { lang } = params;
  const notices = await PopupNotice.find().sort({ createdAt: -1 });

  return (
    <html className="scroll-smooth" lang={lang}>
      <body className={inter.className + " bg-[#fcfcfd] " + "relative"}>
        <ProgressBar />

        {notices &&
          notices.length > 0 &&
          notices.map((notice) => (
            <NoticeOverlay key={notice._id} imgurl={notice.image.secure_url} />
          ))}
        <main className="mx-auto max-w-[1600px]">
          <Header lang={lang as Lang} />
          <DesktopNav lang={lang as Lang} />
          {children}
          <Footer lang={lang as Lang} />
          <Toaster />
        </main>
      </body>
    </html>
  );
}
