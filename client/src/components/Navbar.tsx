import React from 'react';
import Link from 'next/link';
import { useStore } from '../store/useStore';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user } = useStore();
  const { logoutUser } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Referral System
        </Link>
        <div className="flex space-x-4">
          {user ? (
            <>
              <Link href="/" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/analytics" className="hover:underline">
                Analytics
              </Link>
              <button onClick={logoutUser} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
