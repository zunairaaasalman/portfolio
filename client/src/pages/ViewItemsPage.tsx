import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import DeleteModal from "@/components/ui/delete-modal";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@shared/schema";

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
  return d.toLocaleDateString();
};

export default function ViewItemsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const { toast } = useToast();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["/api/items"],
    queryFn: api.getProjects,
  });

  const deleteProjectMutation = useMutation({
    mutationFn: api.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      setProjectToDelete(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      deleteProjectMutation.mutate(projectToDelete._id);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <p className="text-slate-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900" data-testid="text-page-title">
            All Projects
          </h1>
          <p className="text-slate-600 mt-1">Manage and view all your portfolio projects</p>
        </div>
        <Link href="/add-item">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors" data-testid="button-add-new-project">
            <Plus className="inline mr-2 h-4 w-4" />
            Add New Project
          </button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              data-testid="input-search-projects"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            data-testid="select-status-filter"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="planning">Planning</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-600" data-testid="text-no-projects">
            {searchTerm || statusFilter !== "all" 
              ? "No projects match your search criteria." 
              : "No projects found. Create your first project!"
            }
          </p>
          {!searchTerm && statusFilter === "all" && (
            <Link href="/add-item">
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors" data-testid="button-create-first-project">
                <Plus className="inline mr-2 h-4 w-4" />
                Create Your First Project
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
              data-testid={`card-project-${project._id}`}
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  data-testid={`img-project-${project._id}`}
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-slate-900" data-testid={`text-project-title-${project._id}`}>
                    {project.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(project.status)}`}
                    data-testid={`status-project-${project._id}`}
                  >
                    {getStatusLabel(project.status)}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-4" data-testid={`text-project-description-${project._id}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.split(",").map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      data-testid={`tag-tech-${project._id}-${index}`}
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Link href={`/items/${project._id}`}>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium" data-testid={`button-view-${project._id}`}>
                        <Eye className="inline mr-1 h-3 w-3" />
                        View
                      </button>
                    </Link>
                    <Link href={`/edit-item/${project._id}`}>
                      <button className="text-slate-600 hover:text-slate-800 text-sm font-medium" data-testid={`button-edit-${project._id}`}>
                        <Edit className="inline mr-1 h-3 w-3" />
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteProject(project)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                      data-testid={`button-delete-${project._id}`}
                    >
                      <Trash2 className="inline mr-1 h-3 w-3" />
                      Delete
                    </button>
                  </div>
                  <span className="text-xs text-slate-500" data-testid={`text-project-date-${project._id}`}>
                    {formatDate(project.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteModal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${projectToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}
