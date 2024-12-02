// app/api/products/route.ts

import cloudinary from "@/lib/cloudinary";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

// פונקציית GET לשליפת מוצרים עם סינונים
export async function GET(request: Request) {
    const url = new URL(request.url);

    // שליפת הסינונים מתוך ה-URL
    const color = url.searchParams.getAll("color");
    const category = url.searchParams.getAll("category");
    const size = url.searchParams.getAll("size");
    const sort = url.searchParams.get("sort");

    try {
        // חיפוש מוצרים לפי הסינונים שהתקבלו
        const products = await prisma.product.findMany({
            where: {
                // סינון לפי צבעים - תומך בכמה צבעים בו זמנית (חיפוש מוצרים שיכולים להיות כל צבע שנבחר)
                colors: color.length > 0 ? { some: { color: { name: { in: color } } } } : undefined,
                // סינון לפי קטגוריות - תומך בכמה קטגוריות בו זמנית
                category: category.length > 0 ? { id: { in: category } } : undefined,
                // סינון לפי גדלים - תומך בכמה גדלים בו זמנית
                sizes: size.length > 0 ? { some: { size: { label: { in: size } } } } : undefined,
            },
            orderBy: sort ? { [sort]: "asc" } : undefined,
            include: {
                category: true,
                subCategory: true,
                employee: true,
                colors: true,
                sizes: true,
            }
        });

        return NextResponse.json(products); // מחזיר את המוצרים שנמצאו
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ message: "Failed to fetch products", success: false }, { status: 500 });
    }
}

// פונקציית POST ליצירת מוצר חדש
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        console.log(formData);
        const file = formData.get("file") as File;
        const fileBuffer = await file.arrayBuffer();
        const mimeType = file.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");
        const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

        // העלאת התמונה ל-Cloudinary
        const result = await cloudinary.uploader.upload(fileUri);
        const image = result.secure_url;

        // שליפת שאר השדות מה-FormData
        const name = formData.get("name")!.toString();
        const description = formData.get("description")!.toString();
        const price = parseFloat(formData.get("price")!.toString());
        const amount = parseInt(formData.get("amount")!.toString());
        const sales = parseInt(formData.get("sales")!.toString());
        const categoryId = formData.get("category")!.toString();
        const subCategoryId = formData.get("subCategory")!.toString();
        const employeeId = formData.get("employeeId")!.toString();

        // יצירת מוצר חדש ב-DB
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                image,
                amount,
                sales,
                category: {
                    connect: { id: categoryId }
                },
                subCategory: {
                    connect: { id: subCategoryId },
                },
                employee: {
                    connect: { id: employeeId },
                }
            },
            include: {
                category: true,
                subCategory: true,
                employee: true,
            }
        });

        return NextResponse.json({ message: "Product created successfully", success: true, product });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ message: "Failed to create product", success: false }, { status: 500 });
    }
}
