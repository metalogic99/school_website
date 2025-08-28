"use client";
import { useState, ChangeEvent, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2, PlusIcon, SaveIcon, X } from "lucide-react";
import { getSignature } from "@/server/actions/gallery/upload.action";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { addSingleImage } from "@/server/actions/gallery/dbcalls.action";

enum UploadStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

type FileType = {
  file: File;
  uploaded: UploadStatus;
};

const page = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(false);
  const [galleryName, setGalleryName] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files: FileList = event.target.files;

      // Convert the FileList object to an array
      const filesArray: File[] = Array.from(files);

      // Create FileType objects with PENDING status for each file
      const newFiles: FileType[] = filesArray.map((file) => ({
        file,
        uploaded: UploadStatus.PENDING,
      }));

      // Update the state with the selected files
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDelete = (idx: number) => {
    setSelectedFiles((prevSelectedFiles) => {
      // Use filter to exclude the file at the specified index
      const updatedFiles = prevSelectedFiles.filter(
        (_, index) => index !== idx,
      );
      return updatedFiles;
    });
  };

  const handleImageUpload = async () => {
    if (galleryName.length < 1) return;
    setLoading(true);
    const { timestamp, signature } = await getSignature();
    if (selectedFiles && galleryName) {
      try {
        const promises = selectedFiles.map(async (file, idx) => {
          if (file.uploaded === "PENDING") {
            const formData = new FormData();
            formData.append("file", file.file);

            if (process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY) {
              formData.append(
                "api_key",
                process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
              );
              formData.append("signature", signature);
              formData.append("timestamp", timestamp.toString());
              formData.append("folder", "gallery");

              const endpoint =
                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL || undefined;
              if (endpoint) {
                // Fetch
                await fetch(endpoint, {
                  method: "POST",
                  body: formData,
                }).then(async (res) => {
                  // Send to db
                  const data = await res.json();
                  await addSingleImage(galleryName, data);

                  if (res.status === 200) {
                    setSelectedFiles((prevSelectedFiles) => {
                      const updatedFiles = [...prevSelectedFiles];
                      updatedFiles[idx] = {
                        ...updatedFiles[idx],
                        uploaded: UploadStatus.SUCCESS,
                      };
                      return updatedFiles;
                    });
                  } else {
                    setSelectedFiles((prevSelectedFiles) => {
                      const updatedFiles = [...prevSelectedFiles];
                      updatedFiles[idx] = {
                        ...updatedFiles[idx],
                        uploaded: UploadStatus.FAILED,
                      };
                      return updatedFiles;
                    });
                  }
                });
              } else {
                throw new Error("Endpoint is not defined.");
              }
            } else {
              throw new Error("API Key is not defined.");
            }
          }
        });

        // Resolve all promise
        await Promise.all(promises);

        toast({
          variant: "success",
          title: "Success !!",
          description: "All images uploaded successfully !!",
        });
        // return router.back();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Couldn't add all images!!",
          description: "Please contact to relevant party.",
        });
        console.error("Error uploading images:", error);
      } finally {
        setLoading(false);
        router.back();
      }
    }
  };

  return (
    <div>
      <Input
        disabled={loading}
        onChange={(e) => setGalleryName(e.target.value)}
        value={galleryName}
        placeholder="Title for the gallery"
        className="max-w-3xl"
      />
      <p className="text-xs text-red-500">
        {galleryName.length < 1 ? "Gallery name is required." : ""}
      </p>
      <Button
        onClick={() => inputRef.current?.click()}
        className="my-5 flex gap-2"
      >
        <PlusIcon />
        Add Images
      </Button>
      <input
        hidden
        ref={inputRef}
        onChange={handleFileChange}
        type="file"
        className="py-4"
        accept="image/*"
        multiple
      />

      <div className="flex flex-wrap gap-4">
        {selectedFiles.map((f, idx) => (
          <div className="relative" key={idx}>
            {loading && f.uploaded === "PENDING" ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.8)]">
                <Loader2 size={32} className="animate-spin text-white" />
              </div>
            ) : loading && f.uploaded === "SUCCESS" ? (
              <div className="absolute inset-0 flex items-center justify-center  bg-[rgba(0,0,0,0.8)]">
                <span className="rounded-full bg-white p-2 text-green-500">
                  <Check size={32} />
                </span>
              </div>
            ) : loading && f.uploaded === "FAILED" ? (
              <div className="absolute inset-0 flex items-center justify-center  bg-[rgba(0,0,0,0.8)]">
                <span className="rounded-full bg-white p-2 text-red-500">
                  <X size={32} />
                </span>
              </div>
            ) : null}
            <img
              src={URL.createObjectURL(f.file)}
              alt=""
              className="h-[200px] w-[300px] object-cover"
              height={300}
              width={200}
            />
            {!loading && f.uploaded === "PENDING" && (
              <button
                onClick={() => {
                  handleDelete(idx);
                }}
                className="absolute right-0 top-0 rounded-full bg-red-600 p-1 text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div>
        {selectedFiles.length > 0 ? (
          <Button onClick={handleImageUpload} className="my-10 flex gap-2">
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Saving
              </>
            ) : (
              <>
                <SaveIcon size={16} /> Save
              </>
            )}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default page;
