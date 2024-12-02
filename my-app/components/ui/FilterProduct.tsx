import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  XMarkIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserStore } from "@/providers/userStore";
import { Spinner } from "./Spinner";

type SortOption = {
  name: string;
  value: string;
  current: boolean;
};

type FilterOption = {
  id: string;
  name: string;
  options: string[];
};

type Product = {
  id: string;
  name: string;
  description: string;
};

type Color = {
  id: string;
  name: string;
};

type Size = {
  id: string;
  label: string;
};

export type Favorites = {
  id: String;
  userId: String;
  productId: String;
}

const sortOptions: SortOption[] = [
  { name: "Most Popular", value: "popular", current: true },
  { name: "Best Rating", value: "rating", current: false },
  { name: "Newest", value: "newest", current: false },
  { name: "Price: Low to High", value: "price_asc", current: false },
  { name: "Price: High to Low", value: "price_desc", current: false },
];

type SelectedFilters = {
  [key: string]: string[];
};

export type CategoryAndSubId = {
  category: string;
  subCategory: string;
};

export default function FilterProduct({
  categoryIdAndSubId,
}: {
  categoryIdAndSubId: CategoryAndSubId;
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);  // מצב טעינה

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    color: [],
    category: [],
    size: [],
  });

  const { user } = useUserStore();
  console.log(user?.id)

  const [products, setProducts] = useState<Product[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [favorites, setFavorites] = useState<Favorites[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const { category, subCategory } = categoryIdAndSubId;

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data } = await axios.get("/api/getColorsAndSizes");
        if (data.success) {
          setColors(data.colors);
          setSizes(data.sizes);
        }
      } catch (error) {
        console.error("Error fetching colors and sizes:", error);
      }
    };

    fetchFilters();
  }, []);

  const fetchProducts = async (filters: SelectedFilters, sortOption: string) => {
    const colorFilter =
      filters.color.length > 0 ? `&color=${filters.color.join(",")}` : "";
    const sizeFilter =
      filters.size.length > 0 ? `&size=${filters.size.join(",")}` : "";
    const sortFilter = sortOption ? `&sort=${sortOption}` : "";
    const userFilter = user?.id ? `&userID=${user.id}` : ""; 

    try {
      const { data } = await axios.get(
        `/api/filteredProducts?category=${category}&subCategory=${subCategory}${colorFilter}${sizeFilter}${sortFilter}${userFilter}`
      );
      setProducts(data.filteredProducts);
      setFavorites(data.fav);
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    setLoading(true); 
    fetchProducts(selectedFilters, sortOption);
  }, [selectedFilters, categoryIdAndSubId, sortOption]); 
  const handleFilterChange = (filterId: string, option: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      const isSelected = newFilters[filterId].includes(option);
      newFilters[filterId] = isSelected
        ? newFilters[filterId].filter((item) => item !== option)
        : [...newFilters[filterId], option];
      return newFilters;
    });
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option.value); 
    sortOptions.forEach((opt) => (opt.current = opt.value === option.value));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 dark:bg-black/50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium dark:text-white">Filters</h2>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6">
            <Disclosure as="div" className="border-b border-gray-200 dark:border-gray-700 py-4">
              <DisclosureButton className="flex w-full items-center justify-between py-2 text-gray-700 dark:text-gray-300">
                <span className="font-medium">Color</span>
                <ChevronDownIcon className="h-5 w-5" />
              </DisclosureButton>
              <DisclosurePanel className="pt-4">
                <div className="space-y-3">
                  {colors.map((color) => (
                    <label key={color.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.color.includes(color.name)}
                        onChange={() => handleFilterChange("color", color.name)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                        {color.name}
                      </span>
                    </label>
                  ))}
                </div>
              </DisclosurePanel>
            </Disclosure>

            <Disclosure as="div" className="border-b border-gray-200 dark:border-gray-700 py-4">
              <DisclosureButton className="flex w-full items-center justify-between py-2 text-gray-700 dark:text-gray-300">
                <span className="font-medium">Size</span>
                <ChevronDownIcon className="h-5 w-5" />
              </DisclosureButton>
              <DisclosurePanel className="pt-4">
                <div className="space-y-3">
                  {sizes.map((size) => (
                    <label key={size.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.size.includes(size.label)}
                        onChange={() => handleFilterChange("size", size.label)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                        {size.label}
                      </span>
                    </label>
                  ))}
                </div>
              </DisclosurePanel>
            </Disclosure>
          </div>
        </DialogPanel>
      </Dialog>

      <main className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 dark:border-gray-700 py-6">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {category}/{subCategory}
          </h5>
          <div className="flex items-center gap-4">
            <Menu as="div" className="relative">
              <MenuButton className="group inline-flex items-center rounded-md bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                Sort
                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-40 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                {sortOptions.map((option) => (
                  <MenuItem key={option.value}>
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleSortChange(option)}
                    >
                      {option.name}
                    </button>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden rounded-md bg-white dark:bg-gray-800 p-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <form className="hidden lg:block lg:col-span-1">
            <Disclosure as="div" className="border-b border-gray-200 dark:border-gray-700 py-6">
              <DisclosureButton className="flex w-full items-center justify-between py-3 text-sm font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                <span>Color</span>
                <ChevronDownIcon className="h-5 w-5" />
              </DisclosureButton>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  {colors.map((color) => (
                    <label key={color.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.color.includes(color.name)}
                        onChange={() => handleFilterChange("color", color.name)}
                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700"
                      />
                      <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                        {color.name}
                      </span>
                    </label>
                  ))}
                </div>
              </DisclosurePanel>
            </Disclosure>

            <Disclosure as="div" className="border-b border-gray-200 dark:border-gray-700 py-6">
              <DisclosureButton className="flex w-full items-center justify-between py-3 text-sm font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                <span>Size</span>
                <ChevronDownIcon className="h-5 w-5" />
              </DisclosureButton>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  {sizes.map((size) => (
                    <label key={size.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.size.includes(size.label)}
                        onChange={() => handleFilterChange("size", size.label)}
                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700"
                      />
                      <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                        {size.label}
                      </span>
                    </label>
                  ))}
                </div>
              </DisclosurePanel>
            </Disclosure>
          </form>

          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {loading ? (
    <div className="col-span-4 flex justify-center items-center min-h-[50vh]">
                  <Spinner /> 
                </div>
              ) : products.length === 0 ? (
                <div className="col-span-4 flex justify-center items-center min-h-[50vh] text-center text-xl font-bold text-gray-900 dark:text-white">
                  No products available.
                </div>
              ) : (
                products.map((product) => {
                  const isFavorite = favorites.some((fav) => fav.productId === product.id); 
                  return (
                    //@ts-ignore
                    <Product key={product.id} product={product} isFavorite={isFavorite} />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
