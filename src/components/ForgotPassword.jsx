import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiMail, FiArrowLeft, FiLoader, FiCheck } from 'react-icons/fi';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { forgotPasswordMutation, isSendingResetLink } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        forgotPasswordMutation.mutate(
            { email },
            {
                onSuccess: () => {
                    setIsSubmitted(true);
                },
            }
        );
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br py-8 from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
                    {/* Back to Login */}
                    <Link
                        to="/login"
                        className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6 group"
                    >
                        <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
                        Back to Login
                    </Link>

                    {!isSubmitted ? (
                        <>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <FiMail className="text-white" size={24} />
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
                                <p className="text-gray-400">
                                    No worries! Enter your email address and we'll send you a reset link.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSendingResetLink}
                                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"

                                >
                                    {isSendingResetLink ? (
                                        <>
                                            <FiLoader className="animate-spin mr-2" size={18} />
                                            Sending Reset Link...
                                        </>
                                    ) : (
                                        'Send Reset Link'
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        // Success State
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FiCheck className="text-white" size={24} />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">Check Your Email</h1>
                            <p className="text-gray-400 mb-6">
                                We've sent a password reset link to{' '}
                                <span className="text-white font-medium">{email}</span>
                            </p>
                            <p className="text-sm text-gray-500 mb-8">
                                Didn't receive the email? Check your spam folder or{' '}
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    try again
                                </button>
                            </p>
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                            >
                                Back to Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;