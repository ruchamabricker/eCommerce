export interface FormData {
  name: string;
  email: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  addressId?: string;
}

// User state type
export type UserAddress = {
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  addressId?: string; // אופציונלי
};

export type UserState = {
  id: string | null;
  name: string | null;
  email: string | null;
  address: UserAddress | null; // שים לב לעדכון כאן
  img: string | null;
  isAuthenticated: boolean;
  isVerified: boolean;
} | undefined;

// ...

// SessionUser type
export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null | undefined;
  passwordSet?: boolean;
  isVerified?: boolean;
  address?: UserAddress | null; // התאם את הסוגים
  employee?: {
    id: string;
    businessId: string;
    business: {
      id: string;
      name: string;
      logo: string;
      phone: string;
      email: string;
    };
  } | null;
};

export type SingleProductProps = {
  product: {
      id: string;
      name: string;
      image: string;
      description: string | null;  // מאפשר גם null
      price: number;
      createdAt: Date;
      updatedAt: Date;
      amount: number;
      sales: number;
      categoryId: string;
      subCategoryId: string;
      employeeId: string;
      colors: {
          id: string;
          productId: string;
          colorId: string;
          color: { name: string; hexCode: string | null }; // כולל את hexCode
      }[];
      sizes: {
          id: string;
          productId: string;
          sizeId: string;
          size: { label: string; };
      }[];
  };
};


export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  uniqueId?: string;
};

export type SubCategoryType = {
  id: string;
  name: string;
  imageUrl: string; // Assuming this is where the image URL is stored
  categoryId: string; // You only need the categoryId, not the full category object
};


export type SubCategoriesProps = {
  subCategory: SubCategoryType[];
  categoryName: string;

};

