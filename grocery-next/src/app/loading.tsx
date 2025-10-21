'use client';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}