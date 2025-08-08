# Portfolio Manager - CRUD Application

## Overview

This is a full-stack portfolio project management application built with React frontend and Express.js backend. It provides complete CRUD (Create, Read, Update, Delete) functionality for managing portfolio projects. Users can add new projects, view all projects, edit existing projects, and delete projects. The application features a modern UI built with shadcn/ui components and Tailwind CSS, with form validation using react-hook-form and Zod schemas.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Main frontend framework using functional components and hooks
- **Routing**: Wouter for client-side routing with pages for home, project listing, project details, add/edit forms
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Form Handling**: react-hook-form with Zod validation for type-safe form management
- **Build Tool**: Vite for development server and build process

### Backend Architecture
- **Express.js**: RESTful API server with middleware for JSON parsing and request logging
- **Storage Interface**: Abstract storage interface (IStorage) with in-memory implementation (MemStorage)
- **API Routes**: RESTful endpoints for project CRUD operations (/api/items)
- **Schema Validation**: Zod schemas for request validation and type safety
- **Error Handling**: Centralized error handling middleware

### Data Storage
- **Database**: PostgreSQL configured with Drizzle ORM
- **Schema**: Projects table with fields for title, description, technologies, URLs, status, and timestamps
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Connection**: Neon Database serverless PostgreSQL connection

### Development Setup
- **Monorepo Structure**: Shared schema between client and server in `/shared` directory
- **TypeScript**: Consistent typing across frontend, backend, and shared schemas
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)
- **Hot Reload**: Vite development server with HMR for frontend development

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date formatting and manipulation
- **Utilities**: clsx and class-variance-authority for conditional styling

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: drizzle-orm and drizzle-kit for database operations and migrations
- **Validation**: Zod for schema validation and drizzle-zod for ORM integration
- **Development**: tsx for TypeScript execution and esbuild for production builds

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Build Process**: Vite for client build, esbuild for server bundle
- **Type Checking**: TypeScript compiler for static type checking