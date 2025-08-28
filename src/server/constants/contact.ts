// const SMTP_HOST: string | undefined = process.env.SMTP_HOST;

// const SMTP_USER: string | undefined = process.env.SMTP_USER;

// const SMTP_PASSWORD: string | undefined = process.env.SMTP_PASSWORD;

// //GETS HOST
// export function getSmtpHost() {
//   if (!SMTP_HOST || SMTP_HOST.length === 0) {
//     throw new Error("Smtp host not defined.");
//   }
//   return SMTP_HOST;
// }
// //GETS PASSWORD
// export function getSmtpPassword() {
//   if (!SMTP_PASSWORD || SMTP_PASSWORD.length === 0) {
//     throw new Error("Smtp password not defined.");
//   }
//   return SMTP_PASSWORD;
// }
// //GETS USER
// export function getSmtpUser() {
//   if (!SMTP_USER || SMTP_USER.length === 0) {
//     throw new Error("Smtp user not defined.");
//   }
//   return SMTP_USER;
// }

// // EMAIL JS BROWSER

// const NEXT_PUBLIC_EMAIL_JS_SERVICE_ID: string | undefined =
//   process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID;

// const NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID: string | undefined =
//   process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID;

// const NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY: string | undefined =
//   process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;

// export function getServiceID(): string {
//   if (
//     !NEXT_PUBLIC_EMAIL_JS_SERVICE_ID ||
//     NEXT_PUBLIC_EMAIL_JS_SERVICE_ID.length === 0
//   ) {
//     throw new Error("Emailjs Service ID not set in env.");
//   }
//   return NEXT_PUBLIC_EMAIL_JS_SERVICE_ID;
// }

// export function getTemplateId(): string {
//   if (
//     !NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID ||
//     NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID.length === 0
//   ) {
//     throw new Error("Emailjs templated ID not set in env.");
//   }
//   return NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID;
// }

// export function getPublicKey(): string {
//   if (
//     !NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY ||
//     NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY.length === 0
//   ) {
//     throw new Error("Emailjs public ID not set in env.");
//   }
//   return NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;
// }
