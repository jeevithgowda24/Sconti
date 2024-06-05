import React from 'react';
import { FaSmile, FaTachometerAlt, FaShoppingBag, FaChartPie, FaComments, FaUsers, FaCog, FaSignOutAlt, FaCalendarCheck, FaTasks } from 'react-icons/fa';
// import './Sidebar.css';

const Sidebar = ({ isOpen, activePage, setActivePage, onLogout }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="brand">
        <FaSmile />
        <span> AdminHub</span>
      </div>
      <ul className="side-menu">
        <li className={activePage === 'dashboard' ? 'active' : ''}>
          <a href="#" onClick={() => setActivePage('dashboard')}>
            <FaTachometerAlt />
            <span> Dashboard</span>
          </a>
        </li>
        <li className={activePage === 'internDetails' ? 'active' : ''}>
          <a href="#" onClick={() => setActivePage('internDetails')}>
            <FaComments />
            <span> Add New Intern</span>
          </a>
        </li>
        <li className={activePage === 'internList' ? 'active' : ''}>
          <a href="#" onClick={() => setActivePage('internList')}>
            <FaUsers />
            <span> Intern List</span>
          </a>
        </li>
        <li className={activePage === 'attendance' ? 'active' : ''}>
          <a href="#" onClick={() => setActivePage('attendance')}>
            <FaShoppingBag />
            <span> Attendance</span>
          </a>
        </li>
        <li className={activePage === 'mark-attendance' ? 'active' : ''}>
          <a href="#" onClick={() => setActivePage('mark-attendance')}>
            <FaCalendarCheck />
            <span> Mark Attendance</span>
          </a>
        </li>
        <li className={activePage === 'projects' ? 'active' : ''}>
          <a href="#" onClick={() => setActivePage('projects')}>
          <FaTasks />
            <span> Projects</span>
          </a>
        </li>
        <li className={activePage === 'settings' ? 'active' : ''}>
          <a href="#" onClick={() => setActivePage('settings')}>
            <FaCog />
            <span> Settings</span>
          </a>
        </li>
        <li className="logout">
          <a href="#" onClick={onLogout}>
            <FaSignOutAlt />
            <span> Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
