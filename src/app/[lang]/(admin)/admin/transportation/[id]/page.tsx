import EditTransportationForm from "@/components/admin/transportation/EditTransportationForm";
import Transportation from "@/server/models/Transportation";
import connectDB from "@/server/utils/connectDB";
import { notFound } from "next/navigation";
import React from "react";
import { H3 } from "@/components/typography";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  await connectDB();

  if (id) {
    const transportation = await Transportation.findById(id);
    return (
      <div>
        <H3 className=" my-4">Edit Details of Principal </H3>

        <EditTransportationForm
          transportation={{
            staffName: transportation.staffName,
            route: transportation.route,
            vehicleNo: transportation.vehicleNo,
            appointedOn: transportation.appointedOn,
            id: String(transportation._id),
            phone: transportation.phone,
          }}
        />
      </div>
    );
  }
  return notFound();
}
