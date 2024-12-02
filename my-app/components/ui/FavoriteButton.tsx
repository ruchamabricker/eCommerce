// components/FavoriteButton.tsx
"use client";

import { useState } from "react";
import { IoHeart } from "react-icons/io5";
import axios from "axios";

interface FavoriteButtonProps {
    userId: string;
    productId: string;
}

export default function FavoriteButton({ userId, productId }: FavoriteButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const removeFavorite = async () => {
        setIsLoading(true);
        try {
            await axios.delete(`/api/deleteFavorites`, {
                params: { userId, productId }
            });
            // רענון הדף לאחר מחיקת המועדף
            window.location.reload();
        } catch (error) {
            console.error("שגיאה במחיקת המועדף:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={removeFavorite}
            className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
            disabled={isLoading}
        >
            <IoHeart className="text-red-500 text-[24px]" />
        </button>
    );
}
