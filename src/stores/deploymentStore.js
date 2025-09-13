import { create } from 'zustand';

export const useDeploymentStore = create((set, get) => ({
  projects: [],
  selectedProject: null,
  deploymentLogs: {},
  
  setProjects: (projects) => set({ projects }),
  
  addProject: (project) => set((state) => ({
    projects: [project, ...state.projects]
  })),
  
  updateProject: (projectId, updates) => set((state) => ({
    projects: state.projects.map(p => 
      p._id === projectId ? { ...p, ...updates } : p
    )
  })),
  
  setSelectedProject: (project) => set({ selectedProject: project }),
  
  addLog: (projectId, log) => set((state) => ({
    deploymentLogs: {
      ...state.deploymentLogs,
      [projectId]: [...(state.deploymentLogs[projectId] || []), log]
    }
  })),
  
  setLogs: (projectId, logs) => set((state) => ({
    deploymentLogs: {
      ...state.deploymentLogs,
      [projectId]: logs
    }
  })),
  
  clearLogs: (projectId) => set((state) => ({
    deploymentLogs: {
      ...state.deploymentLogs,
      [projectId]: []
    }
  })),
}));