import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../stores/authStore';
import { FiMenu, FiX, FiHome, FiInfo, FiFolderPlus } from 'react-icons/fi';
import { LogOutIcon, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { logoutMutation } = useAuth();
  const { user, isAuthenticated } = useAuthStore();

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/projects', label: 'Projects', icon: FiFolderPlus },
    { path: '/about', label: 'About', icon: FiInfo },
  ];

  const isActive = (path) => location.pathname === path;




  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-white">DeployHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(path)
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <span className="text-green-300 text-sm font-sans">
                {user &&
                  (

                    `WELCOME, ${user?.name}...`
                  )}
              </span>
              <div className=" mr-2 ml-2 lg:w-auto flex lg:justify-end  items-center justify-end w-full ">
                {isAuthenticated ? (
                  <NavLink
                    to="/logout"
                    className="  w-full flex sm:py-1 px-2 py-2 gap-1  bg-red-500 text-white  rounded-md "
                  // onClick={toggleMenu}
                  >
                    <LogOutIcon />
                    <span className="text-white  flex">

                    </span>
                  </NavLink>
                ) : (

                  <div className=" flex flex-col gap-2  lg:flex-row ">
                    <NavLink
                      to="/login"
                      className="removeLinkHover w-full flex gap-2  sm:py-1 py-2 rounded-md justify-center  items-center  @bg-[#1b2a44] bg-slate-800 text-white   "
                    // onClick={toggleMenu}
                    >
                      <User />
                      <span className="block sm:hidden w-full ">
                        Login
                      </span>

                    </NavLink>


                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-md"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(!isOpen)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive(path)
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </Link>
              ))}

              {/* Mobile User Menu */}
              <div className="border-t border-gray-700 pt-3 mt-3">
                <div className="px-3 py-2 text-gray-300 text-sm">
                  {user?.name || user?.email}
                </div>
                <div className=" mr-5 lg:w-auto flex lg:justify-end  items-center justify-end w-full ">
                  {isAuthenticated ? (
                    <NavLink
                      to="/logout"
                      className="  w-auto flex  sm:py-2 px-2 py-2 gap-2    bg-red-500 text-white  rounded-md "
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <LogOutIcon className='' />
                      <span className="text-white  flex">
                        Logout
                      </span>
                    </NavLink>
                  ) : (

                    <div className=" flex flex-col gap-2  lg:flex-row ">
                      <NavLink
                        to="/login"
                        className="removeLinkHover w-full flex gap-2  sm:py-1 py-2 rounded-md justify-center  items-center  @bg-[#1b2a44] bg-slate-800 text-white   "
                      onClick={() => setIsOpen(!isOpen)}
                        
                      >
                        <User />
                        <span className="block sm:hidden w-full ">
                          Login
                        </span>

                      </NavLink>


                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;