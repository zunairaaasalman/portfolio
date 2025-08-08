import express from "express";
import { createServer } from "http";
import { validateProject } from "../shared/validation.js";

export async function registerRoutes(app) {
  // GET /api/Projects - Get all projects
  app.get("/api/Projects", async (_req, res) => {
    try {
      const storage = globalThis.storage;
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // GET /api/Projects/:id - Get project by ID
  app.get("/api/Projects/:id", async (req, res) => {
    try {
      const storage = globalThis.storage;
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // POST /api/Projects - Create new project
  app.post("/api/Projects", async (req, res) => {
    try {
      const storage = globalThis.storage;
      const validation = validateProject(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid project data", 
          errors: validation.errors 
        });
      }
      
      const project = await storage.createProject(validation.data);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // PUT /api/Projects/:id - Update project
  app.put("/api/Projects/:id", async (req, res) => {
    try {
      const storage = globalThis.storage;
      const validation = validateProject(req.body, true); // partial validation for updates
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid project data", 
          errors: validation.errors 
        });
      }
      
      const updatedProject = await storage.updateProject(req.params.id, validation.data);
      
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  // DELETE /api/Projects/:id - Delete project
  app.delete("/api/Projects/:id", async (req, res) => {
    try {
      const storage = globalThis.storage;
      const deleted = await storage.deleteProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}