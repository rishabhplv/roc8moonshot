import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  port: 587,
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateVerificationCode = (): string => {
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += randomInt(0, 10); // Generates a random integer between 0 and 9
  }
  return code;
};

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { name, email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateVerificationCode();

    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          verificationCode,
        },
      });

      await new Promise((resolve, reject) => {
        // Verifies connection configuration
        transporter.verify((error, success) => {
          if (error) {
            reject(error);
          } else {
            resolve(success);
          }
        });
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification",
        text: `Your verification code is: ${verificationCode}`,
      };

      await new Promise((resolve, reject) => {
        // Sends mail
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        });
      });

      return NextResponse.json(
        {
          message:
            "User registered. Please check your email for verification code.",
        },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { error: "User registration failed" },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
