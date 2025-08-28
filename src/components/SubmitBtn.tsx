"use client";
import React, { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const SubmitBtn = ({ children }: { children?: ReactNode }) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="flex gap-1">
      {pending && <Loader2 className="animate-spin" size={20} />}
      {children}
    </Button>
  );
};

export default SubmitBtn;
