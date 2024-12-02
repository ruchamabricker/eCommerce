// Spinner.tsx
export const Spinner = () => (
    <div className="flex items-center justify-center space-x-2">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-300"></div>
      <span className="text-gray-900 dark:text-white">Loading...</span>
    </div>
  );
  