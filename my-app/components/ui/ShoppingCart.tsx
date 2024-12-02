'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/providers/cartStore';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  uniqueId?: string
};

export const ShoppingCart = () => {
  const [open, setOpen] = useState(true)
  const { cart, removeFromCart } = useCartStore()

  const remove = async (product: CartItem) => {
    if (product?.uniqueId != null) {
      removeFromCart(product.uniqueId)
    } else {
      removeFromCart(product.id)
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-gray-50 dark:bg-gray-900">
                <div className="flex-1 overflow-y-auto p-4 py-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900 dark:text-gray-200">Shopping cart</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root rounded-lg bg-white dark:bg-gray-800 p-6">
                      <ul role="list" className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                        {cart && cart.map((product, index) => (
                          <li key={`${product.id}-${index}`} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                              <img
                                alt={product.name}
                                src={product.image}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                                  <h3>{product.name}</h3>
                                  <p className="ml-4">${product.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                  {product.color} - {product.size}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500 dark:text-gray-400">Qty {product.quantity}</p>

                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() => remove(product)}
                                    className="font-medium text-blue-400 hover:text-blue-300"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 md:p-8">
                  <div className="rounded-lg bg-white dark:bg-gray-800 p-6">
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                      <p>Subtotal</p>
                      <p>
                        ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <a
                        href="http://localhost:3000/cart"
                        className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 via-purple-500 to-blue-400 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform hover:from-orange-400 hover:via-purple-400 hover:to-blue-300 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-50"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-400">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-blue-400 hover:text-blue-300"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}