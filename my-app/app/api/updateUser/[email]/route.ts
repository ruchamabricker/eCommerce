import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: { email: string } }
) {
    try {
        const { email } = params;
        const body = await request.json();
        const { name, country, city, street, houseNumber, zipCode } = body;

        console.log(`Updating user with email: ${email}`, { 
            name, country, city, street, houseNumber, zipCode 
        });

        const user = await prisma.users.findUnique({
            where: { email: email },
            include: { address: true },
        });
        if (!user) {
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 404 }
            );
        }

        // Start a transaction to ensure all updates succeed or fail together
        const updatedUser = await prisma.$transaction(async (prisma) => {
            let addressId = user.addressId;
            // Handle address update/creation
            if (addressId) {
                // Update existing address
                await prisma.address.update({
                    where: { id: addressId },
                    data: {
                        country,
                        city,
                        street,
                        houseNumber,
                        zipCode,
                    },
                });
            } else {
                // Create new address only if user doesn't have one
                const newAddress = await prisma.address.create({
                    data: {
                        country,
                        city,
                        street,
                        houseNumber,
                        zipCode,
                    },
                });
                addressId = newAddress.id;
            }

            // Update user details
            return await prisma.users.update({
                where: { email: email },
                data: {
                    name: name,
                    addressId: addressId,
                },
                include: {
                    address: true, // Include the updated address in the response
                },
            });
        });

        return NextResponse.json({ 
            message: "User updated successfully", 
            success: true, 
            user: updatedUser 
        });

    } catch (error: unknown) {
        console.error("Error updating user:", error);
        
        const errorMessage = error instanceof Error ? error.message : "Error updating user";
        
        return NextResponse.json(
            { message: errorMessage, success: false },
            { status: 500 }
        );
    }
}