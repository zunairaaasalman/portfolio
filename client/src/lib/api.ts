import { apiRequest } from "./queryClient";
import type { Project, InsertProject } from "@shared/schema";

export const api = {
  // Get all projects
  getProjects: async (): Promise<Project[]> => {
    const response = await fetch('/api/items');
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return response.json();
  },

  // Get project by ID
  getProject: async (id: string): Promise<Project> => {
    const response = await fetch(`/api/items/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch project');
    }
    return response.json();
  },

  // Create new project
  createProject: async (project: InsertProject): Promise<Project> => {
    const response = await apiRequest('POST', '/api/items', project);
    return response.json();
  },

  // Update project
  updateProject: async (id: string, project: Partial<InsertProject>): Promise<Project> => {
    const response = await apiRequest('PUT', `/api/items/${id}`, project);
    return response.json();
  },

  // Delete project
  deleteProject: async (id: string): Promise<void> => {
    await apiRequest('DELETE', `/api/items/${id}`);
  },
};
