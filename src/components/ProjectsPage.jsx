import React, { useState, useEffect } from 'react';
import { FaTasks, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const ProjectsPage = ({ projects, setProjects, interns }) => {
  const [newProject, setNewProject] = useState({ name: '', assignedTo: '', domain: '' });
  const [selectedDomain, setSelectedDomain] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [setProjects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleDomainChange = (e) => {
    const { value } = e.target;
    setSelectedDomain(value);
    setNewProject({ ...newProject, assignedTo: '', domain: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reset error message

    // Check for duplicate project name
    if (projects.some(project => project.name === newProject.name)) {
      setError('Project name already exists. Please enter a different project name.');
      return;
    }

    if (!newProject.name) {
      setError('Please enter a project name.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/projects', newProject);
      setProjects(prevProjects => [...prevProjects, response.data]);
      setNewProject({ name: '', assignedTo: '', domain: '' });
      setSelectedDomain('');
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`http://localhost:3001/projects/${projectId}`);
      setProjects(prevProjects => prevProjects.filter(project => project._id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const filteredInterns = interns.filter(intern => intern.domain === selectedDomain);

  return (
    <div className="projects-page">
      <h1><FaTasks /> Projects</h1>
      <form onSubmit={handleSubmit} className="add-project-form">
        {error && <div className="error">{error}</div>}
        <label htmlFor="name">Project Name:</label>
        <input type="text" id="name" name="name" value={newProject.name} onChange={handleChange} />

        <label htmlFor="domain">Domain:</label>
        <select id="domain" name="domain" value={selectedDomain} onChange={handleDomainChange}>
          <option value="">Select Domain</option>
          {Array.from(new Set(interns.map(intern => intern.domain))).map((domain, index) => (
            <option key={index} value={domain}>{domain}</option>
          ))}
        </select>

        <label htmlFor="assignedTo">Assign To:</label>
        <select id="assignedTo" name="assignedTo" value={newProject.assignedTo} onChange={handleChange}>
          <option value="">Select Intern</option>
          {filteredInterns.map((intern, index) => (
            <option key={index} value={intern.name}>{intern.name}</option>
          ))}
        </select>

        <button type="submit">Add Project</button>
      </form>
      <div className="projects-list">
        <h2>Projects</h2>
        <div className="project-tables">
          <div className="table">
            <h3>Not Assigned</h3>
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {projects.filter(project => !project.assignedTo).map((project) => (
                  <tr key={project._id}>
                    <td>{project.name}</td>
                    <td>
                      <button onClick={() => handleDelete(project._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-divider"></div>
          <div className="table">
            <h3>Assigned</h3>
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Assigned To</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {projects.filter(project => project.assignedTo).map((project) => (
                  <tr key={project._id}>
                    <td>{project.name}</td>
                    <td>{project.assignedTo}</td>
                    <td>
                      <button onClick={() => handleDelete(project._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
