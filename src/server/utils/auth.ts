"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export const handleUnauthorized = (req: NextRequest) => {
  const res = NextResponse.redirect(`${req.nextUrl.origin}/login`);
  res.cookies.delete("session");
  return res;
};

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/");
}

// export async function getSession() {
//   const session = cookies().get("session")?.value;
//   console.log("session in get session is", session);
//   if (!session) return;
//   try {
//     console.log("here we are session");
//     const decrypted = await decrypt(session);
//     console.log(decrypted, "decrypted is");
//     return decrypted;
//   } catch (err) {
//     console.log(err);
//     return;
//   }
// }

export async function getSession(req?: NextRequest) {
  const session = req
    ? req.cookies.get("session")?.value // for middleware
    : cookies().get("session")?.value; // for server components / API routes

  console.log("session in get session is", session);
  if (!session) return;

  try {
    console.log("here we are session");
    const decrypted = await decrypt(session);
    console.log("decrypted is", decrypted);
    return decrypted;
  } catch (err) {
    console.log("JWT verification error:", err);
    return;
  }
}
