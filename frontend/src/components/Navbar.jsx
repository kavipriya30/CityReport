import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-city text-white text-sm"></i>
              </div>
              <span className="text-xl font-semibold text-white">CityReport</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition">
              Home
            </Link>
            <Link to="/report" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition">
              Report Issue
            </Link>
            <Link to="/track" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition">
              Track Issues
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition">
                Dashboard
              </Link>
            )}
            
            <div className="ml-4 flex items-center space-x-2">
              {user ? (
                <>
                  <span className="text-sm text-slate-400">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-slate-700 rounded-md hover:bg-slate-800 transition">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white">
                    Sign in
                  </Link>
                  <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition">
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>

          <button className="md:hidden flex items-center" onClick={() => setIsOpen(!isOpen)}>
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-slate-300`}></i>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-md">
              Home
            </Link>
            <Link to="/report" className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-md">
              Report Issue
            </Link>
            <Link to="/track" className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-md">
              Track Issues
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-md">
                Dashboard
              </Link>
            )}
            {user ? (
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-md">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-md">
                  Sign in
                </Link>
                <Link to="/register" className="block px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                  Get started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
