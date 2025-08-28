"use client";
import { useState } from "react";
import { Download, FileText } from "lucide-react";

const DownloadButtonV2 = ({ title, url }: { title: string; url: string }) => {
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
    <div className="  flex items-center justify-center">
      <button onClick={handleDownload}>
        <Download size={40} className=" w-auto text-white" />
      </button>
    </div>
  );
};

export default DownloadButtonV2;
