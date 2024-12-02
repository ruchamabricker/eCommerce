import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import Link from "next/link";
import { SubCategoriesProps } from "@/types";

export default async function SubCategories({ subCategory, categoryName }: SubCategoriesProps) {
  return (
    <div className="pb-16 bg-white dark:bg-gray-900">
      <div className="flex justify-center items-center">
        <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
          <div className="flex flex-col justify-center items-center space-y-10">
            <div className="flex flex-col justify-center items-center space-y-2">
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 md:gap-x-8 w-full">
              {subCategory.map((category, index) => (
                <div key={index} className="relative group flex justify-center items-center h-full w-full">
                  <img
                    className="object-center object-cover h-full w-full rounded-lg"
                    src={category.imageUrl}
                    alt={`${category.name}-image`}
                  />
                  <Link 
                    href={`${categoryName}/${category.name}`}   
                    className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 dark:text-gray-200 py-3 w-36 bg-white dark:bg-gray-800 rounded-md transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {category.name}
                  </Link>
                  <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}