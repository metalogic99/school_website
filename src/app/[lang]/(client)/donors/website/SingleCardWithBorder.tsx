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
          className={`${styles.back} absolute  inset-0 flex h-full w-full flex-col items-center justify-center gap-4  text-wrap rounded-3xl  bg-blue-800 px-4 text-center  text-white`}
        >
          <div className=" mx-auto mt-2  max-w-[90%] space-y-6    text-sm font-medium text-white">
            <div>
              <h2 className="font-light text-muted">Name</h2>
              <p className="  ">{person.name}</p>
            </div>
            <div>
              <h2 className="font-light text-muted">Profession</h2>
              <p>{person.profession}</p>
            </div>
            <div>
              <h2 className="font-light text-muted">Birthplace</h2>
              <p>{person.birthplace}</p>
            </div>
            <div>
              <h2 className="font-light text-muted">Permanent Address</h2>
              <p>{person.per_add}</p>
            </div>

            <div>
              <h2 className="font-light text-muted">Phone no.</h2>
              <p>{person.phone}</p>
            </div>
            <div>
              <h2 className="font-light text-muted">Email</h2>
              <p>{person.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCardWithBorder;
