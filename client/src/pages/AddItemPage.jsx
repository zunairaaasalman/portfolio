import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const validateProject = (data) => {
  const errors = {};
  
  if (!data.title || data.title.trim() === "") {
    errors.title = "Title is required";
  }
  
  if (!data.description || data.description.trim() === "") {
    errors.description = "Description is required";
  }
  
  if (!data.technologies || data.technologies.trim() === "") {
    errors.technologies = "Technologies are required";
  }
  
  if (data.projectUrl && data.projectUrl !== "") {
    try {
      new URL(data.projectUrl);
    } catch {
      errors.projectUrl = "Must be a valid URL";
    }
  }
  
  if (data.githubUrl && data.githubUrl !== "") {
    try {
      new URL(data.githubUrl);
    } catch {
      errors.githubUrl = "Must be a valid URL";
    }
  }
  
  if (data.imageUrl && data.imageUrl !== "") {
    try {
      new URL(data.imageUrl);
    } catch {
      errors.imageUrl = "Must be a valid URL";
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default function AddItemPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    projectUrl: "",
    githubUrl: "",
    status: "planning",
    imageUrl: "",
  });
  
  const [errors, setErrors] = useState({});

  const createProjectMutation = useMutation({
    mutationFn: api.createProject,
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ["/api/Projects"] });
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      setLocation(`/items/${newProject._id}`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateProject(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    createProjectMutation.mutate(formData);
  };

  const handleCancel = () => {
    setLocation("/items");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCancel}
          data-testid="button-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        <h1 className="text-3xl font-bold text-slate-900" data-testid="page-title">
          Add New Project
        </h1>
      </div>

      {/* Form */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Project Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                Project Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter project title"
                className={errors.title ? "border-red-500" : ""}
                data-testid="input-title"
              />
              {errors.title && (
                <p className="text-sm text-red-600" data-testid="error-title">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-slate-700">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your project"
                rows={4}
                className={errors.description ? "border-red-500" : ""}
                data-testid="textarea-description"
              />
              {errors.description && (
                <p className="text-sm text-red-600" data-testid="error-description">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <Label htmlFor="technologies" className="text-sm font-medium text-slate-700">
                Technologies Used *
              </Label>
              <Input
                id="technologies"
                value={formData.technologies}
                onChange={(e) => handleInputChange("technologies", e.target.value)}
                placeholder="e.g., React, Node.js, MongoDB (comma-separated)"
                className={errors.technologies ? "border-red-500" : ""}
                data-testid="input-technologies"
              />
              {errors.technologies && (
                <p className="text-sm text-red-600" data-testid="error-technologies">
                  {errors.technologies}
                </p>
              )}
              <p className="text-xs text-slate-500">
                Separate multiple technologies with commas
              </p>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium text-slate-700">
                Project Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger data-testid="select-status">
                  <SelectValue placeholder="Select project status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Project URL */}
            <div className="space-y-2">
              <Label htmlFor="projectUrl" className="text-sm font-medium text-slate-700">
                Project URL
              </Label>
              <Input
                id="projectUrl"
                type="url"
                value={formData.projectUrl || ""}
                onChange={(e) => handleInputChange("projectUrl", e.target.value)}
                placeholder="https://your-project.com"
                className={errors.projectUrl ? "border-red-500" : ""}
                data-testid="input-project-url"
              />
              {errors.projectUrl && (
                <p className="text-sm text-red-600" data-testid="error-project-url">
                  {errors.projectUrl}
                </p>
              )}
            </div>

            {/* GitHub URL */}
            <div className="space-y-2">
              <Label htmlFor="githubUrl" className="text-sm font-medium text-slate-700">
                GitHub URL
              </Label>
              <Input
                id="githubUrl"
                type="url"
                value={formData.githubUrl || ""}
                onChange={(e) => handleInputChange("githubUrl", e.target.value)}
                placeholder="https://github.com/username/repository"
                className={errors.githubUrl ? "border-red-500" : ""}
                data-testid="input-github-url"
              />
              {errors.githubUrl && (
                <p className="text-sm text-red-600" data-testid="error-github-url">
                  {errors.githubUrl}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-sm font-medium text-slate-700">
                Project Image URL
              </Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl || ""}
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={errors.imageUrl ? "border-red-500" : ""}
                data-testid="input-image-url"
              />
              {errors.imageUrl && (
                <p className="text-sm text-red-600" data-testid="error-image-url">
                  {errors.imageUrl}
                </p>
              )}
              <p className="text-xs text-slate-500">
                Optional: Add a screenshot or preview image
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                disabled={createProjectMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="button-save"
              >
                <Save className="mr-2 h-4 w-4" />
                {createProjectMutation.isPending ? "Creating..." : "Create Project"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
                data-testid="button-cancel"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}