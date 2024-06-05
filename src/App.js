// src/App.js

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AttendancePage from './components/Attendance';
import MarkAttendancePage from './components/MarkAttendancePage';
import Dashboard from './components/Dashboard';
import InternDetails from './components/InternDetails';
import ProjectsPage from './components/ProjectsPage';
import LoginPage from './components/LoginPage';
import './App.css';
import InternList from './components/InternList';
import axios from 'axios'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [attendance, setAttendance] = useState([]);
  const [interns, setInterns] = useState([]);
  const [projects, setProjects] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActivePage('dashboard'); // Reset to dashboard on logout
  };

  const addIntern = (intern) => {
    setInterns([...interns, intern]);
  };

  const addProject = (project) => {
    setProjects([...projects, project]);
  };

  useEffect(() => {
    // Fetch interns data from the server
    axios.get('http://localhost:3001/interns')
      .then(response => {
        setInterns(response.data); // Assuming the response.data is an array of interns
      })
      .catch(error => {
        console.error('Error fetching interns:', error);
      });
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard attendance={attendance} interns={interns} projects={projects} />;
      case 'attendance':
        return <AttendancePage attendance={attendance} />;
      case 'mark-attendance':
        return <MarkAttendancePage setAttendance={setAttendance} />;
      case 'internDetails':
        return <InternDetails addIntern={addIntern} />;
        case 'internList':
          return<InternList  interns={interns}/>
      case 'projects':
        return <ProjectsPage projects={projects} setProjects={setProjects} interns={interns} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div className={`main-app ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Sidebar
            isOpen={sidebarOpen}
            activePage={activePage}
            setActivePage={setActivePage}
            onLogout={handleLogout}
          />
          <div id="content">
            <Navbar toggleSidebar={toggleSidebar} />
            {renderPage()}
          </div>
        </div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
