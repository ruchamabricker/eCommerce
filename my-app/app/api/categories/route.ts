import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: Request) {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json({ message: "Categories fetched successfully", success: true, categories });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching categories", success: false }, { status: 500 });
  }
}
