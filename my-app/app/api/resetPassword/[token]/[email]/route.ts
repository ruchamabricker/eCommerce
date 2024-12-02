import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: Request, { params }: { params: { token: string, email: string } }) {
    const { token, email } = params;
    const { newPassword } = await req.json(); 

    if (!newPassword || !token) {
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const user = await prisma.users.findFirst({
        where: {
            passwordResetToken: token,
            passwordResetTokenExpiry: { gt: new Date() },
            
        },
    });

    if (!user) {
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
        where: { email },
        data: {
            password: { update: { hash: hashedPassword } },
            passwordResetToken: null, 
            passwordResetTokenExpiry: null, 
        },
    });

    return NextResponse.json({ message: "Password reset successfully", success: true });
}
