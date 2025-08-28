"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  transportationSchema,
  TStaffForm,
} from "@/schemas/transportation.schema";
import { editTransportation } from "@/server/actions/transportation.action";

export default function EditTransportationForm({
  transportation,
}: {
  transportation: any;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TStaffForm>({
    resolver: zodResolver(transportationSchema),
    defaultValues: {
      staffName: transportation.staffName || "",
      phone: transportation.phone || "",
      route: transportation.route || "",
      vehicleNo: transportation.vehicleNo || "",
      appointedOn: transportation.appointedOn || "",
    },
  });

  const onSubmit = async (data: TStaffForm) => {
    try {
      const res = await editTransportation(transportation.id, data);
      toast({
        variant: res.success ? "success" : "destructive",
        title: res.success
          ? "Transportation Details Updated!"
          : "Couldn't update the Transportation details!",
        description: res.message,
      });

      if (res.success) {
        router.push("/admin/transportation");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="w-[500px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="staffName">Staff Name</Label>
          <Input
            id="staffName"
            placeholder="Staff Name"
            {...register("staffName")}
          />
          {errors.staffName && <p>{errors.staffName.message}</p>}
        </div>
        <div className="mt-4">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="Phone" {...register("phone")} />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <div className="mt-4">
          <Label htmlFor="route">Route</Label>
          <Input
            id="route"
            placeholder="Koteshwor-Baneshwor"
            {...register("route")}
          />
          {errors.route && <p>{errors.route.message}</p>}
        </div>
        <div className="mt-4">
          <Label htmlFor="vehicleNo">Vehicle No.</Label>
          <Input
            id="vehicleNo"
            placeholder="Eg: BA Jha 2045"
            {...register("vehicleNo")}
          />
          {errors.vehicleNo && <p>{errors.vehicleNo.message}</p>}
        </div>
        <div className="mt-4">
          <Label htmlFor="appointedOn">Appointed On</Label>
          <Input id="appointedOn" type="date" {...register("appointedOn")} />
          {errors.appointedOn && <p>{errors.appointedOn.message}</p>}
        </div>
        <div className="mt-2">
          <Button className="mt-4" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
