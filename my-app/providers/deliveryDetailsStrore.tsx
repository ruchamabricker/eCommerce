import { create } from 'zustand';
import { useUserStore } from './userStore'; // Adjust the import path as necessary

type DeliveryDetails = {
  phoneNumber: string;
  userId: string | null; // Allow userId to be null initially
  email: string;
  name: string
   isComplited:boolean

};

type DeliveryDetailsState = {
  deliveryDetails: DeliveryDetails | null;
  setDeliveryDetails: (details: DeliveryDetails) => void;
  clearDeliveryDetails: () => void;
};

// Create the DeliveryDetails store
export const useDeliveryDetailsStore = create<DeliveryDetailsState>((set) => ({
  deliveryDetails: null,
  setDeliveryDetails: (details) => set({ deliveryDetails: { ...details, userId: useUserStore.getState().user?.id || null } }), // Get userId from the User store
  clearDeliveryDetails: () => set({ deliveryDetails: null }),
}));

