'use client';
import { useUserStore } from '@/providers/userStore';
import { useDeliveryDetailsStore } from '@/providers/deliveryDetailsStrore';
import React, { useEffect, useState } from 'react';
import AddressDetails from './AddressDetails';

export default function DeliveryDetails() {
  const { user } = useUserStore();
  const { deliveryDetails, setDeliveryDetails } = useDeliveryDetailsStore();

  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    phone: '',
    isComplited: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const gotopayment = (e: React.FormEvent) => {
    console.log("user", user);
    e.preventDefault();
    console.log(formData);
    const isAddressComplete =
      user?.address?.city &&
      user?.address?.country &&
      user?.address?.houseNumber &&
      user?.address?.street &&
      user?.address?.zipCode &&
      formData.email &&
      formData.name &&
      formData.phone;
    if (!isAddressComplete)
      alert("please complete Details!");
    else {
      setDeliveryDetails({
        ...deliveryDetails,
        phoneNumber: formData.phone,
        email: formData.email || "",
        name: formData.name || "",
        userId: user?.id ?? null,
        isComplited: true,
      });
    }
  };

  return (
    <div className="mt-6 sm:mt-8 flex flex-col items-center">
      <div className="w-full max-w-4xl p-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="flex flex-col space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Order Confirmation Details</h2>
          
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full rounded-lg border p-3 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
              required
              placeholder={user?.name}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full rounded-lg border p-3 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
              required
              placeholder={user?.email}

            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="block w-full rounded-lg border p-3 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
              placeholder="123-456-7890"
              required
            />
          </div>
        </div>

        <div className="flex flex-col space-y-6 mt-0" style={{ minHeight: '400px' }}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Address Details</h2>
          <AddressDetails />
        </div>
        
      </div>

      <div className="md:col-span-2 flex justify-center mt-4 w-full">
        <button
          type="button"
          onClick={gotopayment}
          className="flex w-1/2 max-w-xs justify-center items-center gap-2 rounded-lg border bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Pay
        </button>
      </div>
    </div>
  );
}