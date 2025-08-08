import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto bg-white border-slate-200">
        <CardContent className="text-center py-12">
          <div className="mb-6">
            <div className="text-6xl font-bold text-slate-300 mb-2">404</div>
            <h1 className="text-2xl font-semibold text-slate-900 mb-2" data-testid="title-not-found">
              Page Not Found
            </h1>
            <p className="text-slate-600" data-testid="description-not-found">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="space-y-3">
            <Link href="/">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" data-testid="button-home">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Link href="/items">
              <Button variant="outline" className="w-full" data-testid="button-projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                View Projects
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}