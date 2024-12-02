import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    try {
        const { orderId, progressLevel } = await request.json();

        if (!orderId || !progressLevel) {
            return NextResponse.json({ message: "Missing orderId or statusName", success: false }, { status: 400 });
        }

        // מציאת מזהה הסטטוס לפי השם
        const status = await prisma.ordersStatus.findFirst({
            where: { progressLevel: progressLevel }
        });
        
        if (!status) {
            return NextResponse.json({ message: "Status not found", success: false }, { status: 404 });
        }

        // שליפת ההזמנה עם פרטי הפריטים שבה
        const order = await prisma.orders.findUnique({
            where: { id: orderId },
            include: { orderProducts: true },
        });

        if (!order) {
            return NextResponse.json({ message: "Order not found", success: false }, { status: 404 });
        }

        // בדיקת מעבר לסטטוס 'Cancelled' ועדכון המלאי בהתאם
        if (progressLevel === 5 || progressLevel === 6) {
            for (const product of order.orderProducts) {
                await prisma.product.update({
                    where: { id: product.productId },
                    data: { amount: { increment: product.quantity } },
                });
            }
        }

        // עדכון הסטטוס של ההזמנה למזהה המתאים
        const updatedOrder = await prisma.orders.update({
            where: { id: orderId },
            data: {
                status: { connect: { id: status.id } },
            },
        });

        console.log("Order status updated successfully:", updatedOrder);
        return NextResponse.json({ message: "Order status updated successfully", success: true, order: updatedOrder });
    } catch (error) {
        console.error("Error updating order status:", error);
        return NextResponse.json({ message: "Failed to update order status", success: false }, { status: 500 });
    }
}
