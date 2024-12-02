import { create } from 'zustand';
import axios from 'axios';

export type UserAddress = {
  id:string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zipCode: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  address?: UserAddress;
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUser: (userId: string) => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  fetchUser: async (userEmail) => {
    try {
    const response = await axios.get(`http://localhost:3000/api/getUser/${userEmail}`);
    const userData = response.data.user;
    console.log("API response:", userData); 
    set({ user: userData });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },
}));