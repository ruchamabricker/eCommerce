// store/cartStore.ts
"use client"
import { create } from 'zustand';
import axios from 'axios';
import Cart from '@/app/cart/page';


export type CartItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  uniqueId?: string;
};


type CartState = {
  cart: CartItem[];
  setCart:(item: CartItem[]) => void;
  fetchCart: (userId: string) => Promise<void>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (uniqueId: string) => void;
  updateQuantity: (uniqueId: string, quantity: number) => void;
  clearCart: () => void;
};

// Utility functions for local storage
export const getCartFromLocalStorage = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};


export const useCartStore = create<CartState>((set) => ({
  cart: [],

  setCart: (item:CartItem[]) => set({cart:item}),

  // Fetch cart items from the server for a specific user
  fetchCart: async (userId: string) => {
    try {
      // const storedCart = localStorage.getItem("cart");
      // console.log("storedCart",storedCart);

      // if(getCartFromLocalStorage()){
      //   try {
      //     await axios.post(`http://localhost:3000/api/saveCart`, {
      //       userId: userId,
      //       cart: storedCart,
      //     });
      //     console.log(storedCart);

      //   } catch (error) {
      //     console.log('Error saving cart:', error);
      //   }
      // }
      console.log("http://localhost:3000/api/getCart/")

      const response = await axios.get(`http://localhost:3000/api/getCart/${userId}`);
      console.log("response",response)
      set({ cart: response.data.cartItems });
      saveCartToLocalStorage(response.data.cartItems);
    } catch (error) {
      console.log('Error fetching cart:', error);
    }
  },

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );

      const updatedCart = existingItem
        ? state.cart.map((cartItem) =>
          cartItem.id === item.id &&
            cartItem.size === item.size &&
            cartItem.color === item.color
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
        : [...state.cart, item];

      saveCartToLocalStorage(updatedCart);
      return { cart: updatedCart };
    }),

  removeFromCart: (uniqueId) =>
    set((state) => {
      const updatedCart = state.cart.filter(
        (cartItem) => cartItem.uniqueId !== uniqueId
      );
      saveCartToLocalStorage(updatedCart);
      return { cart: updatedCart };
    }),

  updateQuantity: (uniqueId, quantity) =>
    set((state) => {
      const updatedCart = state.cart.map((cartItem) =>
        cartItem.uniqueId === uniqueId ? { ...cartItem, quantity } : cartItem
      );
      saveCartToLocalStorage(updatedCart);
      return { cart: updatedCart };
    }),

  clearCart: () => {
    localStorage.setItem("cart", JSON.stringify([]));
    set({ cart: [] });
  },
}));
