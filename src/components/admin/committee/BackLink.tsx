"use client";
import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

const BackLink = () => {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-2 text-xs text-blue-600"
      onClick={() => router.back()}
    >
      <MoveLeft /> Back
    </button>
  );
};

export default BackLink;
