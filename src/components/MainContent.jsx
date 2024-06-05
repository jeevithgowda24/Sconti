import React from 'react';
import Dashboard from './Dashboard';
import Attendance from './Attendance';
import Tasks from './Tasks';
import InternDetails from './InternDetails';
import Team from './Team';
import Settings from './Settings';
import MarkAttendancePage from './MarkAttendancePage';
import ProjectsPage from './ProjectsPage';

const MainContent = ({ activePage, attendance, setAttendance }) => {
  return (
    <div className="main-content">
      {activePage === 'dashboard' && <Dashboard />}
      {activePage === 'attendance' && <Attendance attendance={attendance} />}
      {activePage === 'tasks' && <Tasks />}
      {activePage === 'internDetails' && <InternDetails />}
      {activePage === 'projects' && <ProjectsPage />}
      {activePage === 'settings' && <Settings />}
    </div>
  );
};

export default MainContent;
