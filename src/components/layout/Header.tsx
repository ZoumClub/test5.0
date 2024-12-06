import React from 'react';
import { Car, Menu, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { NavLink } from './NavLink';

export function Header() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">CarCompare</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/sell-your-car">Sell Your Car</NavLink>
            <NavLink href="#new-cars">New Cars</NavLink>
            <NavLink href="#used-cars">Used Cars</NavLink>
            <NavLink href="#reviews">Car Reviews</NavLink>
            {profile?.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Admin Dashboard
              </Link>
            )}
            {user && (
              <button
                onClick={handleSignOut}
                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            )}
          </nav>
          
          <div className="md:hidden">
            <button className="p-2">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}