import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const Logout = () => {
  const { logout ,isLoading} = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();   
      navigate("/");    
    };

    handleLogout();
  }, [logout, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-lg">Logging out...</div>
      </div>
    );
    
  }
};

export default Logout;
