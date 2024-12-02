import React, { ChangeEvent } from 'react';
import {  MapPin } from 'lucide-react';
import { FormData } from '@/types';
import { DetailRow } from './DetailRow';


export const AddressSection: React.FC<{
    formData: FormData;
    isEditing: boolean;
    onChange: (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => void;
  }> = ({ formData, isEditing, onChange }) => (
    <div className="mt-6 pt-6">
      <div className="flex items-center mb-4">
        <span className="inline-block p-3 text-blue-500 rounded-full hover:from-orange-300 hover:via-purple-300 hover:to-blue-200 bg-gradient-to-r from-orange-200 via-purple-200 to-blue-200 dark:bg-gray-800 mr-3">
          <MapPin className="h-5 w-5" />
        </span>
        <h4 className="text-lg font-medium text-gray-800 dark:text-white">Address Details</h4>
      </div>
      <div className="space-y-4">
        <div className="-mx-2 md:items-center md:flex">
          <DetailRow
            icon={MapPin}
            label="Country"
            value={formData.country}
            isEditing={isEditing}
            onChange={onChange('country')}
            placeholder="Enter your country"

          />
          <DetailRow
            icon={MapPin}
            label="City"
            value={formData.city}
            isEditing={isEditing}
            onChange={onChange('city')}
            placeholder="Enter your city"

          />
        </div>
        <div className="-mx-2 md:items-center md:flex">
          <DetailRow
            icon={MapPin}
            label="Street"
            value={formData.street}
            isEditing={isEditing}
            onChange={onChange('street')}
            placeholder="Enter your street"

          />
          <DetailRow
            icon={MapPin}
            label="House Number"
            value={formData.houseNumber}
            isEditing={isEditing}
            onChange={onChange('houseNumber')}
            placeholder="Enter your houseNumber"

          />
        </div>
        <div className="-mx-2 md:items-center">
          <DetailRow
            icon={MapPin}
            label="Zip Code"
            value={formData.zipCode}
            isEditing={isEditing}
            onChange={onChange('zipCode')}
            placeholder="Enter your zipCode"

          />
        </div>
      </div>
    </div>
  );