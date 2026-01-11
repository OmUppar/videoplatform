import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendOtpMail(email: string, otp: string) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}`,
  });
}
