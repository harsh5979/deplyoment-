import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiZap, FiShield, FiGlobe } from 'react-icons/fi';

const Home = () => {
  const features = [
    {
      icon: FiZap,
      title: 'Lightning Fast',
      description: 'Deploy your applications in seconds with our optimized build pipeline.',
    },
    {
      icon: FiShield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee.',
    },
    {
      icon: FiGlobe,
      title: 'Global CDN',
      description: 'Your apps are served from edge locations worldwide for optimal performance.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Deploy with Confidence
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your code into live applications instantly. Connect your GitHub repository 
            and watch your projects come to life in the cloud.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            >
              Start Deploying
              <FiArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose DeployHub?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Built for developers who value speed, security, and simplicity in their deployment workflow.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800 border-t border-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Deploy?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join thousands of developers who trust DeployHub for their deployment needs.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            Get Started Now
            <FiArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;