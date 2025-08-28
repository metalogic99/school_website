export const getJwtSecretKey = (): string => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not defined.");
  }
  return JWT_SECRET;
};
