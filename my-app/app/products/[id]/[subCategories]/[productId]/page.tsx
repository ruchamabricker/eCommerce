import SingleProduct from "@/components/ui/SingleProduct";
import prisma from "@/prisma/client";

export default async function Prod({ params }: { params: { productId: string } }) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId  // שימוש ב-ID כדי לקבל את כל נתוני המוצר
    },
    include: {
      colors: {
        include: {
          color: {
            select: { name: true, hexCode: true }
          }
        }
      },
      sizes: {
        include: {
          size: {
            select: { label: true }
          }
        }
      },
    },
  });

  // Type assertion to ensure product is not null
  const validProduct = product as NonNullable<typeof product>;

  return (
    <>
      <SingleProduct product={validProduct} />
    </>
  );
}
