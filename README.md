# Portfolio Manager - CRUD Application

A full-stack portfolio project management application built with React frontend and Express.js backend with MongoDB Atlas integration.

## Features

- **Complete CRUD Operations**: Create, read, update, and delete portfolio projects
- **MongoDB Atlas Integration**: Automatic fallback to in-memory storage
- **Modern React Frontend**: Built with TypeScript, Tailwind CSS, and shadcn/ui components
- **Form Validation**: Using react-hook-form with Zod schemas
- **Responsive Design**: Clean, minimalistic UI that works on all devices
- **Search & Filter**: Find projects by title, description, or technology
- **Project Status Tracking**: Planning, In Progress, Completed, On Hold

## Tech Stack

### Frontend
- React 18 with TypeScript
- Wouter for routing
- TanStack Query for state management
- shadcn/ui components
- Tailwind CSS for styling
- react-hook-form for form handling
- Zod for validation

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- TypeScript
- Environment variable configuration
- RESTful API design

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (optional - falls back to in-memory storage)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables (optional):**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```
   
   If no MongoDB URI is provided, the application will use in-memory storage.

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and API client
│   │   └── ...
│   └── index.html
├── server/                 # Express.js backend
│   ├── models/           # MongoDB models
│   ├── routes.ts         # API routes
│   ├── database.ts       # Database connection
│   ├── storage.ts        # Storage interface
│   └── index.ts          # Server entry point
├── shared/                 # Shared TypeScript types
│   └── schema.ts         # Zod schemas and types
└── ...
```

## API Endpoints

- `GET /api/items` - Get all projects
- `GET /api/items/:id` - Get project by ID
- `POST /api/items` - Create new project
- `PUT /api/items/:id` - Update project
- `DELETE /api/items/:id` - Delete project

## MongoDB Atlas Setup (Optional)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Add your IP address to the IP whitelist
4. Create a database user
5. Get your connection string
6. Add it to your `.env` file as `MONGODB_URI`

## Development

- The application uses Vite for hot reloading during development
- TypeScript provides type safety across the entire stack
- ESLint and Prettier are configured for code quality

## Deployment

The application is ready for deployment on platforms like:
- Replit
- Vercel
- Netlify
- Heroku
- Railway

Make sure to set your `MONGODB_URI` environment variable in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Developed by

1. Zunaira Suleman
2. Sheikh Rehan

## License

This project is open source and available under the MIT License.
