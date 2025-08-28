"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MyImage = ({
  image,
  height,
  width,
  classname,
}: {
  image: any;
  height: string;
  width: string;
  classname?: any;
}) => (
  <div>
    <LazyLoadImage
      key={image}
      alt={"studnet"}
      height={height}
      className={cn(" rounded-xl object-cover object-center", classname)}
      src={image} // use normal <img> attributes as props
      width={width}
      effect="blur"
      placeholderSrc={image}
    />
  </div>
);

export default MyImage;
