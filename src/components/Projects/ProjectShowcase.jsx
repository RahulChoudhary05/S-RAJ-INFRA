import React, { useState, createContext, useContext } from "react";
import { ChevronLeft } from "lucide-react";
import { projects } from "../data/Projects";
import Layout from "../layout/layout";
import { ProjectHero } from "./ProjectHero";
import Loader from "../Loader/Loader";
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
  const {
    value: currentValue,
    setValue,
    onValueChange,
  } = useContext(TabsContext);
  const isActive = currentValue === value;

  const handleClick = () => {
    setValue(value);
    if (onValueChange) onValueChange(value);
  };

  return (
    <button
      className={`px-4 py-2 ${
        isActive
          ? "bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 text-white"
          : "bg-transparent text-richblack-800"
      } rounded-md`}
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

function Badge({ variant = "default", children }) {
  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}

function ScrollArea({ className, children }) {
  return <div className={`overflow-auto ${className}`}>{children}</div>;
}

function Button({ variant = "default", className, children, ...props }) {
  const variantClasses = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    ghost: "text-gray-600 hover:bg-gray-100",
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

// Main Component
export default function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState("completed");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSubProject, setSelectedSubProject] = useState(null);
  const [loading, setLoading] = useState(false);

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

    return projectList.map((project) => (
      <div
        key={project.id}
        className="overflow-hidden cursor-pointer transition-colors hover:bg-gray-100 rounded-lg"
        onClick={() => handleProjectClick(project)}
      >
        <div className="p-0">
          <div className="grid md:grid-cols-[300px_1fr] gap-6 mb-3">
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
                  <h3 className="text-2xl font-bold font-playfair text-richblack-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-base text-zinc-800 font-mono text-justify font-semibold mb-1">
                    {project.subtitle}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-sm">
                    {project.progress}
                  </div>
                  <div className="text-sm font-bold text-gray-500">
                    {project.year}
                  </div>
                </div>
              </div>
              <p className="text-sm font-mono font-medium text-justify text-richblue-900 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
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
      <Layout>
        {loading && <Loader />}
        <div className="w-full max-w-7xl mx-auto p-4">
          <Button variant="ghost" className="mb-6" onClick={handleBackClick}>
            <ChevronLeft className="mr-2 h-4 w-5" />
            {selectedSubProject
              ? `Back to ${selectedProject.title}`
              : "Back to Projects"}
          </Button>
          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            <div className="space-y-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={
                    selectedSubProject
                      ? selectedSubProject.image
                      : selectedProject.image
                  }
                  alt={
                    selectedSubProject
                      ? selectedSubProject.title
                      : selectedProject.title
                  }
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold font-playfair mb-2  text-richblack-900">
                    {selectedSubProject
                      ? selectedSubProject.title
                      : selectedProject.title}
                  </h2>
                  {!selectedSubProject && (
                    <p className="text-sm font-mono font-semibold text-justify text-zinc-800">
                      {selectedProject.subtitle}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className=" text-sm font-playfair font-bold">
                    {selectedSubProject
                      ? selectedSubProject.progress
                      : selectedProject.progress}
                  </div>
                  {!selectedSubProject && (
                    <div className="text-sm font-playfair font-bold text-zinc-800">
                      {selectedProject.year}
                    </div>
                  )}
                </div>
                <p className="text-zinc-800 font-inter text-justify">
                  {selectedSubProject
                    ? selectedSubProject.description
                    : selectedProject.description}
                </p>
                {!selectedSubProject && (
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="lg:border-l lg:pl-6">
              <h3 className="text-lg font-semibold font-inter mb-4">
                {selectedSubProject
                  ? `Other Sub-Projects of ${selectedProject.title}`
                  : `Sub-Projects of ${selectedProject.title}`}
              </h3>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4 pr-4">
                  {selectedProject.subProjects &&
                    selectedProject.subProjects
                      .filter(
                        (subProject) =>
                          !selectedSubProject ||
                          subProject.id !== selectedSubProject.id
                      )
                      .map((subProject) => (
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
                          <h4 className="font-semibold font-inter text-richblue-900 mb-1">
                            {subProject.title}
                          </h4>
                          <p className="text-sm text-richblack-800 line-clamp-2">
                            {subProject.description}
                          </p>
                          <div className="mt-2 text-sm font-mono font-semibold">
                            {subProject.progress}
                          </div>
                        </div>
                      ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {loading && <Loader />}
      <ProjectHero />
      <div className="w-full max-w-6xl mx-auto mt-5 p-4 space-y-6">
        <Tabs
          defaultValue="completed"
          className="w-full"
          onValueChange={setActiveTab}
        >
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
    </Layout>
  );
}
