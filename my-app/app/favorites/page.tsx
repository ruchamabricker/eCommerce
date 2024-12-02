import Link from "next/link";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/options";
import FavoriteButton from "@/components/ui/FavoriteButton";

export const revalidate = 5; 

export default async function Favorites() {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const favorites: any = await prisma.favorites.findMany({
    where: { userId: userId },
    include: {
      product: {
        include: {
          category: true,
          subCategory: true,
        },
      },
    },
  });

  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold">There are no favorites to show</h2>
        <p className="text-gray-500 mt-2">Start adding products to favorites to see them here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900  h-screen">
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 dark:bg-gray-900">
      {favorites.map((fav: any) => {
        const categoryName = fav.product.category?.name || "category"; 
        const subCategoryName = fav.product.subCategory?.name || "subCategory"; 
        const productName = fav.product?.name;

        const productId = fav.product?.id;
        return (
          <div key={fav.productId} className="bg-gray-50 shadow-md overflow-hidden rounded-lg relative dark:bg-gray-800">
            <div className="absolute top-3 right-3">
              <FavoriteButton userId={userId} productId={fav.productId} />
            </div>

            <Link href={`http://localhost:3000/products/${categoryName}/${subCategoryName}/${productId}`} className="w-full h-full">
              <div className="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8 ">
                <img src={fav.product.image} alt={fav.product.name} className="h-full w-full object-contain" />
              </div>

              <div className="p-6 bg-white dark:bg-gray-800">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{productName}</h3>
                <h4 className="text-lg text-gray-800 font-bold mt-2 dark:text-white">{fav.product.price}₪</h4>
                <p className="text-gray-600 text-sm mt-2 dark:text-white">{fav.product.description}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
    </div>
  );
}
