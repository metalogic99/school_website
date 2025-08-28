import React from "react";
import DashboardNotice from "./DashboardNotice";
import PopUp from "./PopUp";
import VoiceNotices from "./VoiceNotices";

const page = () => {
  return (
    <div className="space-y-10">
      <DashboardNotice />
      <PopUp />
      <VoiceNotices />
    </div>
  );
};

export default page;
