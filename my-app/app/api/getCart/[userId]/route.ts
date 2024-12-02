// בשרת - /app/api/getCart/[userId]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;
  try {
    const userCart = await prisma.cart.findUnique({
      where: { userId },
      select: {
        id: true,
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
              },
            },
          },
        },
      },
    });
    console.log("userCart" ,userCart?.items)

    if (!userCart) {
      return NextResponse.json({ cartItems: [] });
    }

    const cartData = userCart.items.map((item) => ({
      id: item.productId,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
      size: item.size || null,
      color: item.color || null,
      uniqueId: `${item.productId}-${item.color || ''}-${item.size || ''}`,
    }));

    return NextResponse.json({ cartItems: cartData });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 });
  }
}
