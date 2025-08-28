const authKeySecret = process.env.AUTH_KEY_SECRET;
const cloudflareUrl = process.env.CLOUDFLARE_URL;
export const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "image/jpeg",
  "image/png",
  "image/jpg",
];
export const MAX_SIZE = 15 * 1024 * 1024;

export const getAuthKeySecret = (): string => {
  if (!authKeySecret) throw new Error("Auth key secret is not defined");
  return authKeySecret;
};

export const getCloudflareUrl = (): string => {
  if (!cloudflareUrl) throw new Error("Cloudflare url not defined");
  return cloudflareUrl;
};
