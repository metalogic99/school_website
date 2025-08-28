import React, { ReactNode } from "react";
import "../../globals.css";
import SideNav from "@/components/admin/SideNav";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/toaster";
import BackButton from "@/components/common/BackButton";
const ProgressBar = dynamic(() => import("@/components/ProgressBar"), {
  ssr: false,
});

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>
        <ProgressBar />
        <div className="flex">
          <div className="fixed left-0 top-0 z-50">
            <SideNav />
          </div>
          <div className="ml-[250px] min-h-screen flex-1 p-4 ">
            <BackButton />

            {children}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
};

export default layout;
