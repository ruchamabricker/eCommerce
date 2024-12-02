import React from 'react';
import { StatusOfOrder } from './StatusOfOrder';
import { ProductInOrder } from './productInOrderComponent';
import { OrderComponentProps } from './page';

export const OrderComponent: React.FC<OrderComponentProps> = ({ order }) => {

    return (
        <div className="mt-7 border border-gray-300 dark:border-gray-700 pt-9 pb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="px-3 md:px-11 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {/* Order Date Section */}
                <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Order Payment
                    </h3>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {new Date(order.orderDate).toLocaleDateString("he-IL", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        }).replace(/\//g, ".")}
                    </p>
                </div>

                {/* Total Amount Section */}
                <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Total Amount
                    </h3>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {order.totalAmount}$
                    </p>
                </div>

                {/* Delivery Date Section */}
                <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Delivery Expected by
                    </h3>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                    </p>
                </div>

                {/* Status Section */}
                <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Order Status
                    </h3>
                    <div className="flex items-center gap-4">
                        <StatusOfOrder orderId={order.id} status={order.status} />
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

            {/* Products List */}
            <div className="px-3 md:px-11">
                {order.orderProducts.map((product) => (
                    <ProductInOrder key={product.id} product={product} isLastProduct={product.id === order.orderProducts[order.orderProducts.length - 1].id} />
                ))}
            </div>
        </div>
    );
};