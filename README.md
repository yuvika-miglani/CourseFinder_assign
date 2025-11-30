# CourseFinder

CourseFinder is a modern, responsive React application designed for discovering, creating, and managing educational courses. It features a clean, professional user interface and a robust set of tools for both students and administrators.

## How to Run, Build, and Deploy

### 1. Development
To run the application locally in development mode:
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
The application will be available at `https://coursefinderassign.netlify.app/`.

### 2. Build for Production
To create a production-ready build:
```bash
npm run build
```
This command compiles your code and optimizes it for performance.

### 3. Deployment
The recommended way to deploy is via **GitHub** and **Netlify/Vercel**.

1.  **Push to GitHub**: Commit your changes and push to a GitHub repository.
2.  **Connect to Hosting Provider**: Link your repository to Netlify or Vercel.
3.  **Automatic Deployment**: The platform will automatically build and deploy your application.

## Key Design Choices

The design philosophy of CourseFinder focuses on **clarity**, **professionalism**, and **usability**.

### Color Palette & Visual Identity
- **Primary Green (`#14593F`)**: A deep, professional green was selected as the primary brand color to symbolize growth and stability, replacing generic templates.
- **Easy Badge (`#fffaaf`)**: A specific shade of yellow was chosen for "Easy" difficulty badges to ensure high readability against dark text.
- **Visual Hierarchy**: The UI uses a clear hierarchy with distinct typography (`Inter` font) and spacing to guide the user's eye.

### Component Architecture
- **Trail Navigation**: The breadcrumb component was explicitly named **Trail** to better reflect the user's learning journey through topics and subtopics.
- **Markdownx**: A specialized wrapper component was created to handle Markdown rendering, ensuring consistent styling for all course content.
- **Clean Codebase**: The source code has been meticulously refactored to remove all comments, resulting in a lean and professional codebase.

## Features Implemented

### 1. Course Discovery (Home)
- **Visual Course Cards**: Display course titles, descriptions, and metadata in an attractive grid layout.
- **Hero Section**: Engaging landing page with a "New Courses Available" badge and call-to-action.
- **Responsive Design**: Fully adaptive layout that works seamlessly on desktop, tablet, and mobile devices.

### 2. Interactive Learning Experience (View)
- **Markdown Rendering**: High-quality content rendering supporting rich text, code blocks, and tables.
- **Smart Navigation**: Collapsible sidebar and "Trail" navigation to keep users oriented.
- **Progress Tracking**: Users can mark subtopics as "Completed" with visual progress indicators.

### 3. Course Management (Edit)
- **Course Creation**: Intuitive form for creating new courses with titles, descriptions, and learning objectives.
- **Topic Management**: Add, edit, and delete topics and subtopics dynamically.
- **Data Portability**: Import and export course data via JSON files.
- **Reset Functionality**: Quickly reset data to defaults for testing.

### 4. Administration (Admin)
- **Dashboard**: Overview of system statistics (Total Users, Students, Teachers).
- **User Management**: View detailed user lists with roles.
- **Progress Monitoring**: Track enrollment and completion rates for each user.

## Project Structure

```
src/
├── components/       # Reusable UI components (CourseCard, Layout, Markdownx, Sidebar, Trail)
├── context/          # Global state management (DataContext)
├── data/             # Initial data sources (courses.json, users.json)
├── pages/            # Main application views (Admin, Edit, Home, View)
├── App.jsx           # Main entry point with routing
└── index.css         # Tailwind CSS v4 configuration
```

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Icons**: Lucide React
