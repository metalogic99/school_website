"use client";
import React, { useState, useEffect } from "react";
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
import { Trash } from "lucide-react";
import { Button } from "./ui/button";

type TDeleteAlert = {
  deleteAction: (id: string) => any;
  id: string;
  name?: string;
};

const DeleteAlert: React.FC<TDeleteAlert> = ({ id, deleteAction, name }) => {
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (pending) {
        // Display a custom message to the user
        const message =
          "There are ongoing delete operations. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pending]);

  const handleDeleteAction = async () => {
    setPending(true);
    const res = await deleteAction(JSON.parse(id));
    setPending(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {name ? name : <Trash size={16} className="text-red-500" />}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your job
            and remove the job data from servers.
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
  );
};

export default DeleteAlert;
