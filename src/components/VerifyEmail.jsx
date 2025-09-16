import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../stores/authStore';
import { FiMail, FiLoader, FiRefreshCw } from 'react-icons/fi';
import { Navigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const { user, isAuthenticated } = useAuthStore();
  const { 
    verifyOtpMutation, 
    regenerateOtpMutation, 
    isVerifyingOtp, 
    isRegeneratingOtp 
  } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyOtpMutation.mutate({
      email: user.email,
      otp: parseInt(otp),
    });
  };

  const handleResendOtp = () => {
    regenerateOtpMutation.mutate({
      email: user.email,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FiMail className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
            <p className="text-gray-400">
              We've sent a 6-digit code to{' '}
              <span className="text-blue-400">{user?.email}</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                required
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-center text-2xl tracking-widest placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                placeholder="000000"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifyingOtp || otp.length !== 6}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              {isVerifyingOtp ? (
                <>
                  <FiLoader className="animate-spin mr-2" size={18} />
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 mb-3">Didn't receive the code?</p>
            <button
              onClick={handleResendOtp}
              disabled={isRegeneratingOtp}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center justify-center mx-auto"
            >
              {isRegeneratingOtp ? (
                <>
                  <FiLoader className="animate-spin mr-2" size={16} />
                  Sending...
                </>
              ) : (
                <>
                  <FiRefreshCw className="mr-2" size={16} />
                  Resend Code
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;