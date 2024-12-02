import { generateToken } from "@/actions/createTokenPaypal";
import axios from "axios";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { CartItem } from '@/providers/cartStore';
import { DateTime } from 'luxon';
import { totalmem } from "os";


export const POST = async (req: Request) => {
  console.log("in cupture payment")
  const body = await req.json();

  console.log("body", body)
  const { id, deliveryDetails, cart, addressId } = body;
  console.log("adresId in route", addressId)
  try {
    const token = await generateToken();

    if (!token) throw new Error("Token not Exists");

    const { data } = await axios({
      method: "POST",
      url: `https://api-m.sandbox.paypal.com/v2/checkout/orders/${id}/capture`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("success capture Order", data);
    const order = await addOrder(deliveryDetails, cart, addressId);//משהו כאםן לא מאה אחוז תקין מבחינת הבדיקות, הזריקות והתפיסות
    return NextResponse.json(

      { success: true, message: "success capture Order", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "not success capture Order", error },
      { status: 500 }
    );
  }
};

const addOrder = async function (deliveryDetails: { phoneNumber: string, userId: string, email: string, name: string }, cart: any, adressId: string) {
  try {
    console.log("add order", deliveryDetails, cart)
    const userId = deliveryDetails.userId;
    const totalAmount = cart.reduce((acc: number, item: { id: string; quantity: number; price: number }) => acc + item.price * item.quantity, 0);
    let status;
    try {
      status = await prisma.ordersStatus.findFirst({
        where: {
          //@ts-ignore
          progressLevel: 1,
        },
      });
    }
    catch (err) {

      console.log("status", err)
    }
    const statusId = status?.id
    if (!statusId) {
      throw new Error("status ID is required");
    }
    // Create the order and update stock
    const order = await prisma.orders.create({
      data: {
        userId: userId,
        totalAmount: totalAmount,
        shippingAddressId: adressId,
        expectedDeliveryDate: DateTime.now().plus({ weeks: 2 }).toISO(),
        // expectedDeliveryDate.toISO(),
        statusId: statusId,
        orderProducts: {
          create: cart.map((item: { id: string; quantity: number; price: number }) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price * item.quantity,
          })),
        },
        email: deliveryDetails.email,
        PhoneNumber: deliveryDetails.phoneNumber,
        name: deliveryDetails.name
      },
    });
    console.log("orderPrisma", order)
    const updated = await updateAmount(cart);
    console.log("updated", updated)

    clearCartByUserId(userId)
      .catch(e => {
        console.error(e);
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    console.log("Order created successfully:", order);
    return NextResponse.json({ message: "Order created successfully", success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ message: "Failed to create order", success: false }, { status: 500 });
  }

}

async function clearCartByUserId(userId: string) {
  // מצא את העגלה לפי userId
  const cart = await prisma.cart.findUnique({
    where: {
      userId: userId,
    },
  });

  // אם לא נמצאה עגלה, תחזיר הודעה מתאימה
  if (!cart) {
    console.log(`No cart found for userId: ${userId}`);
    return;
  }

  // מחק את כל הפריטים בעגלה
  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id, // השתמש ב-id של העגלה שמצאת
    },
  });

  console.log(`Cart cleared for userId: ${userId}`);
}
async function updateAmount(orderItems: any) {
  console.log("orderItems", orderItems)
  interface OrderItem {
    id: string; // או טיפוס אחר מתאים
    quantity: number;
  }
  await Promise.all(orderItems.map((item:OrderItem) => prisma.product.update({
    where: { id: item.id },
    data: {
      amount: { decrement: item.quantity },
      sales: { increment: item.quantity },
    }
  })));

}
