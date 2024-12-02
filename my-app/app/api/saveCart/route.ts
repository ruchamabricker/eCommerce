// בשרת - /app/api/saveCart/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function POST(request: Request) {
  try {
    const { userId, cart } = await request.json();
    
    await prisma.cartItem.deleteMany({
      where: { cart: { userId } },
    });

    // יצירת או עדכון עגלה עבור המשתמש
    const userCart = await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    // הכנת נתונים עבור הפריטים לעגלה
    const cartItems = cart.map((item: { id: string, quantity: number, size?: string, color?: string, price: number }) => ({
      cartId: userCart.id,
      productId: item.id, // התייחסות לשדה ID של המוצר
      quantity: item.quantity,
      size: item.size || null,
      color: item.color || null,
      price: item.price,
    }));

    // הכנסת הפריטים לטבלת CartItem
    if (cartItems.length > 0) {
      await prisma.cartItem.createMany({
        data: cartItems,
      });
    }

    return NextResponse.json({ message: 'Cart and items saved successfully' });
  } catch (error) {
    console.error("Error saving cart:", error);
    return NextResponse.json({ error: 'Failed to save cart items' }, { status: 500 });
  }
}
