# Portfolio Manager - CRUD Application

## Overview

This is a full-stack portfolio project management application built with React frontend and Express.js backend, entirely in JavaScript (no TypeScript). It provides complete CRUD (Create, Read, Update, Delete) functionality for managing portfolio projects. Users can add new projects, view all projects, edit existing projects, and delete projects. The application features a modern UI built with shadcn/ui components and Tailwind CSS, with custom JavaScript validation. API endpoints follow the pattern `/api/Projects` as specified in assignment requirements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with JavaScript**: Main frontend framework using functional components and hooks (no TypeScript)
- **Routing**: Wouter for client-side routing with pages for home, project listing, project details, add/edit forms
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Form Handling**: react-hook-form with custom JavaScript validation functions
- **Build Tool**: Vite for development server and build process

### Backend Architecture
- **Express.js**: RESTful API server with middleware for JSON parsing and request logging (JavaScript)
- **Storage Interface**: Abstract storage interface with MongoDB and in-memory implementations
- **API Routes**: RESTful endpoints for project CRUD operations (/api/Projects)
- **Schema Validation**: Custom JavaScript validation functions for request validation
- **Error Handling**: Centralized error handling middleware

### Data Storage
- **Database**: MongoDB Atlas (preferred) with fallback to in-memory storage
- **Schema**: Projects collection with fields for title, description, technologies, URLs, status, and timestamps
- **ORM**: Mongoose for MongoDB operations and schema validation
- **Connection**: Automatic fallback system - uses MongoDB Atlas if MONGODB_URI is available, otherwise in-memory storage
- **Document Structure**: Uses MongoDB `_id` field for unique identification

### Development Setup
- **Monorepo Structure**: Shared validation utilities between client and server in `/shared` directory
- **JavaScript**: Pure JavaScript implementation across frontend, backend, and shared utilities
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)
- **Hot Reload**: Vite development server with HMR for frontend development
- **Assignment Compliance**: Converted from TypeScript to JavaScript for academic requirements

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date formatting and manipulation
- **Utilities**: clsx and class-variance-authority for conditional styling

### Backend Dependencies
- **Database**: Mongoose for MongoDB operations and schema validation
- **Validation**: Custom JavaScript validation functions
- **Development**: Node.js for JavaScript execution and esbuild for production builds
- **Storage**: Dual storage system supporting both MongoDB and in-memory fallback

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Build Process**: Vite for client build, esbuild for server bundle
- **JavaScript Project**: Complete JavaScript implementation suitable for academic assignments