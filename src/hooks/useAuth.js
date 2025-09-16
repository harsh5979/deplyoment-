import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '../services/api';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { setUser, setLoading, login, logout } = useAuthStore();

  

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      login(data.data.user);
      queryClient.invalidateQueries(['auth']);
      toast.success('Login successful!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      login(data.data.user);
      toast.success('Registration successful! Please verify your email.');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Registration failed');
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.success('Logged out successfully');
    },
    onError: (error) => {
      logout(); // Logout anyway
      toast.error('Logout failed');
    },
  });

  // Verify OTP mutation
  const verifyOtpMutation = useMutation({
    mutationFn: authAPI.verifyOtp,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['auth']);
      toast.success('Email verified successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'OTP verification failed');
    },
  });

  // Regenerate OTP mutation
  const regenerateOtpMutation = useMutation({
    mutationFn: authAPI.regenerateOtp,
    onSuccess: () => {
      toast.success('New OTP sent to your email');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to send OTP');
    },
  });

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: authAPI.forgotPassword,
    onSuccess: () => {
      toast.success('Reset password link sent to your email');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
    },
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }) => authAPI.resetPassword(token, { password }),
    onSuccess: () => {
      toast.success('Password reset successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Password reset failed');
    },
  });

  // Google auth mutation
  const googleAuthMutation = useMutation({
    mutationFn: authAPI.googleAuth,
    onSuccess: (data) => {
      login(data.data.user);
      queryClient.invalidateQueries(['auth']);
      toast.success('Google login successful!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Google login failed');
    },
  });

  return {
    
    
    
    // Mutations
    loginMutation,
    registerMutation,
    logoutMutation,
    verifyOtpMutation,
    regenerateOtpMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    googleAuthMutation,
    
    // Mutation states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isLoading,
    isLoggingOut: logoutMutation.isLoading,
    isVerifyingOtp: verifyOtpMutation.isLoading,
    isRegeneratingOtp: regenerateOtpMutation.isLoading,
    isSendingResetLink: forgotPasswordMutation.isLoading,
    isResettingPassword: resetPasswordMutation.isLoading,
    isGoogleAuth: googleAuthMutation.isLoading,
  };
};