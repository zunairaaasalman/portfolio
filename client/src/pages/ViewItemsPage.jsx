import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Edit, Trash2, Plus, Filter, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "date-fns";

export default function ViewItemsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projectToDelete, setProjectToDelete] = useState(null);
  const { toast } = useToast();

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ["/api/Projects"],
    queryFn: () => api.getAllProjects(),
  });

  const deleteProjectMutation = useMutation({
    mutationFn: api.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/Projects"] });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      setProjectToDelete(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleDeleteProject = (project) => {
    setProjectToDelete(project);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      deleteProjectMutation.mutate(projectToDelete._id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-slate-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600" data-testid="error-message">
        <p>Error loading projects: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900" data-testid="page-title">
          All Projects ({filteredProjects.length})
        </h1>
        <Link href="/add-item">
          <Button className="bg-blue-600 hover:bg-blue-700" data-testid="button-add-project">
            <Plus className="mr-2 h-4 w-4" />
            Add New Project
          </Button>
        </Link>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search projects by title, description, or technology..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="input-search"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-600" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48" data-testid="select-status-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card className="bg-white border-slate-200">
          <CardContent className="text-center py-12">
            <FolderOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2" data-testid="text-no-projects">
              {searchTerm || statusFilter !== "all" ? "No projects match your criteria" : "No projects yet"}
            </h3>
            <p className="text-slate-600 mb-4" data-testid="text-no-projects-description">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search terms or filters."
                : "Get started by creating your first portfolio project."
              }
            </p>
            {!(searchTerm || statusFilter !== "all") && (
              <Link href="/add-item">
                <Button data-testid="button-create-first-project">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Project
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
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
                    {formatDate(project.createdAt, 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
        <AlertDialogContent data-testid="dialog-delete-confirmation">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{projectToDelete?.title}"? This action cannot be undone.
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