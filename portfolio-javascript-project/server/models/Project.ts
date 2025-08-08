import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: {
    type: String,
    required: true
  },
  projectUrl: {
    type: String,
    default: ""
  },
  githubUrl: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["planning", "in-progress", "completed", "on-hold"],
    default: "planning"
  },
  imageUrl: {
    type: String,
    default: ""
  }
}, {
  timestamps: true // This automatically adds createdAt and updatedAt fields
});

export const ProjectModel = mongoose.model("Project", projectSchema);