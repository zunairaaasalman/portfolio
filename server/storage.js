import { ProjectModel } from "./models/Project.js";
import { randomUUID } from "crypto";

export class MongoStorage {
  // User methods (placeholder for future implementation)
  async getUser(id) {
    // TODO: Implement user functionality when needed
    return undefined;
  }

  async getUserByUsername(username) {
    // TODO: Implement user functionality when needed
    return undefined;
  }

  async createUser(insertUser) {
    // TODO: Implement user functionality when needed
    throw new Error("User creation not implemented");
  }

  // Project methods
  async getAllProjects() {
    try {
      const projects = await ProjectModel.find().sort({ createdAt: -1 }).lean();
      return projects.map(project => ({
        ...project,
        _id: project._id.toString()
      }));
    } catch (error) {
      console.error("Error getting projects:", error);
      return [];
    }
  }

  async getProject(id) {
    try {
      const project = await ProjectModel.findById(id).lean();
      if (!project) return undefined;
      
      return {
        ...project,
        _id: project._id.toString()
      };
    } catch (error) {
      console.error("Error getting project:", error);
      return undefined;
    }
  }

  async createProject(insertProject) {
    try {
      const project = new ProjectModel(insertProject);
      const savedProject = await project.save();
      
      return {
        ...savedProject.toObject(),
        _id: savedProject._id.toString()
      };
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }

  async updateProject(id, updateProject) {
    try {
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        id,
        { ...updateProject, updatedAt: new Date() },
        { new: true, lean: true }
      );
      
      if (!updatedProject) return undefined;
      
      return {
        ...updatedProject,
        _id: updatedProject._id.toString()
      };
    } catch (error) {
      console.error("Error updating project:", error);
      return undefined;
    }
  }

  async deleteProject(id) {
    try {
      const result = await ProjectModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error("Error deleting project:", error);
      return false;
    }
  }
}

export class MemStorage {
  constructor() {
    this.users = new Map();
    this.projects = new Map();
  }

  // User methods
  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser) {
    const _id = randomUUID();
    const now = new Date();
    const user = { ...insertUser, _id, createdAt: now, updatedAt: now };
    this.users.set(_id, user);
    return user;
  }

  // Project methods
  async getAllProjects() {
    return Array.from(this.projects.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getProject(id) {
    return this.projects.get(id);
  }

  async createProject(insertProject) {
    const _id = randomUUID();
    const now = new Date();
    const project = { 
      ...insertProject,
      _id, 
      createdAt: now, 
      updatedAt: now,
      status: insertProject.status || "planning"
    };
    this.projects.set(_id, project);
    return project;
  }

  async updateProject(id, updateProject) {
    const existingProject = this.projects.get(id);
    if (!existingProject) {
      return undefined;
    }
    
    const updatedProject = {
      ...existingProject,
      ...updateProject,
      updatedAt: new Date(),
    };
    
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id) {
    return this.projects.delete(id);
  }
}