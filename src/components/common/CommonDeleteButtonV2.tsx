"use client";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function CommonDeleteButtonV2({
  id,
  size,
  deleteAction,
  text,
}: {
  size?: number;
  id: string;
  deleteAction: any;
  text?: string;
}) {
  const [pending, setPending] = useState(false);
  const pathname = usePathname();

  const handleDeleteAction = async () => {
    setPending(true);

    toast({
      variant: "success",
      title: "Please wait while the deletion is in progress.",
    });

    const res = await deleteAction(id);
    toast({
      variant: res?.success ? "success" : "destructive",
      title: res?.success ? "Deletion Successful!" : "Failed to Delete !",
      description: res?.message,
    });

    // if (res.success) return
    setPending(false);
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="  flex items-center text-destructive ">
          <Trash size={size ? size : 16} className="text-red-500" />
          <p className=" cursor-pointer text-red-500">{text || ""} </p>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              job and remove the job data from servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={handleDeleteAction}
                className="bg-red-600 hover:bg-red-500"
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
