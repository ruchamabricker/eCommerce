import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const productId = url.searchParams.get("productId");

    if (!userId || !productId) {
      return NextResponse.json({
        message: "Missing userId or productId",
        success: false,
      }, { status: 400 });
    }

    console.log("מחיקת מועדף", userId, productId);

    const existingFavorite = await prisma.favorites.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    if (existingFavorite) {
      await prisma.favorites.delete({
        where: {
          userId_productId: { userId, productId },
        },
      });
      revalidatePath('http://localhost:3000/favorites'); // יש לוודא שהנתיב נכון בהתאם לפרויקט שלך

      return NextResponse.json({
        message: "Product removed from favorites successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Product not found in favorites",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error removing product from favorites:", error);
    return NextResponse.json({
      message: "Error removing product from favorites",
      success: false,
    }, { status: 500 });
  }
}
