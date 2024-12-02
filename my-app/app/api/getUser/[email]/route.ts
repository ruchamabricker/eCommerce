import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request,  { params }: { params: { email: string } }
) {
    try {
        const { email } = params;

        const user = await prisma.users.findUnique({
            where: { email: email }, 
            include: { address: true },
        });

        return NextResponse.json({ message: "Success", success: true, user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ message: "Error fetching user", success: false }, { status: 500 });
    }
}

