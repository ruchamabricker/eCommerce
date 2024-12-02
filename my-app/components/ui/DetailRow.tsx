import { ChangeEvent } from "react";

export const DetailRow: React.FC<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    isEditing: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string; // New prop for custom placeholder
}> = ({ icon: Icon, label, value, isEditing, onChange, placeholder }) => (
    <div className="flex-1 px-2">
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center">
            <Icon className="h-4 w-4 mr-2 text-blue-500" />
            {label}
        </label>
        {isEditing ? (
            <input
                type={label === "Email Address" ? "email" : "text"}
                onChange={label === "Email Address" ? undefined : onChange} // Prevent change on email
                value={value}
                readOnly={label === "Email Address"} // Make email field read-only
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
            />
        ) : (
            <div className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700">
                {value || placeholder}
            </div>
        )}

    </div>
);
