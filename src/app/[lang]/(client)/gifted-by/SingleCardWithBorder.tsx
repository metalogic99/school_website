import React from "react";
import styles from "./SingleCard.module.css";

const SingleCardWithBorder = ({
  image,
  name,
  person,
}: {
  image: string;
  name: string;
  person: any;
}) => {
  return (
    <div className={`${styles.wrapper}  w-[280px]`}>
      <div className={`${styles.card} relative rounded-3xl    `}>
        <div
          className={`${styles.front} h-[400px] w-full rounded-3xl bg-primary  `}
        >
          <img
            src={image}
            alt={name}
            className="h-[350px] w-full rounded-3xl object-cover "
          />
          <div className="">
            <h2 className=" mt-2 text-center text-lg font-medium tracking-wide text-white ">
              {name}
            </h2>
          </div>
        </div>

        <div
          className={`${styles.back} absolute  inset-0 flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/80 via-violet-500 to-indigo-600 px-4 text-center  text-white`}
        >
          <table className=" mx-auto mt-8  space-y-6  overflow-hidden whitespace-nowrap   text-sm font-medium text-white">
            <tbody>
              <tr className="">
                <td className="  pr-4 text-left ">Name:</td>
                <td className="   text-left ">{person.name}</td>
              </tr>
              <tr>
                <td className="pr-4 pt-2 text-left ">Profession:</td>
                <td className="pt-2 text-left">{person.profession}</td>
              </tr>
              <tr>
                <td className="pr-4 pt-2 text-left ">Contact No:</td>
                <td className="pt-2 text-left">{person.phone}</td>
              </tr>
              <tr>
                <td className="pr-4 pt-2 text-left ">Address:</td>
                <td className="pt-2 text-left">{person.address}</td>
              </tr>
              <tr>
                <td className="pr-4 pt-2 text-left ">Email:</td>
                <td className="pt-2 text-left">{person.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SingleCardWithBorder;
