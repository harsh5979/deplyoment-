import React, { Suspense, useEffect, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import AuthGuard from './components/AuthGuard';
import Mainloader from './components/MainLoader';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { useAuthStore } from './stores/authStore';

const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const VerifyEmail = lazy(() => import('./components/VerifyEmail'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Logout = lazy(() => import('./pages/Logout'));

// Create a client




function App() {
  const [loading, setLoading] = useState(true);
  const { isCheckingAuth, checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    // Function to handle keydown events
    const handleKeyDown = (e) => {
      if (
        // e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.shiftKey && e.key === "i") ||
        (e.ctrlKey && e.shiftKey && e.key === "j") ||
        (e.ctrlKey && e.key === "U") ||
        (e.altKey && e.type == "click" && e.button === 0)
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Function to handle context menu (right-click)
    const handleContextMenu = (e) => {
      e.preventDefault(); // Prevent right-click
    };

    // Add event listeners for keydown and context menu events
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    });

    // Clean up event listeners on component unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <Mainloader />;
  }
  if (isCheckingAuth) {
    return <Mainloader />;

  }

  return (
    <MainContent />
  );




}
function MainContent() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <main className="pt-16">

          <Suspense fallback={<Mainloader />} className="no-scrollbar">
            <Routes>

              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />



              {/* Protected routes */}
              <Route path='/*' element={
                <AuthGuard>
                  <Routes>

                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                  </Routes>
                </AuthGuard>
              } />

            </Routes>
          </Suspense>
        </main>
      </div>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;