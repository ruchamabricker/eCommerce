'use client';

import React, { useEffect, useState } from 'react';

import { useUserStore, UserAddress } from '@/providers/userStore';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';
import { FiCheck, FiX } from "react-icons/fi";

export default function AddressDetails() {
  const { user, setUser } = useUserStore();
  console.log(user)
  const [isEditing, setIsEditing] = useState(false);
  const [addressForm, setAddressForm] = useState<any>({
    country: user?.address?.country || '',
    city: user?.address?.city || '',
    street: user?.address?.street || '',
    houseNumber: user?.address?.houseNumber || '',
    zipCode: user?.address?.zipCode || ''
  });
  const [originalAddress, setOriginalAddress] = useState<any>();
  useEffect(() => {
    if (!user) return;
    setAddressForm({
      country: user?.address?.country || '',
      city: user?.address?.city || '',
      street: user?.address?.street || '',
      houseNumber: user?.address?.houseNumber || '',
      zipCode: user?.address?.zipCode || ''
    })
  }, [user])


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAddressForm((prevForm: any) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalAddress(addressForm);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAddressForm(originalAddress);
  };

  const handleSave = async () => {
    try {
      const updatedAddress = { ...addressForm };

      if (user) {
        setUser({
          ...user, address: updatedAddress,
        });
      }
      await axios.put(`http://localhost:3000/api/updateUser/${user?.email}`, updatedAddress)
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update address:', error);
    }
  };
  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
      

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {['country', 'city', 'street', 'houseNumber', 'zipCode'].map(field => (
          <div key={field}>
            <label 
             className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              id={field}
              value={addressForm[field as keyof typeof addressForm]}
              onChange={handleInputChange}
             className="block w-full rounded-lg border p-3 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
              readOnly={!isEditing}
              placeholder={field}
              autoFocus={isEditing}
              tabIndex={isEditing ? 0 : -1}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        {isEditing ? (
          <>
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-100 rounded-lg focus:outline-none"
            >
              <FiX className="mr-2" />
              Cancel
            </button>
            <button
            type="button"
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 via-purple-500 to-blue-400 rounded-lg hover:from-orange-400 hover:via-purple-400 hover:to-blue-300 focus:outline-none"
              disabled={!Object.values(addressForm).every(val => val !== '')}
            >
              <FiCheck className="mr-2" />
              Save Address
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleEditClick}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 hover:bg-blue-100 rounded-lg focus:outline-none"
          >
            <FiEdit className="mr-2" />
            Edit Address
          </button>
        )}
      </div>
    </div>
  );
}