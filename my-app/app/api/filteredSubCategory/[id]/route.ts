
// import { NextResponse } from "next/server";
// import prisma from "@/prisma/client";

// export async function GET(request: Request,  { params }: { params: { id: any } }
// ) {
//     try {
//         // Assuming you want to fetch a user by an email passed in query parameters
//         const { category } = params.id;
//         console.log(category)
//         let categoryId= category.id;

//         // חיפוש קטגוריה לפי שם
//         const category_ = await prisma.category.findFirst({
//           where: {
//             name: category.id  // מסנן לפי שם הקטגוריה המתקבל מהפרונטאנד
//           }
//         });
//           const filteredSubCategory = await prisma.subCategory.findMany({
//               where: {
//                 categoryId: categoryId ? { equals: categoryId } : undefined
//               }
//             });

//         return NextResponse.json({ message: "Success", success: true, filteredSubCategory });
//     } catch (error) {
//         console.error("Error fetching user:", error);
//         return NextResponse.json({ message: "Error fetching SubCategory", success: false }, { status: 500 });
//     }
// }
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: Request,  { params }: { params: { id: string }}) {
  try {
    const categoryId = params.id;
    const filteredSubCategory = await prisma.subCategory.findMany({
      where: { categoryId: categoryId },
    });
console.log(filteredSubCategory)
    return NextResponse.json({
      message: "Success",
      success: true,
      filteredSubCategory,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return NextResponse.json(
      { message: "Error fetching subcategories", success: false },
      { status: 500 }
    );
  }
}
