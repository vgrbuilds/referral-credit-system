import React from 'react';
import Link from 'next/link';
import { useStore } from '../store/useStore';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user } = useStore();
  const { logoutUser } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          ReferralSystem
        </Link>
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Dashboard
              </Link>
              <Link href="/analytics" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Analytics
              </Link>
              <button
                onClick={logoutUser}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-full hover:bg-red-100 font-medium transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 font-medium shadow-md hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
