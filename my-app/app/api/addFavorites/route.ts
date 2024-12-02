import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { userId, productId } = await req.json(); // מקבל את ה-ID של המשתמש והמוצר מהבקשה
 console.log("mm",userId,productId)
    // בודק אם המוצר כבר קיים במועדפים של המשתמש
    const existingFavorite = await prisma.favorites.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    if (existingFavorite) {
      return NextResponse.json({
        message: "Product added to favorites successfully",
        success: true,
        existingFavorite
      });
    }
if(!existingFavorite){
    // אם המוצר לא קיים, מוסיף אותו לרשימת המועדפים
    const favorite = await prisma.favorites.create({
      data: {
        user: { connect: { id: userId } },
        product: { connect: { id: productId } },
      },
    });
    revalidatePath('http://localhost:3000/favorites');

console.log(favorite)
    return NextResponse.json({
      message: "Product added to favorites successfully",
      success: true,
      favorite,
    });
  }
  } catch (error) {
    console.error("Error adding product to favorites:", error);
    return NextResponse.json({
      message: "Error adding product to favorites",
      success: false,
    }, { status: 500 });
  }
}
