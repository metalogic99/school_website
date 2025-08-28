import React from "react";
import { Landmark, Phone } from "lucide-react";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const content = {
  np: {
    headOffice: "केन्द्रिय कार्यालय",
    contact: "सम्पर्क ",
    phone: "सम्पर्क नम्बर",
    address: "फाकफोकथुम–७, एकतप्पा, इलाम",
    opposite: "इमाडोल स्विमिंग पुलको पार्कमा",
    visitUs: "ठेगाना",
    num1: "९८६२६७०३८०",
    num2: "",
    email: "इमेल",
    contactDetails: "सम्पर्क विवरण",
  },
  en: {
    headOffice: "Head Office",
    contact: "Contact Details",
    phone: "Phone No.",
    address: "Phakphokthum-7, Ekatappa, Ilam",

    visitUs: "Visit Us",
    num1: "9862670380",
    num2: "",
    email: "Email Us",
    contactDetails: "Contact Details",
  },
};

export const Content = ({ lang }: { lang: string }) => {
  return (
    <div className="flex flex-col  gap-9 px-4 md:px-10 xl:px-20">
      <div className="text-xl font-semibold uppercase text-primary">
        {content[lang as keyof typeof content].contactDetails}:<br />
      </div>

      <div className="rounded-lg border-2 border-dashed border-primary px-4 py-8">
        <ul className="flex flex-col gap-4 ">
          <li className="flex gap-2">
            <Phone fill="black" size={16} />{" "}
            {content[lang as keyof typeof content].phone} : <br />
            {content[lang as keyof typeof content].num1} <br />
            {content[lang as keyof typeof content].num2} <br />
          </li>

          <li className="mt-2 flex gap-2">
            <FaMapMarkerAlt size={16} />{" "}
            {content[lang as keyof typeof content].visitUs} :<br />
            {/* {content[lang as keyof typeof content].opposite} <br /> */}
            {content[lang as keyof typeof content].address} <br />
          </li>

          <li className="mt-6 flex  gap-2">
            <IoMail size={16} />
            {content[lang as keyof typeof content].email} :<br />
            singhadevimaviekatappa14@gmail.com
          </li>
        </ul>
      </div>
    </div>
  );
};
