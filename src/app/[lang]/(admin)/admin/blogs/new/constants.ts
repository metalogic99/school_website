const cloudinary_api_key =
  process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || undefined;
const upload_uri = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL || undefined;

const cloudinaryCloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || undefined;

export const getCloudinaryCloudName = (): string => {
  if (cloudinaryCloudName) return cloudinaryCloudName;
  throw new Error("Cloudinary cloud name is not defined.");
};

export const getCloudinaryApiKey = (): string => {
  if (cloudinary_api_key) {
    return cloudinary_api_key;
  }
  throw new Error("Cloudinary API key is not defined");
};

export const getCloudinaryUploadUri = (): string => {
  if (upload_uri) {
    return upload_uri;
  }
  throw new Error("Cloudinary API key is not defined");
};
