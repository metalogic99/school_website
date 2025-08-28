import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

import Vacancy from "@/server/models/Vacancy";
import { notFound } from "next/navigation";

const page = async () => {
  try {
    const data = await Vacancy.find({ vacancyClosed: false });

    if (data) {
      return (
        <div className="py-">
          <div
            style={{
              background: "url(/career/bg.webp) center",
              backgroundSize: "cover",
            }}
            className="flex h-[200px] items-center justify-center md:h-[500px]"
          >
            <div className="flex h-[90%] w-[90%] items-center justify-center rounded-3xl bg-[rgba(0,0,0,0.4)] text-3xl font-bold text-white md:text-5xl">
              Available Vacancies
            </div>
          </div>

          <div className="flex w-full items-center py-32">
            <div className="">
              <img src="/career/chair.svg" />
            </div>
            <div className="flex-1 px-8">
              <div className="px-2 py-4 text-lg font-semibold">
                {data.length} Job Offers
              </div>

              <div className="">
                <Table>
                  <TableBody>
                    {data.map((d, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-semibold">
                          {d.title}
                        </TableCell>
                        <TableCell>{d.type}</TableCell>
                        <TableCell>{d.location}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            className="border-secondary-400 text-secondary-400"
                            size="lg"
                            variant="outline"
                            asChild
                          >
                            <Link href={`/careers/${d._id}`}>View Details</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="hidden max-w-full justify-center py-10 lg:justify-end">
                <button className="border-secondary-600 text-ui-500 border p-2 ">
                  <ChevronLeft />
                </button>

                <button className="border-secondary-600 bg-secondary-600 border px-3 py-2 text-white">
                  1
                </button>

                <button className="border-secondary-600 text-ui-500 border px-3 py-2">
                  2
                </button>

                <button className="border-secondary-600 text-ui-500 border px-3 py-2">
                  3
                </button>

                <button className="border-secondary-600 text-ui-500 border px-3 py-2">
                  ...
                </button>
                <button className="border-secondary-600 text-ui-500 border px-3 py-2">
                  10
                </button>
                <button className="border-secondary-600 text-ui-500 border p-3">
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  } catch (err) {
    console.log(err);
    return notFound();
  }
};

export default page;
