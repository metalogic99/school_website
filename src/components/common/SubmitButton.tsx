import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

export default function SubmitButton({
  isSubmitting,
  title,
}: {
  isSubmitting: boolean;
  title: string;
}) {
  return (
    <Button disabled={isSubmitting}>
      {isSubmitting ? (
        <Loader size={16} className=" animate-spin" />
      ) : (
        `${title}`
      )}
    </Button>
  );
}
