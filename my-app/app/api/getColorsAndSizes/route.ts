import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET() {
  try {
    // מביא את כל הצבעים והמידות מתוך בסיס הנתונים
    const colors = await prisma.color.findMany();
    const sizes = await prisma.size.findMany();

    return NextResponse.json({
      success: true,
      colors,
      sizes,
    });
  } catch (error) {
    console.error("Error fetching colors and sizes:", error);
    return NextResponse.json(
      { message: "Error fetching colors and sizes", success: false },
      { status: 500 }
    );
  }
}
