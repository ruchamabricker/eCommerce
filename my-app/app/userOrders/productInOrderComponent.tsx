export type ProductInOrderProps = {
    product: {
        id: string;
        orderId: string;
        productId: string;
        quantity: number;
        price: number;
        product: {
            name: string;
            price: number;
            image: string;
            colors: {
                color: { name: string; hexCode?: string | null };
            }[];
            sizes: {
                size: { label: string };
            }[];
        };
    },
    isLastProduct: boolean
};


export function ProductInOrder({ product, isLastProduct }: ProductInOrderProps) {
    return (
        <div className="py-4">
            <div className="flex items-center gap-8 lg:gap-24 px-3 md:px-11">
                <div className="grid grid-cols-4 w-full">
                    <div className="col-span-1 flex items-center justify-start">
                        <div className="w-32 h-32 sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                            <img src={product.product.image} alt="" className="h-full w-full object-cover" />
                        </div>
                    </div>
                    <div className="col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                        <h6 className="font-manrope font-semibold text-lg leading-6 text-gray-800 dark:text-white mb-2 whitespace-nowrap">
                            {product.product.name}
                        </h6>
                        <div className="flex items-center max-sm:flex-col gap-x-6 gap-y-2 mt-4">
                            {product.product.sizes.length !== 0 && <span className="font-normal text-base leading-6 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                Size: {product.product.sizes[0].size.label}
                            </span>}
                            {product.product.colors.length !== 0 && <div className="flex items-center">
                                <span className="font-normal text-base leading-6 text-gray-500 dark:text-gray-400 whitespace-nowrap mr-1">
                                    Color:
                                </span>
                                <div
                                    className="w-5 h-5 rounded-full shrink-0 transition-all border-2 border-white dark:border-gray-700"
                                    style={{ backgroundColor: product.product.colors[0].color.hexCode || product.product.colors[0].color.name }}
                                ></div>
                            </div>}
                            <span className="font-normal text-base leading-6 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                Qty: {product.quantity}
                            </span>
                            <span className="font-normal text-base leading-6 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                Price: {product.price}$
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {!isLastProduct && (
                <div className="border-b border-gray-200 dark:border-gray-700 mt-4"></div>
            )}
        </div>
    );
}