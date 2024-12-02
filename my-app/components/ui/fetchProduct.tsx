import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
// import {Product} from "../types"

export default async function fetchProduct({filter}:any) {

    //  async function POST(request: Request) {
    //     try {
    //         const body = await request.json();
    //         const { data } = body;
    //         let response;
    //         response = await prisma.product.create({ data })
    //         return NextResponse.json(response);

    //     } catch (error) {
    //         console.log(error);
    //         return NextResponse.json({ message: "Operation failed", success: false });
    //     }
    // }
    //  async function PUT(request: Request) {
    //     try {
    //         const body = await request.json();
    //         const { data } = body;
    //         let response;
    //         response = await prisma.product.update(data)
    //         return NextResponse.json(response);

    //     } catch (error) {
    //         console.log(error);
    //         return NextResponse.json({ message: "Operation failed", success: false });
    //     }
    // }
    //  async function DELETE(request: Request) {
    //     try {
    //         const body = await request.json();
    //         const { data } = body;
    //         let response;
    //         response = await await prisma.product.delete(data)
    //         return NextResponse.json(response);

    //     } catch (error) {
    //         console.log(error);
    //         return NextResponse.json({ message: "Operation failed", success: false });
    //     }
    // }
            let categoryId;
            if (filter.category != null) {
                const category_ = await prisma.category.findFirst({
                    where: {
                       name:filter.category  // Filter category by name received from frontend
                    }
                });

                if (category_) {
                    categoryId = category_.id;

                }
                const filteredProducts = await prisma.product.findMany({
                    where: {
                        price: {
                            gte: filter.minPrice !== null ? filter.minPrice : undefined,
                            lte: filter.maxPrice !== null ? filter.maxPrice : undefined
                        },
                        name: {
                            contains: filter.searchString != null ? filter.searchString : undefined
                        },
                        categoryId: categoryId !== null ? { equals: categoryId } : undefined
                    }
                });
                //  (filter: {minPrice:number, maxPrice:number,category:string, color: string});
            }
    
    return (
        <div>

        </div>
    )
}
