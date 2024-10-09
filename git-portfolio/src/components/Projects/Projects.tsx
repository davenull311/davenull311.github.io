import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  githubLink: string;
}

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'Project 1',
      description: 'Description for Project 1',
      image: 'project1.jpg',
      tags: ['React', 'TypeScript'],
      demoLink: 'https://demo1.com',
      githubLink: 'https://github.com/project1',
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Description for Project 2',
      image: 'project2.jpg',
      tags: ['React', 'Node.js'],
      demoLink: 'https://demo2.com',
      githubLink: 'https://github.com/project2',
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'Description for Project 3',
      image: 'project3.jpg',
      tags: ['TypeScript', 'Express'],
      demoLink: 'https://demo3.com',
      githubLink: 'https://github.com/project3',
    },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.tags.includes(filter));

  return (
    <section id="projects" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="mb-8">
          <select
            className="w-full md:w-auto px-4 py-2 border rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Projects</option>
            <option value="React">React</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Node.js">Node.js</option>
            <option value="Express">Express</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;