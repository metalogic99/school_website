"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const getSignature = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  if (process.env.CLOUDINARY_API_SECRET) {
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: "gallery" },
      process.env.CLOUDINARY_API_SECRET,
    );

    return { timestamp, signature };
  } else {
    throw new Error("CLOUDINARY_API_SECRET is not defined");
  }
};

export const deleteCloudinaryImage = async (id: string) => {
  try {
    await cloudinary.uploader.destroy(id);
  } catch (err) {
    throw new Error("Couldn't Delete Cloudinary Image");
  }
};

export const getSignatureForNews = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  if (process.env.CLOUDINARY_API_SECRET) {
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: "news" },
      process.env.CLOUDINARY_API_SECRET,
    );

    return { timestamp, signature };
  } else {
    throw new Error("CLOUDINARY_API_SECRET is not defined");
  }
};

export const getSignatureForBlogs = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  if (process.env.CLOUDINARY_API_SECRET) {
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: "blogs" },
      process.env.CLOUDINARY_API_SECRET,
    );

    return { timestamp, signature };
  } else {
    throw new Error("CLOUDINARY_API_SECRET is not defined");
  }
};

export const getSignatureNotice = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  if (process.env.CLOUDINARY_API_SECRET) {
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: "notice" },
      process.env.CLOUDINARY_API_SECRET,
    );

    return { timestamp, signature };
  } else {
    throw new Error("CLOUDINARY_API_SECRET is not defined");
  }
};

export const getSignatureForMembers = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  if (process.env.CLOUDINARY_API_SECRET) {
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: "members" },
      process.env.CLOUDINARY_API_SECRET,
    );

    return { timestamp, signature };
  } else {
    throw new Error("CLOUDINARY_API_SECRET is not defined");
  }
};

export const getDynamicSignature = async (folder: any) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  if (process.env.CLOUDINARY_API_SECRET) {
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET,
    );

    return { timestamp, signature };
  } else {
    throw new Error("CLOUDINARY_API_SECRET is not defined");
  }
};
