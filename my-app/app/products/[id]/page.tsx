import SubCategories from "@/components/ui/subCategories";
import prisma from "@/prisma/client";
import { SubCategoryType } from "@/types";

export default async function Page({ params }: { params: { id: string } }) {
  // First, get the category ID from the category name
  const category = await prisma.category.findFirst({
    where: { name: params.id },
  });

  if (!category) {
    return <div>Category not found</div>;
  }

  // Then get the subcategories based on the category ID
  const subCategories: SubCategoryType[] = await prisma.subCategory.findMany({
    where: { categoryId: category.id },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      categoryId: true, // Only the categoryId is necessary here
    },
  });

  return (
    <>
      <SubCategories subCategory={subCategories} categoryName={params.id} />
    </>
  );
}
