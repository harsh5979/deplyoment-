import React from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub, FiClock } from 'react-icons/fi';
import { SiReact, SiNodedotjs } from 'react-icons/si';

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'deploying': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'error': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'stopped': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
            {project.type === 'frontend' ? <SiReact size={20} /> : <SiNodedotjs size={20} />}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{project.appName}</h3>
            <div className="flex items-center mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <span className="text-gray-400 text-sm ml-2">{project.type}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Repository */}
      <div className="flex items-center text-gray-400 text-sm mb-3">
        <FiGithub size={16} className="mr-2" />
        <span className="truncate">{project.repoUrl.replace('https://github.com/', '')}</span>
      </div>

      {/* Domain */}
      {project.domain && (
        <div className="flex items-center text-green-400 text-sm mb-3">
          <FiExternalLink size={16} className="mr-2" />
          <a
            href={project.domain}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-300 truncate"
          >
            {project.domain.replace('https://', '')}
          </a>
        </div>
      )}

      {/* Last updated */}
      <div className="flex items-center text-gray-500 text-xs mb-4">
        <FiClock size={14} className="mr-2" />
        <span>Updated {formatDate(project.updatedAt)}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          to={`/projects/${project._id}`}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition-colors"
        >
          View Details
        </Link>
        {project.domain && (
          <a
            href={project.domain}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
          >
            <FiExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;