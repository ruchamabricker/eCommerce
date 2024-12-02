import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        console.log(`Deleting user with ID: ${id}`);

        const user = await prisma.users.findUnique({
            where: { id: String(id) },
            include: {
                address: true, // להכליל את הכתובת כדי למחוק אותה אם קיימת
                employee: true, // להכליל את העובד אם קיים
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 404 }
            );
        }

        // להתחיל טרנזקציה
        await prisma.$transaction(async (prisma) => {
            // מחיקת כתובת אם קיימת
            if (user.addressId) {
                await prisma.address.delete({
                    where: { id: user.addressId },
                });
            }

            // מחיקת העובד אם קיים
            if (user.employee?.id) {
                await prisma.employees.delete({
                    where: { id: user.employee?.id },
                });
            }

            await prisma.password.deleteMany({
                where: { userId: user.id },
              });
      
            // מחיקת המשתמש עצמו
            await prisma.users.delete({
                where: { id: String(id) },
            });
        });

        return NextResponse.json({ 
            message: "User and related data deleted successfully", 
            success: true 
        });

    } catch (error: unknown) {
        console.error("Error deleting user:", error);

        const errorMessage = error instanceof Error ? error.message : "Error deleting user";

        return NextResponse.json(
            { message: errorMessage, success: false },
            { status: 500 }
        );
    }
}
