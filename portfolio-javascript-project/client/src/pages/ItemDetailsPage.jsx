import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation, Link } from "wouter";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ArrowLeft, Edit, Trash2, ExternalLink, Github, Eye, CheckCircle, Clock, AlertTriangle, Pause } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "date-fns";

export default function ItemDetailsPage() {
  const [, params] = useRoute("/items/:id");
  const [, setLocation] = useLocation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { toast } = useToast();
  const projectId = params?.id;

  const { data: project, isLoading, error } = useQuery({
    queryKey: ["/api/Projects", projectId],
    queryFn: () => api.getProject(projectId),
    enabled: !!projectId,
  });

  const deleteProjectMutation = useMutation({
    mutationFn: api.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/Projects"] });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      setLocation("/items");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "planning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "on-hold":
        return <Pause className="h-5 w-5 text-gray-600" />;
      default:
        return <Eye className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      case "on-hold":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "on-hold":
        return "On Hold";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const handleDeleteProject = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (project) {
      deleteProjectMutation.mutate(project._id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-slate-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600" data-testid="error-message">
        <p>Error loading project: {error.message}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center" data-testid="project-not-found">
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/items">
          <Button variant="outline" size="sm" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      {/* Project Header */}
      <Card className="bg-white border-slate-200">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Project Image */}
            {project.imageUrl && (
              <div className="lg:w-1/3">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-64 lg:h-48 object-cover rounded-lg border border-slate-200"
                  data-testid="img-project"
                />
              </div>
            )}
            
            {/* Project Details */}
            <div className={project.imageUrl ? "lg:w-2/3" : "w-full"}>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <h1 className="text-3xl font-bold text-slate-900" data-testid="text-project-title">
                    {project.title}
                  </h1>
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={`${getStatusColor(project.status)} flex items-center gap-1 px-3 py-1`}
                      data-testid="status-project"
                    >
                      {getStatusIcon(project.status)}
                      {getStatusLabel(project.status)}
                    </Badge>
                    <span className="text-slate-500 text-sm" data-testid="text-project-created">
                      Created {formatDate(project.createdAt, 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
                
                <p className="text-slate-700 leading-relaxed" data-testid="text-project-description">
                  {project.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link href={`/edit-item/${project._id}`}>
                    <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors" data-testid="button-edit-project">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteProject}
                    className="px-4 py-2"
                    data-testid="button-delete-project"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technologies */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">Technologies Used</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.technologies.split(",").map((tech, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-3 py-1 text-sm"
                data-testid={`tag-tech-${index}`}
              >
                {tech.trim()}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Links */}
      {(project.projectUrl || project.githubUrl) && (
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-900">Project Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  data-testid="link-project-url"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-colors"
                  data-testid="link-github-url"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Project Metadata */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">Project Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Project ID</p>
              <p className="text-slate-900" data-testid="text-project-id">
                {project._id}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Last Updated</p>
              <p className="text-slate-900" data-testid="text-project-updated">
                {formatDate(project.updatedAt, 'MMM d, yyyy \'at\' h:mm a')}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Status</p>
              <Badge 
                className={`${getStatusColor(project.status)} flex items-center gap-1 w-fit`}
                data-testid="status-project-full"
              >
                {getStatusIcon(project.status)}
                {getStatusLabel(project.status)}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Created On</p>
              <p className="text-slate-900" data-testid="text-project-created-full">
                {formatDate(project.createdAt, 'MMM d, yyyy \'at\' h:mm a')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent data-testid="dialog-delete-confirmation">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{project.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteProjectMutation.isPending}
              data-testid="button-confirm-delete"
            >
              {deleteProjectMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}