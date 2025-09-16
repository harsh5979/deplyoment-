import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDeployment } from '../hooks/useDeployment';
import LogsViewer from '../components/LogsViewer';
import QRCodeGenerator from '../components/QRCodeGenerator';
import { FiArrowLeft, FiExternalLink, FiRefreshCw, FiGithub } from 'react-icons/fi';
import Loader from '../components/Loader';
import { Loader2 } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const { getProjects, useProjectLogs } = useDeployment();
  const [project, setProject] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);


  const fetchProject = async () => {
    const data = await getProjects(id);
    if (data) {
      setProject(data.project);
    }
  };
  useEffect(() => {
    fetchProject();
  }, [id]);
  useEffect(() => {
    if (!project) return;

    // Keep refreshing if status is neither running nor error
    if (project.status !== 'running' && project.status !== 'error') {
      const interval = setInterval(() => {
        fetchProject();
      }, 3000);

      return () => clearInterval(interval); // cleanup on unmount
    }
  }, [project]);


  const handleRefresh = async () => {
    setIsRefreshing(true);

    const data = await getProjects(id);
    if (data) {
      setProject(data.project);
    }
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);

  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-green-400 bg-green-400/10 border-green-400/20 ';
      case 'deploying': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'error': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'stopped': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  if (!project || isRefreshing) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw size={32} className="text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link
              to="/projects"
              className="flex items-center text-gray-400 hover:text-white mr-4"
            >
              <FiArrowLeft size={20} className="mr-1" />

            </Link>
            <div className=' ml-14'>
              <h1 className="text-2xl font-bold text-white">{project.appName}</h1>
              <div className="flex items-center mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border  flex  ${getStatusColor(project.status)}`}>
                  {project.status} {project.status === 'running' && (
                    <>
                      <span className="ml-2 inline-block w-2 h-2 bg-green-400 rounded-full animate-bounce "></span>
                      <span className="ml-2 inline-block w-2 h-2 bg-green-400 rounded-full animate-bounce delay-150 "></span>
                      <span className="ml-2 inline-block w-2 h-2 bg-green-400 rounded-full animate-bounce delay-400 "></span>
                    </>
                  )}{project.status === 'deploying' && (
                    <>
                      <span className="ml-3 flex w-auto items-center  rounded-full  ">
                        <Loader2 size={16} className="animate-spin  " />
                      </span>
                    </>
                  )}
                </span>
                {/* <span className="text-gray-400 ml-3">{project.type}</span> */}
              </div>
            </div>
          </div>
          <button
            onClick={() => handleRefresh()}
            className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <FiRefreshCw size={18} className="mr-2" />
            Refresh
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Info */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Project Information</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FiGithub size={18} className="text-gray-400 mr-3" />
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center"
                  >
                    {project.repoUrl}
                    <FiExternalLink size={14} className="ml-1" />
                  </a>
                </div>
                {project.domain && (
                  <div className="flex items-center">
                    <FiExternalLink size={18} className="text-gray-400 mr-3" />
                    <a
                      href={project.domain}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 flex items-center"
                    >
                      {project.domain}
                      <FiExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                )}
                {project.port && (
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-3">Port:</span>
                    <span className="text-white">{project.port}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Environment Variables */}
            {project.env && Object.keys(project.env).length > 0 && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Environment Variables</h2>
                <div className="space-y-2">
                  {Object.entries(project.env).map(([key, value]) => (
                    <div key={key} className="flex items-center bg-gray-700 rounded-lg p-3">
                      <span className="text-blue-400 font-mono mr-2">{key}:</span>
                      <span className="text-gray-300 font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deployment Logs */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Deployment Logs</h2>
              <LogsViewer projectId={project._id} status={project.status} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 ">
            {/* QR Code */}
            {project.domain && project.status === 'running' ? (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Access</h3>
                <QRCodeGenerator url={project.domain} />
                <p className="text-gray-400 text-sm text-center mt-3">
                  Scan to open your deployed application
                </p>
              </div>
            ) : (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex items-center justify-center h-64">
                <p className="text-red-400 text-center">
                  QR code will be available once the project is running successfully.
                </p>
              </div>
            )}

            {/* Deployment History */}
            {project.deployHistory && project.deployHistory.length > 0 && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Deployment History</h3>
                <div className="space-y-3">
                  {project.deployHistory.slice(0, 5).map((deploy, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                      <div>
                        <div className="text-sm text-white">{deploy.branch || 'main'}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(deploy.deployedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${deploy.status === 'success'
                        ? 'bg-green-400/10 text-green-400'
                        : 'bg-red-400/10 text-red-400'
                        }`}>
                        {deploy.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;