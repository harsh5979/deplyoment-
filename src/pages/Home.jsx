import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiZap, 
  FiShield, 
  FiGlobe, 
  FiGithub, 
  FiPlay,
  FiCode,
  FiServer,
  FiMonitor,
  FiSettings
} from 'react-icons/fi';
import { 
  SiReact, 
  SiNodedotjs, 
  SiDocker, 
  SiNginx, 
  SiKubernetes,
  SiJenkins,
  SiAwslambda 
} from 'react-icons/si';

const Home = () => {
  const features = [
    {
      icon: FiZap,
      title: 'Lightning Fast Deployment',
      description: 'Deploy your applications in seconds with our optimized CI/CD pipeline powered by Docker and Kubernetes.',
    },
    {
      icon: FiShield,
      title: 'Enterprise Security',
      description: 'Built-in security scanning, SSL certificates, and environment isolation for production-ready deployments.',
    },
    {
      icon: FiGlobe,
      title: 'Global Edge Network',
      description: 'Your apps are served from edge locations worldwide with Nginx load balancing for optimal performance.',
    },
    {
      icon: FiMonitor,
      title: 'Real-time Monitoring',
      description: 'Live deployment logs, health checks, and performance metrics with automated rollback capabilities.',
    },
    {
      icon: FiSettings,
      title: 'Environment Management',
      description: 'Seamless environment variable management with secure secret handling and configuration versioning.',
    },
    {
      icon: FiServer,
      title: 'Auto-scaling Infrastructure',
      description: 'Automatic horizontal scaling based on traffic with container orchestration and load distribution.',
    },
  ];

  const techStack = [
    { icon: SiReact, name: 'React.js', color: 'text-blue-400' },
    { icon: SiNodedotjs, name: 'Node.js', color: 'text-green-400' },
    { icon: SiDocker, name: 'Docker', color: 'text-blue-500' },
    { icon: SiNginx, name: 'Nginx', color: 'text-green-500' },
    { icon: SiKubernetes, name: 'Kubernetes', color: 'text-blue-600' },
    { icon: SiJenkins, name: 'Jenkins', color: 'text-orange-400' },
    { icon: SiAwslambda , name: 'AWS', color: 'text-yellow-400' },
  ];

  const deploymentSteps = [
    {
      step: '01',
      title: 'Connect Repository',
      description: 'Link your GitHub repository with a single click',
      icon: FiGithub,
    },
    {
      step: '02',
      title: 'Configure Environment',
      description: 'Set environment variables and deployment settings',
      icon: FiSettings,
    },
    {
      step: '03',
      title: 'Deploy & Monitor',
      description: 'Watch your app go live with real-time deployment logs',
      icon: FiPlay,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
              <FiZap className="mr-2" size={16} />
              Professional DevOps Platform
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Deploy with DevOps Excellence
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            A comprehensive DevOps platform showcasing modern deployment practices. 
            Built with React.js, Node.js, Docker, Nginx, and Kubernetes to demonstrate 
            enterprise-grade CI/CD capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/projects"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Start Free Deployment
              <FiArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300 hover:bg-gray-800/50"
            >
              <FiCode className="mr-2" size={20} />
              View Architecture
            </Link>
          </div>
          
          {/* Free Tier Highlight */}
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-green-400 mb-2">🎉 Free Tier Available</h3>
            <p className="text-gray-300">
              Deploy one project for free! Perfect for testing our platform and showcasing your applications. 
              No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built with Modern DevOps Stack
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Leveraging industry-leading technologies for scalable, secure, and efficient deployments
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {techStack.map(({ icon: Icon, name, color }, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105"
              >
                <Icon size={40} className={`${color} mx-auto mb-3`} />
                <div className="text-white font-medium text-sm">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple 3-Step Deployment
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From code to production in minutes with our streamlined DevOps pipeline
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {deploymentSteps.map(({ step, title, description, icon: Icon }, index) => (
              <div
                key={index}
                className="relative bg-gray-800 border border-gray-700 rounded-xl p-8 text-center hover:border-blue-500 transition-all duration-300"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step}
                </div>
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                  <Icon size={32} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
                <p className="text-gray-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Professional DevOps capabilities that scale from personal projects to enterprise applications
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Showcase Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                DevOps Skills Demonstration
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                This platform showcases comprehensive DevOps expertise through practical implementation
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
                <SiReact size={32} className="text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Frontend Development</h4>
                <p className="text-gray-400 text-sm">Modern React.js with hooks, routing, and state management</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
                <SiNodedotjs size={32} className="text-green-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Backend Architecture</h4>
                <p className="text-gray-400 text-sm">Scalable Node.js APIs with microservices design</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
                <SiDocker size={32} className="text-blue-500 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Containerization</h4>
                <p className="text-gray-400 text-sm">Docker containers with multi-stage builds</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
                <SiNginx size={32} className="text-green-500 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Load Balancing</h4>
                <p className="text-gray-400 text-sm">Nginx reverse proxy and load balancing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800 border-t border-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Experience Modern DevOps?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Deploy your first project for free and see the power of professional DevOps automation in action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Deploy Now - Free Tier
              <FiArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300 hover:bg-gray-800/50"
            >
              <FiGithub className="mr-2" size={20} />
              View Source Code
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;