import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, FolderOpen, CheckCircle, Clock, AlertTriangle, Pause } from "lucide-react";

export default function HomePage() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["/api/Projects"],
    queryFn: () => api.getAllProjects(),
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "planning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "on-hold":
        return <Pause className="h-4 w-4 text-gray-600" />;
      default:
        return <FolderOpen className="h-4 w-4 text-gray-600" />;
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

  const statusCounts = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4" data-testid="page-title">
          Portfolio Manager
        </h1>
        <p className="text-lg text-slate-600 mb-6" data-testid="page-description">
          Manage your portfolio projects with ease. Track progress, organize details, and showcase your work.
        </p>
        <Link href="/add-item">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-add-project">
            <Plus className="mr-2 h-5 w-5" />
            Add New Project
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-slate-200" data-testid="stat-total-projects">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900" data-testid="count-total">
              {projects.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200" data-testid="stat-completed-projects">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600" data-testid="count-completed">
              {statusCounts.completed || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200" data-testid="stat-in-progress-projects">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600" data-testid="count-in-progress">
              {statusCounts["in-progress"] || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200" data-testid="stat-planning-projects">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Planning</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600" data-testid="count-planning">
              {statusCounts.planning || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-900" data-testid="section-title-recent">
            Recent Projects
          </h2>
          {projects.length > 0 && (
            <Link href="/items">
              <Button variant="outline" data-testid="button-view-all">
                View All Projects
              </Button>
            </Link>
          )}
        </div>

        {projects.length === 0 ? (
          <Card className="bg-white border-slate-200">
            <CardContent className="text-center py-12">
              <FolderOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2" data-testid="text-no-projects">
                No projects yet
              </h3>
              <p className="text-slate-600 mb-4" data-testid="text-no-projects-description">
                Get started by creating your first portfolio project.
              </p>
              <Link href="/add-item">
                <Button data-testid="button-create-first-project">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project) => (
              <Card 
                key={project._id} 
                className="bg-white border-slate-200 hover:shadow-lg transition-shadow cursor-pointer"
                data-testid={`card-project-${project._id}`}
              >
                <Link href={`/items/${project._id}`}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-1" data-testid={`text-project-title-${project._id}`}>
                        {project.title}
                      </CardTitle>
                      <Badge className={`${getStatusColor(project.status)} flex items-center gap-1`} data-testid={`status-project-${project._id}`}>
                        {getStatusIcon(project.status)}
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2" data-testid={`text-project-description-${project._id}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.split(",").slice(0, 3).map((tech, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-xs" 
                          data-testid={`tag-tech-${project._id}-${index}`}
                        >
                          {tech.trim()}
                        </Badge>
                      ))}
                      {project.technologies.split(",").length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.split(",").length - 3} more
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500" data-testid={`text-project-date-${project._id}`}>
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}