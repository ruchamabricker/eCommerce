import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import prisma from '@/prisma/client';
import crypto from "crypto";

export async function POST(req: Request) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.users.findUnique({
        where: { email: email },
    });
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000); 

    await prisma.users.update({
        where: { email: email },
        data: {
            passwordResetToken: token,
            passwordResetTokenExpiry: expiry,
        },
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Click the link to reset your password: ${process.env.NEXTAUTH_URL}/resetPassword/${token}/${email}`,
            html: `
                <h3>Password Reset Request</h3>
                <p>You requested a password reset. Click the link to reset your password:</p>
                <a href="${process.env.NEXTAUTH_URL}/resetPassword/${token}/${email}">Reset Password</a>
            `,
        });

        return NextResponse.json({ message: 'Password reset email sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send password reset email' }, { status: 500 });
    }
}
