import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-xl font-bold text-slate-900 cursor-pointer">
                Portfolio Manager
              </h1>
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              data-testid="nav-home"
            >
              Home
            </Link>
            <Link
              href="/items"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/items")
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              data-testid="nav-projects"
            >
              Projects
            </Link>
            <Link
              href="/add-item"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              data-testid="nav-add-project"
            >
              Add Project
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
