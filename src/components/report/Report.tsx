"use client";
import { useState } from "react";
import { Download, FileText } from "lucide-react";

const Report = ({ title, url }: { title: string; url: string }) => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      setDownloadUrl(blobUrl);

      // Triggering a click on the link to start the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title}.pdf`; // You can set the desired filename here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="mx-auto flex h-20 w-full items-center justify-between gap-4 bg-primary px-4 md:w-[80%]">
      <FileText className="h-[40%] w-auto" />
      <div className="flex-1">
        <p className="font-semibold md:text-xl">{title}</p>
        <p className="text-xs">
          Click on the download icon to download the document
        </p>
      </div>
      <button onClick={handleDownload}>
        <Download className="h-[30%] w-auto" />
      </button>
    </div>
  );
};

export default Report;
