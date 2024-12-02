import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: Request, { params }: { params: { token: string; email: string } }) {
  const { token,email } = params;

  if (!email || !token) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  // חיפוש המשתמש עם המייל והטוקן המתאים
  const user = await prisma.users.findUnique({
    where: { email },
  });

  // בדיקת תקינות הטוקן ותוקפו
  if (
    !user ||
    user.emailVerificationToken !== token ||
    !user.emailTokenExpiry ||
    user.emailTokenExpiry < new Date()
  ) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
  }

  // עדכון סטטוס המשתמש לאומת והסרת הטוקן
  await prisma.users.update({
    where: { email },
    data: {
      isVerified: true,
      emailVerificationToken: null,
      emailTokenExpiry: null,
    },
  });

  return NextResponse.json({ message: "Email verified successfully", success: true });
}
