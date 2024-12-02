"use client"
import Link from "next/link";

function SubcategoryMenu({ subcategories, categoryName }: { 
  subcategories: {id: string; name: string; categoryId: string; items: string[]}[];
  categoryName: string 
}) {
  return (
    <div className="absolute left-0 top-full z-50">
      <div className="min-w-[200px] overflow-auto rounded-lg border border-slate-200 bg-white p-2 shadow-lg dark:bg-gray-900 dark:text-white">
        {subcategories.map((subcategory, index) => (
          <div
            key={subcategory.id}
            className={`mb-2 flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-800 
              ${index !== subcategories.length - 1 ? 'border-b border-slate-200' : ''}`}
          >
            <Link 
              href={`http://localhost:3000/products/${categoryName}/${subcategory.name}`}
              className="flex items-center w-full"
            >
              <p className="text-slate-800 font-medium dark:text-white">
                {subcategory.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubcategoryMenu;