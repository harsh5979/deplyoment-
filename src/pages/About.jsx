import React from 'react';
import { FiCode, FiUsers, FiAward, FiTrendingUp, FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiReact, SiNodedotjs, SiDocker, SiNginx } from 'react-icons/si';

const About = () => {
  const stats = [
    { icon: FiCode, value: 'React.js', label: 'Frontend Framework' },
    { icon: SiNodedotjs, value: 'Node.js', label: 'Backend Runtime' },
    { icon: SiDocker, value: 'Docker', label: 'Containerization' },
    { icon: SiNginx, value: 'Nginx', label: 'Load Balancer' },
  ];

  const projectFeatures = [
    {
      title: 'Full-Stack Architecture',
      description: 'Complete application built with React.js frontend and Node.js backend, showcasing modern web development practices.',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js']
    },
    {
      title: 'DevOps Pipeline',
      description: 'Automated CI/CD pipeline with Docker containerization, Nginx load balancing, and cloud deployment orchestration.',
      technologies: ['Docker', 'Nginx', 'CI/CD', 'Cloud Deployment']
    },
    {
      title: 'Real-time Monitoring',
      description: 'Live deployment tracking with real-time logs, status monitoring, and performance analytics dashboard.',
      technologies: ['WebSockets', 'Real-time APIs', 'Monitoring', 'Analytics']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About <span className="text-blue-400">DeployHub</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            DeployHub is a comprehensive DevOps showcase platform designed to demonstrate modern 
            full-stack development and DevOps engineering capabilities. This project serves as 
            a portfolio piece showcasing expertise in React.js, Node.js, Docker, Nginx, and 
            complete CI/CD pipeline automation.
          </p>
          
          {/* Creator Section */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-r from-black/20 via-blue to-black/65 rounded-full flex items-center justify-center">
                <FiCode size={40} className="text-white" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Harsh Prajapati</h3>
                <p className="text-blue-400 font-semibold mb-3">Full Stack Developer & DevOps Engineer</p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a
                    href="https://github.com/harsh5979"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <FiGithub className="mr-2" size={18} />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/harsh-prajapati-a2089025b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <FiLinkedin className="mr-2" size={18} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map(({ icon: Icon, value, label }, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center hover:border-blue-500 transition-colors"
            >
              <Icon size={32} className="text-blue-400 mx-auto mb-3" />
              <div className="text-xl font-bold text-white mb-1">{value}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Project Purpose */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Project Purpose & Vision</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                DeployHub was created as a comprehensive portfolio project to showcase proficiency 
                in modern web development and DevOps practices. It demonstrates real-world 
                application architecture, deployment automation, and infrastructure management.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                The platform allows users to experience the complete deployment lifecycle - from 
                connecting GitHub repositories to watching applications go live with real-time monitoring.
              </p>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-300 font-semibold">
                  🎯 This is a showcase project - completely free to use for testing and demonstration purposes
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Built for Learning</h3>
              <p className="text-blue-100 mb-4">
                Experience modern DevOps workflows, containerization, and automated deployments 
                in a safe, educational environment.
              </p>
              <div className="text-4xl text-white">🚀</div>
            </div>
          </div>
        </div>

        {/* Project Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Technical Implementation</h2>
          <div className="space-y-8">
            {projectFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What You Can Do */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">What You Can Explore</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">GitHub Integration</h3>
              <p className="text-gray-400">Connect any public GitHub repository and trigger automated deployments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Environment Setup</h3>
              <p className="text-gray-400">Configure environment variables and deployment settings through the UI</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Live Monitoring</h3>
              <p className="text-gray-400">Watch deployments happen in real-time with live logs and status updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;