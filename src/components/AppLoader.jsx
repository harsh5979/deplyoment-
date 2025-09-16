import React from "react";
import Loader from "./Loader";
import { useAuth } from "../hooks/useAuth";
import { useDeployment } from "../hooks/useDeployment";
import { useAuthStore } from "../stores/authStore";

const AppLoader = () => {
  const {
    isLoggingIn,
    isRegistering,
    isLoggingOut,
    isVerifyingOtp,
    isRegeneratingOtp,
    isSendingResetLink,
    isResettingPassword,
    isGoogleAuth,
    isPendingProjects
  } = useAuth();

  const { isDeploying, isLoadingProjects } = useDeployment();
  const {isCheckingAuth,isLoading}= useAuthStore();

  const loadingState =
    isLoggingIn ? "Logging in..." :
    isRegistering ? "Registering account..." :
    isLoggingOut ? "Logging out..." :
    isVerifyingOtp ? "Verifying OTP..." :
    isRegeneratingOtp ? "Sending new OTP..." :
    isSendingResetLink ? "Sending reset link..." :
    isResettingPassword ? "Resetting password..." :
    isGoogleAuth ? "Signing in with Google..." :
    isLoadingProjects ? "Fetching your projects..." :
    isPendingProjects ? "Fetching your projects..." :
    isDeploying ? "Deploying your app..." :
    isCheckingAuth ? "Loading..." :
    isLoading ? "Loading..." :
    null;

  if (!loadingState) return null;

  return <Loader message={loadingState} />;
};

export default AppLoader;
