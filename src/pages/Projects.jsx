import React, { useEffect, useState } from 'react';
import { useDeployment } from '../hooks/useDeployment';
import DeploymentForm from '../components/DeploymentForm';
import ProjectCard from '../components/ProjectCard';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const Projects = () => {
  const [showForm, setShowForm] = useState(false);
  const { projects, isLoadingProjects, refetchProjects } = useDeployment();
  const [isRefreshing, setIsRefreshing] = useState(false);


  useEffect(() => {
    refetchProjects();
  }, [refetchProjects]);


  const handleRefresh = async () => {
    setIsRefreshing(true);

    refetchProjects()
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);

  };
  if(isRefreshing){
    return <Loader message="Refreshing projects..." />
  }



  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
            <p className="text-gray-400">Manage and deploy your applications</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              onClick={handleRefresh}
              disabled={isLoadingProjects}
              className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <FiRefreshCw size={18} className={`mr-2 ${isLoadingProjects ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            >
              <FiPlus size={18} className="mr-2" />
              New Project
            </button>
          </div>
        </div>

        {/* Deployment Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <DeploymentForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {isLoadingProjects && projects.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <FiRefreshCw size={32} className="text-blue-400 animate-spin mr-3" />
            <span className="text-gray-400">Loading projects...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
              <p className="text-gray-400 mb-4">Create your first deployment to get started</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                <FiPlus size={18} className="mr-2" />
                Deploy Now
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;