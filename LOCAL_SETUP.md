# Local Setup Instructions

Follow these steps to run the Portfolio Manager application on your local machine.

## Prerequisites

Make sure you have the following installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

## Step-by-Step Setup

### 1. Extract the Project
Extract the project files from the zip/tar.gz archive to your desired directory.

### 2. Navigate to Project Directory
```bash
cd portfolio-project
```

### 3. Install Dependencies
```bash
npm install
```
This will install all the required packages for both frontend and backend.

### 4. Environment Configuration (Optional)

#### Option A: Use MongoDB Atlas (Persistent Data)
1. Create a `.env` file in the root directory
2. Add your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```

#### Option B: Use In-Memory Storage (Default)
- No additional configuration needed
- Data will be stored temporarily and reset when server restarts
- Perfect for development and testing

### 5. Start the Development Server
```bash
npm run dev
```

This command will:
- Start the Express.js backend server on port 5000
- Start the Vite development server for the React frontend
- Enable hot reloading for both frontend and backend

### 6. Open the Application
Open your web browser and navigate to:
```
http://localhost:5000
```

## Available Scripts

- `npm run dev` - Start development servers (both frontend and backend)
- `npm run build` - Build the application for production
- `npm run start` - Start the production server (after building)

## Testing the Application

1. **Create a Project**: Click "Add Project" and fill out the form
2. **View Projects**: Navigate to "Projects" to see all your projects
3. **Edit Projects**: Click the "Edit" button on any project card
4. **Delete Projects**: Click the "Delete" button (with confirmation)
5. **Search/Filter**: Use the search bar to find specific projects

## Troubleshooting

### Common Issues:

#### Port Already in Use
If port 5000 is already in use, you can change it by:
1. Modifying the `PORT` environment variable
2. Or stopping the process using that port

#### MongoDB Connection Issues
If using MongoDB Atlas and getting connection errors:
1. Check your connection string in `.env`
2. Ensure your IP is whitelisted in MongoDB Atlas
3. Verify your username/password are correct
4. The application will automatically fall back to in-memory storage

#### Module Not Found Errors
If you get module not found errors:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Browser Not Opening Automatically
If the browser doesn't open automatically:
1. Manually open your browser
2. Navigate to `http://localhost:5000`

## IDE Recommendations

### Visual Studio Code Extensions:
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint

## Production Deployment

To deploy this application:

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Set environment variables** on your hosting platform:
   - `MONGODB_URI` (if using MongoDB Atlas)
   - `NODE_ENV=production`

3. **Deploy to platforms like:**
   - Vercel
   - Netlify
   - Heroku
   - Railway
   - DigitalOcean

## Need Help?

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed correctly
3. Verify your Node.js version is 16 or higher
4. Check that no other applications are using port 5000