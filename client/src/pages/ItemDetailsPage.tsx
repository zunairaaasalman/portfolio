import { useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Edit, Trash2, ExternalLink, Github, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import DeleteModal from "@/components/ui/delete-modal";

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-emerald-100 text-emerald-800";
    case "in-progress":
      return "bg-amber-100 text-amber-800";
    case "planning":
      return "bg-slate-100 text-slate-800";
    case "on-hold":
      return "bg-red-100 text-red-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "in-progress":
      return "In Progress";
    case "on-hold":
      return "On Hold";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function ItemDetailsPage() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/items/:id");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { toast } = useToast();

  const projectId = params?.id;

  const { data: project, isLoading, error } = useQuery({
    queryKey: ["/api/items", projectId],
    queryFn: () => api.getProject(projectId!),
    enabled: !!projectId,
  });

  const deleteProjectMutation = useMutation({
    mutationFn: api.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      setLocation("/items");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  const handleDeleteProject = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (project) {
      deleteProjectMutation.mutate(project.id);
    }
  };

  if (!match) {
    return <div>Project not found</div>;
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <p className="text-slate-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <p className="text-red-600">Failed to load project</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link href="/items">
                <a className="text-slate-500 hover:text-slate-700" data-testid="link-breadcrumb-projects">
                  Projects
                </a>
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </li>
            <li className="text-slate-900 font-medium" data-testid="text-breadcrumb-current">
              {project.title}
            </li>
          </ol>
        </nav>

        {/* Project Header */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8">
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-64 sm:h-80 object-cover"
              data-testid="img-project-main"
            />
          )}
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2" data-testid="text-project-title">
                  {project.title}
                </h1>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(project.status)}`}
                    data-testid="status-project"
                  >
                    {getStatusLabel(project.status)}
                  </span>
                  <span className="text-slate-500 text-sm" data-testid="text-project-created">
                    Created {formatDate(project.createdAt!)}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link href={`/edit-item/${project.id}`}>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors" data-testid="button-edit-project">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </button>
                </Link>
                <button
                  onClick={handleDeleteProject}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
                  data-testid="button-delete-project"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>

            {/* Project Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Description</h2>
              <p className="text-slate-600 leading-relaxed" data-testid="text-project-description">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.split(",").map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                    data-testid={`tag-technology-${index}`}
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  data-testid="link-project-live"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Project
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                  data-testid="link-project-github"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Metadata */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Project Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Project ID</p>
              <p className="text-slate-900" data-testid="text-project-id">
                {project.id}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Last Updated</p>
              <p className="text-slate-900" data-testid="text-project-updated">
                {formatDate(project.updatedAt!)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Status</p>
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(project.status)}`}
                data-testid="status-project-info"
              >
                {getStatusLabel(project.status)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Created On</p>
              <p className="text-slate-900" data-testid="text-project-created-full">
                {formatDate(project.createdAt!)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${project.title}"? This action cannot be undone.`}
      />
    </div>
  );
}
