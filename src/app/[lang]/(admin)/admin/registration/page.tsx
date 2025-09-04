// import { H2, H3 } from "@/components/typography";
// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Eye } from "lucide-react";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import connectDB from "@/server/utils/connectDB";
// import Registration from "@/server/models/registration";
// import CommonDeleteButtonV2 from "@/components/common/CommonDeleteButtonV2";
// import { deleteStudentRegistration } from "@/server/actions/registration/registration.action";

// export default async function page() {
//   await connectDB();
//   const registrateredStudents = await Registration.find();

//   function extractGender(g: string) {
//     if (g === "m") {
//       return "Male";
//     } else if (g === "f") {
//       return "Female";
//     } else if (g === "o") {
//       return "Others";
//     } else {
//       return "-";
//     }
//   }

//   return (
//     <div className=" space-y-8">
//       <H2 className=" font-semibold">Registration</H2>
//       <Table className="w-full  overflow-hidden whitespace-nowrap  rounded-xl ">
//         <TableHeader className=" rounded-t-xl bg-primary/40">
//           <TableRow className="  rounded-t-xl  text-black">
//             <TableHead className=" font-semibold  text-black">S.N</TableHead>
//             <TableHead className=" font-semibold  text-black">Name</TableHead>
//             <TableHead className=" font-semibold  text-black">Email</TableHead>
//             <TableHead className=" font-semibold  text-black">
//               Mobile no.
//             </TableHead>
//             <TableHead className=" font-semibold  text-black">
//               Address
//             </TableHead>
//             <TableHead className=" font-semibold  text-black">Grade</TableHead>
//             <TableHead className=" font-semibold  text-black">
//               Message
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody className=" overflow-hidden  border-2">
//           {registrateredStudents
//             ? registrateredStudents.map((n, idx) => (
//                 <TableRow key={n.id}>
//                   <TableCell className="">{idx + 1}</TableCell>
//                   <TableCell className="">{n.fullname}</TableCell>
//                   <TableCell className="">{n.email}</TableCell>
//                   <TableCell className="">{n.fatherphone}</TableCell>
//                   <TableCell className=" ">{n.presentaddress}</TableCell>
//                   <TableCell className="">{n.grade}</TableCell>
//                   <TableCell className=" text-left">
//                     <div className=" flex  items-center gap-2">
//                       <Dialog>
//                         <DialogTrigger>
//                           <div className="flex cursor-pointer items-center  gap-2  text-muted-foreground">
//                             <Eye size={16} />
//                           </div>
//                         </DialogTrigger>
//                         <DialogContent>
//                           <div>
//                             <H3 className="  mb-4 font-semibold">Message :</H3>

//                             <div className="  flex flex-col items-center gap-4 ">
//                               <div>
//                                 <img
//                                   src={n.photo.secure_url}
//                                   alt="pic"
//                                   height={300}
//                                   width={300}
//                                   className=" h-56 w-56 rounded-full  object-cover"
//                                 />
//                               </div>
//                               <table className=" w-full ">
//                                 <tbody>
//                                   <tr>
//                                     <td className=" pr-4">Full Name </td>
//                                     <td className=" w-[50%]  text-muted-foreground">
//                                       {n.fullname}
//                                     </td>
//                                   </tr>
//                                   <tr>
//                                     <td>Date of Birth</td>
//                                     <td className=" text-muted-foreground">
//                                       {n.dob}
//                                     </td>
//                                   </tr>
//                                   <tr>
//                                     <td>Gender</td>
//                                     <td className=" text-muted-foreground">
//                                       {extractGender(n.gender)}
//                                     </td>
//                                   </tr>

//                                   <tr>
//                                     <td>Grade</td>
//                                     <td className=" text-muted-foreground">
//                                       {n.grade}
//                                     </td>
//                                   </tr>
//                                   <tr>
//                                     <td>Permanent Address</td>
//                                     <td className=" text-muted-foreground">
//                                       {n.permanentaddress}
//                                     </td>
//                                   </tr>
//                                   <tr>
//                                     <td>Present Address</td>
//                                     <td className=" text-muted-foreground">
//                                       {n.presentaddress}
//                                     </td>
//                                   </tr>
//                                   <tr>
//                                     <td>Father's Name</td>
//                                     <td className=" text-muted-foreground">
//                                       {n.fathername}
//                                     </td>
//                                   </tr>
//                                   <tr>
//                                     <td>Father's Phone</td>
//                                     <td className=" text-muted-foreground">
//                                       {n.fatherphone}
//                                     </td>
//                                   </tr>
//                                   <tr>
//                                     <td>Mother's Name</td>
//                                     <td className=" text-muted-foreground">
//                                       {n.mothername}
//                                     </td>
//                                   </tr>
//                                   <tr>
//                                     <td>Mother's Phone</td>
//                                     <td className=" text-muted-foreground">
//                                       {n.motherphone}
//                                     </td>
//                                   </tr>
//                                   {n.guardian_name && (
//                                     <tr>
//                                       <td>Guardian's Name</td>
//                                       <td className=" text-muted-foreground">
//                                         {n.guardian_name}
//                                       </td>
//                                     </tr>
//                                   )}
//                                   {n.guardian_phone && (
//                                     <tr>
//                                       <td>Guardian's Phone</td>
//                                       <td className=" text-muted-foreground">
//                                         {n.guardian_phone}
//                                       </td>
//                                     </tr>
//                                   )}
//                                   <tr>
//                                     <td>Birth Certificate</td>
//                                     <td className=" text-muted-foreground">
//                                       <a
//                                         className="flex items-center gap-1 text-primary"
//                                         target="_blank"
//                                         href={n.birth_certificate.secure_url}
//                                       >
//                                         <Eye size={16} /> View
//                                       </a>
//                                     </td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             </div>
//                           </div>
//                         </DialogContent>
//                       </Dialog>
//                       <CommonDeleteButtonV2
//                         id={n.id.toString()}
//                         deleteAction={deleteStudentRegistration}
//                       />
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             : null}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

import connectDB from "@/server/utils/connectDB";
import Registration from "@/server/models/registration";
import RegistrationTable from "./RegistrationTable";

export default async function page() {
  await connectDB();
  const students = await Registration.find();
  return <RegistrationTable students={JSON.parse(JSON.stringify(students))} />;
}
