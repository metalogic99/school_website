"use client";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
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
import { deleteBatchStudent } from "@/server/actions/batch/batch.action";
import { toast } from "@/components/ui/use-toast";

export default function ClassRoutineDelete({
  id,
  deleteAction,
}: {
  id: string;
  deleteAction: any;
}) {
  const router = useRouter();
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
      variant: res.success ? "success" : "destructive",
      title: res.success
        ? "Student Detail has been Deleted !"
        : "Couldn't delete the student !",
      description: res.message,
    });

    if (res.success) {
      router.push("/admin/documents");
      // router.refresh();
    }
    setPending(false);
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="  flex items-center text-destructive ">
          <Trash size={16} className="text-red-500" />
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
