import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { FiLoader } from 'react-icons/fi';


const AuthGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
    // useEffect(() => {
    //   checkAuth();
    // }, [checkAuth]);
    // if (isCheckingAuth) return <p>Checking session...</p>;

  // if (isCheckingAuth) {
  //   return (
  //     <div className="min-h-screen bg-gray-900 flex items-center justify-center">
  //       <div className="text-center">
  //         <FiLoader size={32} className="text-blue-400 animate-spin mx-auto mb-4" />
  //         <p className="text-gray-400">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (!user && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && !user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

export default AuthGuard;