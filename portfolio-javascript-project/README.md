# Portfolio Manager - JavaScript Edition

A full-stack portfolio project management application built with MongoDB, Express.js, React (JavaScript), and Node.js. Features complete CRUD functionality for managing portfolio projects with a clean, modern interface.

## ✨ Features

- **Complete CRUD Operations**: Create, Read, Update, Delete projects
- **MongoDB Integration**: Uses MongoDB Atlas with automatic fallback to in-memory storage
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Search & Filter**: Search projects by title, description, or technology
- **Status Tracking**: Track project status (Planning, In Progress, Completed, On Hold)
- **Technology Tags**: Organize projects by technologies used
- **Image Support**: Add project screenshots or preview images
- **Project Links**: Link to live demos and GitHub repositories
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 API Endpoints

The application provides RESTful API endpoints following the pattern `/api/Projects`:

- `GET /api/Projects` - Get all projects
- `GET /api/Projects/:id` - Get project by ID
- `POST /api/Projects` - Create new project
- `PUT /api/Projects/:id` - Update project
- `DELETE /api/Projects/:id` - Delete project

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework (JavaScript, not TypeScript)
- **Wouter** - Lightweight routing
- **TanStack Query** - Server state management
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **Node.js** - Runtime environment

### Development
- **Vite** - Build tool and development server
- **ESBuild** - Production bundler

## 📦 Installation & Setup

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd portfolio-javascript-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5000`

## 🌍 MongoDB Configuration

### Option 1: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Add it to your `.env` file as `MONGODB_URI`

### Option 2: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/portfolio`

### Option 3: In-Memory Storage (Fallback)
If no MongoDB connection is available, the app automatically uses in-memory storage. Data will be lost when the server restarts.

## 📝 Project Structure

```
portfolio-javascript-project/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and API client
│   │   ├── hooks/          # React hooks
│   │   └── main.jsx        # App entry point
│   └── index.html
├── server/                 # Express backend
│   ├── models/             # MongoDB models
│   ├── index.js            # Server entry point
│   ├── routes.js           # API routes
│   ├── storage.js          # Storage interfaces
│   ├── database.js         # Database connection
│   └── vite.js             # Vite integration
├── shared/                 # Shared utilities
│   └── validation.js       # Data validation
├── package.json
└── README.md
```

## 🎯 Usage

### Adding a Project
1. Click "Add New Project" from the home page or navigation
2. Fill in the project details:
   - Title (required)
   - Description (required)
   - Technologies (required, comma-separated)
   - Status (Planning, In Progress, Completed, On Hold)
   - Project URL (optional)
   - GitHub URL (optional)
   - Image URL (optional)
3. Click "Create Project"

### Managing Projects
- **View All**: Navigate to "Projects" to see all projects with search and filter
- **View Details**: Click on any project to see full details
- **Edit**: Use the edit button to modify project information
- **Delete**: Remove projects with confirmation dialog

### Search and Filter
- Search by project title, description, or technologies
- Filter by project status
- Results update in real-time

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 📊 Data Format

Projects are stored with the following structure:

```javascript
{
  _id: "unique_id",
  title: "Project Title",
  description: "Project description",
  technologies: "React, Node.js, MongoDB",
  status: "completed", // planning | in-progress | completed | on-hold
  projectUrl: "https://project-demo.com",
  githubUrl: "https://github.com/user/repo",
  imageUrl: "https://example.com/image.jpg",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify your connection string in `.env`
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure database user has proper permissions
- The app will fall back to in-memory storage if MongoDB is unavailable

### Port Issues
- Default port is 5000
- Change PORT in `.env` file if needed
- Make sure the port is not in use by another application

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Ensure you're using Node.js 18 or higher

## 📄 License

MIT License - feel free to use this project for your portfolio or learning purposes.

---

This is a complete JavaScript implementation suitable for academic assignments and portfolio demonstrations. All TypeScript has been removed and the project uses standard JavaScript throughout.