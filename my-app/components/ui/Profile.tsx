//@ts-nocheck
"use client";
import Cookies from 'js-cookie';
import { signIn, signOut } from 'next-auth/react';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { User, Mail, Edit2, Trash2, Check, X } from 'lucide-react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FormData } from '@/types';
import { SessionUser } from '@/types';
import { DetailRow } from './DetailRow';
import { AddressSection } from './AddressSection';
import { useUserStore } from '@/providers/userStore';

const initialValue = {
  name: '',
  email: '',
  country: '',
  city: '',
  street: '',
  houseNumber: '',
  zipCode: '',
  addressId: ''
}

export default function UserDetails() {
  const { data: session } = useSession();
  const { fetchUser, user } = useUserStore();
  console.log("Session data:", session?.user);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(initialValue);

  useEffect(() => {
    if (!user) return;
    setFormData({
      name: user.name || '',
      email: user.email || '',
      country: user.address?.country || '',
      city: user.address?.city || '',
      street: user.address?.street || '',
      houseNumber: user.address?.houseNumber || '',
      zipCode: user.address?.zipCode || '',
      addressId: user.address?.id || ''
    })

    console.log(user)
  }, [user]);

  const handleInputChange = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsLoading(true);
      try {
        await axios.delete(`/api/deleteUser/${user.id}`);
        Cookies.remove('cookieName', { path: '' });
        await signOut({ redirect: false });
      } catch (error) {
        console.error('Error deleting user:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdate = async () => {
    setErrorMessage(null);
    if (!formData.city || !formData.country || !formData.email || !formData.houseNumber || !formData.name || !formData.street || !formData.zipCode) {
      setErrorMessage('Please fill in all fields before saving changes.');
      return;
    }

    const zipCodePattern = /^\d+$/;
    if (!zipCodePattern.test(formData.zipCode)) {
      setErrorMessage('Zip code must contain only numbers.');
      return;
    }

    const houseNumberPattern = /^\d+$/;
    if (!houseNumberPattern.test(formData.houseNumber)) {
      setErrorMessage('House number must contain only numbers.');
      return;
    }

    setIsLoading(true);
    try {
      await axios.put(`http://localhost:3000/api/updateUser/${user.email}`, formData);
      setIsEditing(false);
      fetchUser(session.user.email);
      setErrorMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorMessage('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div>
          <p className="font-medium text-blue-500 dark:text-blue-400">Profile Settings</p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
            Manage Your Account
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Update your personal information and manage your account settings
          </p>
        </div>

        <div className="mt-10">
          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="space-y-4">
              <div className="-mx-2 md:items-center md:flex">
                <DetailRow
                  icon={User}
                  label="Full Name"
                  value={formData.name}
                  isEditing={isEditing}
                  onChange={handleInputChange('name')}
                  placeholder='Enter your name'
                />
                <DetailRow
                  icon={Mail}
                  label="Email Address"
                  value={formData.email}
                  isEditing={isEditing}
                  onChange={handleInputChange('email')}
                  placeholder='Enter your email'
                />
              </div>

              <AddressSection
                formData={formData}
                isEditing={isEditing}
                onChange={handleInputChange}
              />
            </div>
            {errorMessage && (
              <p className="mt-4 text-red-500" style={{ color: errorMessage == "Profile updated successfully!" ? "green" : "red" }}>{errorMessage}</p>
            )}

            <div className="mt-6 flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={() => { setIsEditing(false), setErrorMessage("") }}
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 text-sm font-medium tracking-wide text-gray-600 capitalize transition-colors duration-300 transform bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gradient-to-r from-orange-500 via-purple-500 to-blue-400
hover:from-orange-400 hover:via-purple-400 hover:to-blue-300
 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-6 py-3 text-sm font-medium tracking-wide text-gray-600 capitalize transition-colors duration-300 transform bg-gradient-to-r from-orange-500 via-purple-500 to-blue-400
hover:from-orange-400 hover:via-purple-400 hover:to-blue-300

 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 text-white"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
