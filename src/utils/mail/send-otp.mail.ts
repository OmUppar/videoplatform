// import * as nodemailer from 'nodemailer';
// import * as dotenv from 'dotenv';

// // const transporter = nodemailer.createTransport({
// //   host: 'smtp.gmail.com',
// //   port: 465,
// //   secure: true,
// //   auth: {
// //     user: process.env.MAIL_USER,
// //     pass: process.env.MAIL_PASS,
// //   },
// // });

// // export async function sendOtpMail(email: string, otp: string) {
// //   await transporter.sendMail({
// //     from: process.env.MAIL_FROM,
// //     to: email,
// //     subject: 'Your OTP Code',
// //     text: `Your OTP is ${otp}`,
// //   });
// // }

// export async function sendOtpMail(email: string, otp: string) {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.MAIL_FROM,
//     to: email,
//     subject: 'Your OTP Code',
//     text: `Your OTP is ${otp}`,
//   });
// }

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpMail(email: string, otp: string) {
  console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'Video Platform <onboarding@resend.dev>',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. This OTP is valid for 5 minutes.`,
  });
}

