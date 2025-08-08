const API_BASE = '';

// Generic API request function
const apiRequest = async (method, url, data = null) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(API_BASE + url, config);
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Network response was not ok');
  }
  
  return response;
};

export const api = {
  // Get all projects
  getAllProjects: async () => {
    const response = await fetch('/api/Projects');
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return response.json();
  },

  // Get project by ID
  getProject: async (id) => {
    const response = await fetch(`/api/Projects/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch project');
    }
    return response.json();
  },

  // Create new project
  createProject: async (project) => {
    const response = await apiRequest('POST', '/api/Projects', project);
    return response.json();
  },

  // Update project
  updateProject: async (id, project) => {
    const response = await apiRequest('PUT', `/api/Projects/${id}`, project);
    return response.json();
  },

  // Delete project
  deleteProject: async (id) => {
    await apiRequest('DELETE', `/api/Projects/${id}`);
  },
};