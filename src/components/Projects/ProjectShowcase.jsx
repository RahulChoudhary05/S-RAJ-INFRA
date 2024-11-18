import React, { useState, createContext, useContext } from 'react';
import { ChevronLeft } from 'lucide-react';
// UI Components
const TabsContext = createContext();

function Tabs({ defaultValue, children, className, onValueChange }) {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ className, children }) {
  return <div className={`flex ${className}`}>{children}</div>;
}

function TabsTrigger({ value, children }) {
  const { value: currentValue, setValue, onValueChange } = useContext(TabsContext);
  const isActive = currentValue === value;

  const handleClick = () => {
    setValue(value);
    if (onValueChange) onValueChange(value);
  };

  return (
    <button
      className={`px-4 py-2 ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, children }) {
  const { value: currentValue } = useContext(TabsContext);

  if (currentValue !== value) return null;

  return <div>{children}</div>;
}

function Badge({ variant = 'default', children }) {
  const variantClasses = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}

function ScrollArea({ className, children }) {
  return (
    <div className={`overflow-auto ${className}`}>
      {children}
    </div>
  );
}

function Button({ variant = 'default', className, children, ...props }) {
  const variantClasses = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Projects data
const projects = {
  ongoing: [
    {
      id: 1,
      title: "Project Alpha",
      subtitle: "Web Development",
      description: "A modern web application built with React and TypeScript. Features include user authentication, real-time updates, and responsive design.",
      image: "https://via.placeholder.com/600x400",
      tags: ["React", "TypeScript", "Redux"],
      progress: "6/12",
      year: "2024",
      status: "In Progress",
      subProjects: [
        {
          id: 101,
          title: "User Authentication Module",
          description: "Implementing secure user authentication and authorization system.",
          image: "https://via.placeholder.com/300x200",
          progress: "3/4",
        },
        {
          id: 102,
          title: "Real-time Chat Feature",
          description: "Developing a real-time chat functionality using WebSockets.",
          image: "https://via.placeholder.com/300x200",
          progress: "2/5",
        },
        {
          id: 103,
          title: "Responsive Dashboard",
          description: "Creating a responsive dashboard for data visualization.",
          image: "https://via.placeholder.com/300x200",
          progress: "1/3",
        },
      ],
    },
  ],
  completed: [
    {
      id: 3,
      title: "Project Gamma",
      subtitle: "Desktop Application",
      description: "A powerful desktop application built with Electron. Features include file system integration, real-time collaboration, and cross-platform compatibility.",
      image: "https://via.placeholder.com/600x400",
      tags: ["Electron", "Node.js", "SQLite"],
      progress: "12/12",
      year: "2023",
      status: "Completed",
      subProjects: [
        {
          id: 301,
          title: "File System Integration",
          description: "Implemented robust file system integration for document management.",
          image: "https://via.placeholder.com/300x200",
          progress: "4/4",
        },
        {
          id: 302,
          title: "Real-time Collaboration Tools",
          description: "Developed real-time collaboration features for multi-user editing.",
          image: "https://via.placeholder.com/300x200",
          progress: "5/5",
        },
        {
          id: 303,
          title: "Cross-platform Compatibility",
          description: "Ensured seamless operation across Windows, macOS, and Linux.",
          image: "https://via.placeholder.com/300x200",
          progress: "3/3",
        },
      ],
    },
  ],
};

// Main Component
export default function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSubProject, setSelectedSubProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setSelectedSubProject(null);
  };

  const handleSubProjectClick = (subProject) => {
    setSelectedSubProject(subProject);
  };

  const handleBackClick = () => {
    if (selectedSubProject) {
      setSelectedSubProject(null);
    } else {
      setSelectedProject(null);
    }
  };

  const renderProjects = (projectList) => {
    if (!projectList || projectList.length === 0) {
      return <p>No projects available.</p>;
    }

    return projectList.map(project => (
      <div
        key={project.id}
        className="overflow-hidden cursor-pointer transition-colors hover:bg-gray-100 rounded-lg"
        onClick={() => handleProjectClick(project)}
      >
        <div className="p-0">
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            <div className="relative aspect-[16/9] md:aspect-auto">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.subtitle}</p>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm">{project.progress}</div>
                  <div className="text-sm text-gray-500">{project.year}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  if (selectedProject) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={handleBackClick}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {selectedSubProject ? `Back to ${selectedProject.title}` : 'Back to Projects'}
        </Button>
        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          <div className="space-y-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={selectedSubProject ? selectedSubProject.image : selectedProject.image}
                alt={selectedSubProject ? selectedSubProject.title : selectedProject.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedSubProject ? selectedSubProject.title : selectedProject.title}</h2>
                {!selectedSubProject && <p className="text-sm text-gray-500">{selectedProject.subtitle}</p>}
              </div>
              <div className="flex items-center gap-4">
                <div className="font-mono text-sm">{selectedSubProject ? selectedSubProject.progress : selectedProject.progress}</div>
                {!selectedSubProject && <div className="text-sm text-gray-500">{selectedProject.year}</div>}
              </div>
              <p className="text-gray-600">{selectedSubProject ? selectedSubProject.description : selectedProject.description}</p>
              {!selectedSubProject && (
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="lg:border-l lg:pl-6">
            <h3 className="text-lg font-semibold mb-4">{selectedSubProject ? `Other Sub-Projects of ${selectedProject.title}` : `Sub-Projects of ${selectedProject.title}`}</h3>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-4 pr-4">
                {selectedProject.subProjects && selectedProject.subProjects
                  .filter(subProject => !selectedSubProject || subProject.id !== selectedSubProject.id)
                  .map(subProject => (
                    <div
                      key={subProject.id}
                      className="cursor-pointer transition-colors hover:bg-gray-100 rounded-lg p-4"
                      onClick={() => handleSubProjectClick(subProject)}
                    >
                      <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-lg">
                        <img
                          src={subProject.image}
                          alt={subProject.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h4 className="font-semibold mb-1">{subProject.title}</h4>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {subProject.description}
                      </p>
                      <div className="mt-2 text-sm font-mono">{subProject.progress}</div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Tabs defaultValue="ongoing" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="ongoing">Ongoing Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing" className="space-y-6">
          {renderProjects(projects.ongoing)}
        </TabsContent>
        <TabsContent value="completed" className="space-y-6">
          {renderProjects(projects.completed)}
        </TabsContent>
      </Tabs>
    </div>
  );
}