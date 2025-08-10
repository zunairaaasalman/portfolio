import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Eye, Plus, Folder, CheckCircle, Clock } from "lucide-react";

export default function HomePage() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["/api/items"],
    queryFn: api.getProjects,
  });

  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === "completed").length;
  const inProgressProjects = projects.filter(p => p.status === "in-progress").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4" data-testid="text-main-title">
          Portfolio Project Manager
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto" data-testid="text-main-description">
          Manage your portfolio projects with full CRUD functionality. Add, view, edit, and delete your projects seamlessly.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/items">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors" data-testid="button-view-all-projects">
              <Eye className="inline mr-2 h-4 w-4" />
              View All Projects
            </button>
          </Link>
          <Link href="/add-item">
            <button className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors" data-testid="button-add-new-project">
              <Plus className="inline mr-2 h-4 w-4" />
              Add New Project
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 border border-slate-200" data-testid="card-total-projects">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Folder className="text-blue-600 h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Total Projects</p>
              <p className="text-2xl font-bold text-slate-900" data-testid="text-total-projects">
                {isLoading ? "..." : totalProjects}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200" data-testid="card-completed-projects">
          <div className="flex items-center">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CheckCircle className="text-emerald-600 h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Completed</p>
              <p className="text-2xl font-bold text-slate-900" data-testid="text-completed-projects">
                {isLoading ? "..." : completedProjects}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200" data-testid="card-in-progress-projects">
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Clock className="text-amber-600 h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">In Progress</p>
              <p className="text-2xl font-bold text-slate-900" data-testid="text-in-progress-projects">
                {isLoading ? "..." : inProgressProjects}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
