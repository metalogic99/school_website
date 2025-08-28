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
import { addTransportation } from "@/server/actions/transportation.action";

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TStaffForm>({
    resolver: zodResolver(transportationSchema),
  });

  const onSubmit = async (data: TStaffForm) => {
    try {
      const res = await addTransportation(data);
      toast({
        variant: res.error ? "destructive" : "success",
        title: res.error ? "Couldn't add new Staff." : "New Staff Added!",
        description: res.error ? res.error : res.message,
      });
      if (!res.error) {
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
          <p className="text-xs text-red-500">
            {errors.staffName && errors.staffName.message}
          </p>
        </div>
        <div className="mt-4">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="Phone Number" {...register("phone")} />
          <p className="text-xs text-red-500">
            {errors.phone && errors.phone.message}
          </p>
        </div>
        <div className="mt-4">
          <Label htmlFor="route">Route</Label>
          <Input
            id="route"
            placeholder="Koteshwor-Baneshowr"
            {...register("route")}
          />
          <p className="text-xs text-red-500">
            {errors.route && errors.route.message}
          </p>
        </div>
        <div className="mt-4">
          <Label htmlFor="vehicleNo">Vehicle No.</Label>
          <Input
            id="vehicleNo"
            placeholder="Eg: BA Jha 2045"
            {...register("vehicleNo")}
          />
          <p className="text-xs text-red-500">
            {errors.vehicleNo && errors.vehicleNo.message}
          </p>
        </div>
        <div className="mt-4">
          <Label htmlFor="appointedOn">Appointment Date</Label>
          <Input id="appointedOn" type="date" {...register("appointedOn")} />
          <p className="text-xs text-red-500">
            {errors.appointedOn && errors.appointedOn.message}
          </p>
        </div>
        <div className="my-4 text-white">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex gap-2">
                <Loader2 className="animate-spin" /> Adding Transportation ...
              </span>
            ) : (
              "Add Transportation"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
