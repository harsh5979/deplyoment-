import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deploymentAPI } from '../services/api';
import { useDeploymentStore } from '../stores/deploymentStore';
import { toast } from 'react-hot-toast';

export const useDeployment = () => {
  const queryClient = useQueryClient();
  const { setProjects, addProject, updateProject, addLog } = useDeploymentStore();

  // Get user projects
  const {
    data: projectsData,
    isLoading: isLoadingProjects,
    isFetching: isFetchingProjects,
    refetch: refetchProjects,
  } = useQuery({
    queryKey: ['projects'],
    enabled: false,
    queryFn: deploymentAPI.getProjects,

    onSuccess: (data) => {
      setProjects(data.data.projects);
    },
    onError: (error) => {
      toast.error('Failed to fetch projects');
    },
  });
  const getProjects = async (projectId) => {
    try {
      const res = await deploymentAPI.getOneProject(projectId);
      return res.data;
    } catch (error) {
      toast.error('Failed to fetch project');
    }
  };

  // Deploy project mutation
  const deployMutation = useMutation({
    mutationFn: deploymentAPI.deploy,
    onSuccess: (data) => {
      const newProject = {
        _id: data.data.projectId,
        appName: data.data.appName || 'New Project',
        status: 'deploying',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addProject(newProject);
      queryClient.invalidateQueries(['projects']);
      toast.success('Deployment started successfully!');

      // Start polling for project status
      startStatusPolling(data.data.projectId);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Deployment failed');
    },
  });

  // Function to start polling project status
  const startStatusPolling = (projectId) => {
    const pollInterval = setInterval(async () => {
      try {
        const updatedProjects = await deploymentAPI.getProjects();
        const project = updatedProjects.data.projects.find(p => p._id === projectId);

        if (project) {
          updateProject(projectId, project);

          // Stop polling if deployment is complete
          if (project.status === 'running' || project.status === 'error') {
            clearInterval(pollInterval);

            if (project.status === 'running') {
              toast.success(`${project.appName} deployed successfully!`);
            } else if (project.status === 'error') {
              toast.error(`${project.appName} deployment failed!`);
            }
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
        clearInterval(pollInterval);
      }
    }, 3000); // Poll every 3 seconds

    // Clear interval after 5 minutes to prevent infinite polling
    setTimeout(() => {
      clearInterval(pollInterval);
    }, 300000);
  };

  // Get project logs
  const useProjectLogs = (projectId, status, autoRefresh = true) => {
    return useQuery({
      queryKey: ['logs', projectId],
      queryFn: () => deploymentAPI.getProjectLogs(projectId),
      enabled: !!projectId,
      refetchInterval: autoRefresh && status === 'deploying' ? 5000 : false,
      onSuccess: (data) => {
        // Update logs in store if needed
      },
      onError: (error) => {
        console.error('Failed to fetch logs:', error);
      },
    });
  };

  // ✅ Update project mutation
  const updateMutation = useMutation({
    mutationFn: ({ projectId, data }) => deploymentAPI.updateProject(projectId, data),
    onSuccess: (res, variables) => {
      updateProject(variables.projectId, res.data.project);
      queryClient.invalidateQueries(['projects']);
      toast.success('Project updated successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Update failed');
    },
  });
   const pauseMutation = useMutation({
    mutationFn: (projectId) => deploymentAPI.pauseProject(projectId),
    onSuccess: (_, projectId) => {
      queryClient.setQueryData(['projects'], (oldData) => {
        if (!oldData?.data?.projects) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            projects: oldData.data.projects.map(p =>
              p._id === projectId ? { ...p, status: 'paused' } : p
            ),
          },
        };
      });
      toast.success('Project paused successfully');
    },
    onError: () => toast.error('Failed to pause project'),
  });

    // Delete project mutation
  const deleteMutation = useMutation({
    mutationFn: (projectId) => deploymentAPI.deleteProject(projectId),
    onSuccess: (_, projectId) => {
      // Update the cached projects directly
      queryClient.setQueryData(['projects'], (oldData) => {
        if (!oldData?.data?.projects) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            projects: oldData.data.projects.filter(p => p._id !== projectId),
          }
        };
      });

      toast.success('Project deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete project');
    },
  });



  return {
    // Queries
    projects: projectsData?.data?.projects || [],
    isLoadingProjects,
    isPendingProjects: isLoadingProjects || isFetchingProjects,
    refetchProjects,
    useProjectLogs,
    getProjects,

    deployMutation,
    updateMutation,
    deleteMutation,
    pauseMutation,

    // Mutations
    deployMutation,

    // Mutation states
    isDeploying: deployMutation.isPending,

    // Helper functions
    startStatusPolling,
  };
};