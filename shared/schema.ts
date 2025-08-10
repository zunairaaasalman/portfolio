import { z } from "zod";

// MongoDB Project Schema
export const insertProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.string().min(1, "Technologies are required"),
  projectUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["planning", "in-progress", "completed", "on-hold"]).default("planning"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string;
  projectUrl?: string;
  githubUrl?: string;
  status: "planning" | "in-progress" | "completed" | "on-hold";
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// User schema (keeping for future use)
export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

export interface User {
  _id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
