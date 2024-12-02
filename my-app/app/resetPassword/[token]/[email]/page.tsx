"use client";

import { useState } from "react";
import axios from "axios";

export default function ResetPassword({
  params,
}: {
  params: { token: string; email: string };
}) {
  const email = decodeURIComponent(params.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetPassword = async () => {
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/resetPassword/${params.token}/${email}`,
          { newPassword }
        );
        if (res.status === 200) {
          setIsSuccess(true);
          setMessage("Password reset successfully! You can now log in.");
        } else {
          setMessage("Password reset failed or the token has expired. Try again.");
        }
      } catch (error) {
        setMessage("An error occurred while resetting your password.");
      }
    } else {
      setMessage("Passwords do not match. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex justify-center pt-16">
      <div className="w-full max-w-md px-4">
        {isSuccess && (
          <div className="w-full rounded-lg p-6 text-center text-black text-xl font-semibold">
            {message}
          </div>
        )}
        {!isSuccess && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              resetPassword();
            }}
          >
            <h1 className="text-center text-2xl font-semibold mb-8 text-gray-800">
              Reset Your Password
            </h1>

            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                  transition-colors"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                  transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 
                focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
                transition-colors"
            >
              Reset Password
            </button>

            {message && !isSuccess && (
              <div className="mt-4 text-center text-red-600 text-sm font-medium">
                {message}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
