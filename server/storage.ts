import { type User, type InsertUser, type Project, type InsertProject } from "@shared/schema";
import { ProjectModel } from "./models/Project";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
}

export class MongoStorage implements IStorage {
  // User methods (placeholder for future implementation)
  async getUser(id: string): Promise<User | undefined> {
    // TODO: Implement user functionality when needed
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // TODO: Implement user functionality when needed
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // TODO: Implement user functionality when needed
    throw new Error("User creation not implemented");
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    try {
      const projects = await ProjectModel.find().sort({ createdAt: -1 }).lean();
      return projects.map(project => ({
        ...project,
        _id: project._id.toString()
      })) as Project[];
    } catch (error) {
      console.error("Error getting projects:", error);
      return [];
    }
  }

  async getProject(id: string): Promise<Project | undefined> {
    try {
      const project = await ProjectModel.findById(id).lean();
      if (!project) return undefined;
      
      return {
        ...project,
        _id: project._id.toString()
      } as Project;
    } catch (error) {
      console.error("Error getting project:", error);
      return undefined;
    }
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    try {
      const project = new ProjectModel(insertProject);
      const savedProject = await project.save();
      
      return {
        ...savedProject.toObject(),
        _id: savedProject._id.toString()
      } as Project;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }

  async updateProject(id: string, updateProject: Partial<InsertProject>): Promise<Project | undefined> {
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
      } as Project;
    } catch (error) {
      console.error("Error updating project:", error);
      return undefined;
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    try {
      const result = await ProjectModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error("Error deleting project:", error);
      return false;
    }
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const _id = randomUUID();
    const now = new Date();
    const user: User = { ...insertUser, _id, createdAt: now, updatedAt: now };
    this.users.set(_id, user);
    return user;
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const _id = randomUUID();
    const now = new Date();
    const project: Project = { 
      ...insertProject,
      _id, 
      createdAt: now, 
      updatedAt: now,
      status: insertProject.status || "planning"
    };
    this.projects.set(_id, project);
    return project;
  }

  async updateProject(id: string, updateProject: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    if (!existingProject) {
      return undefined;
    }
    
    const updatedProject: Project = {
      ...existingProject,
      ...updateProject,
      updatedAt: new Date(),
    };
    
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }
}

// Export storage instance - will use MongoDB if available, otherwise fallback to memory
export let storage: IStorage;
