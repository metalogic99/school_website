"use client";
import { useState } from "react";
import { Download, FileText } from "lucide-react";

const DownloadButton = ({ title, url }: { title: string; url: string }) => {
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
      <button
        onClick={handleDownload}
        className="bordern mt-auto flex items-center gap-2 rounded-lg border-black bg-primary  p-2 text-center text-sm text-white transition duration-300  hover:text-white"
      >
        Download
        <Download size={16} className=" w-auto" />
      </button>
    </div>
  );
};

export default DownloadButton;
