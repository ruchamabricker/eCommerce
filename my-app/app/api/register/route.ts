import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    const existingUser = await prisma.users.findUnique({
      where: { email },
      include: {
        password: true,}
    });

    if (existingUser) {
      if (existingUser.isVerified && existingUser.password==null) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.users.update({
          where: { email },
          data: {
            password: { create: { hash: hashedPassword } },
          },
        });

        return NextResponse.json(
          { message: "Password updated successfully", success: true },
          { status: 201 }
        );
      }
      return NextResponse.json(
        { message: "Email is already registered", success: false },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    const user = await prisma.users.create({
      data: {
        email,
        name,
        password: { create: { hash: hashedPassword } },
        emailVerificationToken: token,
        emailTokenExpiry: tokenExpiry,
      },
    });

    const verificationUrl = `http://localhost:3000/verifyEmail/${token}/${email}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      text: `Please verify your email by clicking the link: ${verificationUrl}`,
      html: `<p>Please verify your email by clicking the link: <a href="${verificationUrl}">Verify Email</a></p>`,
    });

    setTimeout(async () => {
      const userToCheck = await prisma.users.findUnique({
        where: { email },
      });

      if (userToCheck && !userToCheck.isVerified) {
        await prisma.password.deleteMany({
          where: { userId: userToCheck.id },
        });
        await prisma.users.delete({
          where: { email },
        });
        console.log(`User with email ${email} deleted after token expired`);
      }
    }, 60 * 60 * 1000);

    return NextResponse.json({ message: "Verification email sent", success: true });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Failed to register user", success: false },
      { status: 500 }
    );
  }
}
