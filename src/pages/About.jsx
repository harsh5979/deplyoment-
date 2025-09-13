import React from 'react';
import { FiCode, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';

const About = () => {
  const stats = [
    { icon: FiCode, value: '10K+', label: 'Deployments' },
    { icon: FiUsers, value: '1K+', label: 'Developers' },
    { icon: FiAward, value: '99.9%', label: 'Uptime' },
    { icon: FiTrendingUp, value: '50ms', label: 'Avg Response' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About <span className="text-blue-400">DeployHub</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're on a mission to simplify deployment for developers worldwide. 
            Our platform bridges the gap between your code and production environments.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map(({ icon: Icon, value, label }, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center hover:border-blue-500 transition-colors"
            >
              <Icon size={32} className="text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{value}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                DeployHub was created by developers, for developers. We understand the frustration 
                of complex deployment processes that slow down innovation.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our platform automates the entire deployment pipeline, from repository connection 
                to live application hosting, allowing you to focus on what matters most - building great software.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Built for Scale</h3>
              <p className="text-blue-100">
                Whether you're deploying a simple static site or a complex full-stack application, 
                our infrastructure scales with your needs.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Instant Deployments</h3>
            <p className="text-gray-400">
              Connect your GitHub repository and deploy instantly. Our optimized build process 
              ensures your applications go live in seconds.
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Real-time Monitoring</h3>
            <p className="text-gray-400">
              Track your deployments with live logs and status updates. Know exactly what's 
              happening during the build and deployment process.
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Global Infrastructure</h3>
            <p className="text-gray-400">
              Your applications are deployed on a global network of servers, ensuring fast 
              load times for users anywhere in the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;