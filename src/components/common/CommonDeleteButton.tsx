"use client";
import { Trash } from "lucide-react";
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

export default function CommonDeleteButton({
  id,
  deleteAction,
}: {
  id: string;
  deleteAction: any;
}) {
  const [pending, setPending] = useState(false);

  const handleDeleteAction = async () => {
    setPending(true);

    toast({
      variant: "success",
      title: "Please wait while the deletion is in progress.",
    });

    const res = await deleteAction(id);
    toast({
      variant: res.success ? "success" : "destructive",
      title: res.success
        ? "Detail has been Deleted !"
        : "Couldn't delete the student !",
      description: res.message,
    });
    setPending(false);
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className=" hidden text-destructive group-hover:block">
          <Trash size={20} className="text-red-500" />
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
