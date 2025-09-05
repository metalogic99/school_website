"use client";

import { H2, H3 } from "@/components/typography";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CommonDeleteButtonV2 from "@/components/common/CommonDeleteButtonV2";
import { deleteStudentRegistration } from "@/server/actions/registration/registration.action";

interface Student {
  _id: string;
  fullname: string;
  email: string;
  fatherphone: string;
  presentaddress: string;
  grade: string;
  gender: string;
  dob: string;
  permanentaddress: string;
  fathername: string;
  mothername: string;
  motherphone: string;
  guardian_name?: string;
  guardian_phone?: string;
  photo: { secure_url: string };
  birth_certificate: { secure_url: string };
}

interface Props {
  students: Student[];
}

export default function RegistrationTable({ students }: Props) {
  const [gradeFilter, setGradeFilter] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);
  const printRef = useRef<HTMLDivElement | null>(null);

  // Compute unique grades dynamically
  const grades = useMemo(() => {
    const allGrades = students.map((s) => s.grade);
    return Array.from(new Set(allGrades)).sort((a, b) => a.localeCompare(b));
  }, [students]);

  useEffect(() => {
    if (gradeFilter) {
      setFilteredStudents(students.filter((s) => s.grade === gradeFilter));
    } else {
      setFilteredStudents(students);
    }
  }, [gradeFilter, students]);

  function extractGender(g: string) {
    if (g === "m") return "Male";
    if (g === "f") return "Female";
    if (g === "o") return "Others";
    return "-";
  }

  return (
    <div className="space-y-8">
      <H2 className="font-semibold">Registration</H2>

      {/* Dynamic Grade Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Grade:</label>
        <select
          className="rounded border px-2 py-1"
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
        >
          <option value="">All Grades</option>
          {grades.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <Table className="w-full overflow-hidden whitespace-nowrap rounded-xl">
        <TableHeader className="rounded-t-xl bg-primary/40">
          <TableRow className="rounded-t-xl text-black">
            <TableHead className="font-semibold text-black">S.N</TableHead>
            <TableHead className="font-semibold text-black">Name</TableHead>
            <TableHead className="font-semibold text-black">Email</TableHead>
            <TableHead className="font-semibold text-black">
              Mobile no.
            </TableHead>
            <TableHead className="font-semibold text-black">Address</TableHead>
            <TableHead className="font-semibold text-black">Grade</TableHead>
            <TableHead className="font-semibold text-black">Message</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="overflow-hidden border-2">
          {filteredStudents.map((n, idx) => (
            <TableRow key={n._id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{n.fullname}</TableCell>
              <TableCell>{n.email}</TableCell>
              <TableCell>{n.fatherphone}</TableCell>
              <TableCell>{n.presentaddress}</TableCell>
              <TableCell>{n.grade}</TableCell>
              <TableCell className="text-left">
                <div className="flex items-center gap-2">
                  {/* <Dialog>
                    <DialogTrigger>
                      <div className="flex cursor-pointer items-center gap-2 text-muted-foreground">
                        <Eye size={16} />
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <div>
                        <H3 className="mb-4 font-semibold">Message :</H3>
                        <div className="flex flex-col items-center gap-4">
                          <img
                            src={n.photo.secure_url}
                            alt="pic"
                            height={300}
                            width={300}
                            className="h-56 w-56 rounded-full object-cover"
                          />
                          <table className="w-full">
                            <tbody>
                              <tr>
                                <td className="pr-4">Full Name</td>
                                <td className="w-[50%] text-muted-foreground">
                                  {n.fullname}
                                </td>
                              </tr>
                              <tr>
                                <td>Date of Birth</td>
                                <td className="text-muted-foreground">
                                  {n.dob}
                                </td>
                              </tr>
                              <tr>
                                <td>Gender</td>
                                <td className="text-muted-foreground">
                                  {extractGender(n.gender)}
                                </td>
                              </tr>
                              <tr>
                                <td>Grade</td>
                                <td className="text-muted-foreground">
                                  {n.grade}
                                </td>
                              </tr>
                              <tr>
                                <td>Permanent Address</td>
                                <td className="text-muted-foreground">
                                  {n.permanentaddress}
                                </td>
                              </tr>
                              <tr>
                                <td>Present Address</td>
                                <td className="text-muted-foreground">
                                  {n.presentaddress}
                                </td>
                              </tr>
                              <tr>
                                <td>Father's Name</td>
                                <td className="text-muted-foreground">
                                  {n.fathername}
                                </td>
                              </tr>
                              <tr>
                                <td>Father's Phone</td>
                                <td className="text-muted-foreground">
                                  {n.fatherphone}
                                </td>
                              </tr>
                              <tr>
                                <td>Mother's Name</td>
                                <td className="text-muted-foreground">
                                  {n.mothername}
                                </td>
                              </tr>
                              <tr>
                                <td>Mother's Phone</td>
                                <td className="text-muted-foreground">
                                  {n.motherphone}
                                </td>
                              </tr>
                              {n.guardian_name && (
                                <tr>
                                  <td>Guardian's Name</td>
                                  <td className="text-muted-foreground">
                                    {n.guardian_name}
                                  </td>
                                </tr>
                              )}
                              {n.guardian_phone && (
                                <tr>
                                  <td>Guardian's Phone</td>
                                  <td className="text-muted-foreground">
                                    {n.guardian_phone}
                                  </td>
                                </tr>
                              )}
                              <tr>
                                <td>Birth Certificate</td>
                                <td className="text-muted-foreground">
                                  <a
                                    className="flex items-center gap-1 text-primary"
                                    target="_blank"
                                    href={n.birth_certificate.secure_url}
                                  >
                                    <Eye size={16} /> View
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog> */}

                  <Dialog>
                    <DialogTrigger>
                      <div className="flex cursor-pointer items-center gap-2 text-muted-foreground">
                        <Eye size={16} />
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      {/* PRINTABLE CONTENT WRAPPED IN REF */}
                      <div ref={printRef}>
                        <H3 className="mb-4 font-semibold">Message :</H3>
                        <div className="flex flex-col items-center gap-4">
                          <img
                            src={n.photo.secure_url}
                            alt="pic"
                            height={300}
                            width={300}
                            className="h-56 w-56 rounded-full object-cover"
                          />
                          <table className="w-full border-collapse border">
                            <tbody>
                              <tr>
                                <td className="pr-4 font-medium">Full Name</td>
                                <td className="w-[50%] text-muted-foreground">
                                  {n.fullname}
                                </td>
                              </tr>
                              <tr>
                                <td>Date of Birth</td>
                                <td className="text-muted-foreground">
                                  {n.dob}
                                </td>
                              </tr>
                              <tr>
                                <td>Gender</td>
                                <td className="text-muted-foreground">
                                  {extractGender(n.gender)}
                                </td>
                              </tr>
                              <tr>
                                <td>Grade</td>
                                <td className="text-muted-foreground">
                                  {n.grade}
                                </td>
                              </tr>
                              <tr>
                                <td>Permanent Address</td>
                                <td className="text-muted-foreground">
                                  {n.permanentaddress}
                                </td>
                              </tr>
                              <tr>
                                <td>Present Address</td>
                                <td className="text-muted-foreground">
                                  {n.presentaddress}
                                </td>
                              </tr>
                              <tr>
                                <td>Father's Name</td>
                                <td className="text-muted-foreground">
                                  {n.fathername}
                                </td>
                              </tr>
                              <tr>
                                <td>Father's Phone</td>
                                <td className="text-muted-foreground">
                                  {n.fatherphone}
                                </td>
                              </tr>
                              <tr>
                                <td>Mother's Name</td>
                                <td className="text-muted-foreground">
                                  {n.mothername}
                                </td>
                              </tr>
                              <tr>
                                <td>Mother's Phone</td>
                                <td className="text-muted-foreground">
                                  {n.motherphone}
                                </td>
                              </tr>
                              {n.guardian_name && (
                                <tr>
                                  <td>Guardian's Name</td>
                                  <td className="text-muted-foreground">
                                    {n.guardian_name}
                                  </td>
                                </tr>
                              )}
                              {n.guardian_phone && (
                                <tr>
                                  <td>Guardian's Phone</td>
                                  <td className="text-muted-foreground">
                                    {n.guardian_phone}
                                  </td>
                                </tr>
                              )}
                              <tr className="no-print print:hidden">
                                <td>Birth Certificate</td>
                                <td className="text-muted-foreground">
                                  <a
                                    className="flex items-center gap-1 text-primary"
                                    target="_blank"
                                    href={n.birth_certificate.secure_url}
                                  >
                                    <Eye size={16} /> View
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* PRINT BUTTON */}
                      <button
                        onClick={() => {
                          if (!printRef.current) return;
                          const printContent = printRef.current.innerHTML;
                          const printWindow = window.open(
                            "",
                            "",
                            "width=800,height=600",
                          );
                          if (printWindow) {
                            printWindow.document.write(`
                                  <html>
                                    <head>
                                      <title>Student Detail</title>
                                      <style>
                                        @page { size: A4; margin: 20mm; }
                                        body { font-family: sans-serif; padding: 10px; }
                                        table { width: 100%; border-collapse: collapse; }
                                        td { border: 1px solid #000; padding: 6px; }
                                        img { margin-bottom: 10px; border-radius: 50%; }

                                        /* Hides rows marked as no-print */
                                        .no-print { display: none !important; }
                                      </style>
                                    </head>
                                    <body>
                                      ${printContent}
                                    </body>
                                  </html>
                            `);

                            printWindow.document.close();
                            printWindow.print();
                          }
                        }}
                        className="mt-4 rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                      >
                        Print
                      </button>
                    </DialogContent>
                  </Dialog>
                  <CommonDeleteButtonV2
                    id={n._id}
                    deleteAction={deleteStudentRegistration}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
