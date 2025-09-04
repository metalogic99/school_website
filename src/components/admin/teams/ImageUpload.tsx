import { Button } from "@/components/ui/button";
import React from "react";

const ImageUpload = ({
  imageRef,
  setImage,
  setPreview,
}: {
  imageRef: any;
  setImage: (image: any) => void;
  setPreview: (url: any) => void;
}) => {
  return (
    <>
      <input
        ref={imageRef}
        hidden
        accept=".pdf, image/*, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setImage(e.target.files[0]);
            const previewUrl = URL.createObjectURL(e.target.files[0]);
            setPreview(previewUrl);
          }
        }}
      />
      <Button
        onClick={() => imageRef.current?.click()}
        className="bg-green-500 px-3 py-2 text-white"
      >
        Choose Photo
      </Button>
    </>
  );
};

export default ImageUpload;
