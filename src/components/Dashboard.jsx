import React, { useState, useEffect } from 'react';
import { FaTachometerAlt } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

const Dashboard = ({ interns }) => {
  const [attendedToday, setAttendedToday] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch today's attendance
        const responseAttendance = await axios.get('http://localhost:3001/attendance/today');
        setAttendedToday(responseAttendance.data.length);

        // Fetch total number of projects
        const responseTotalProjects = await axios.get('http://localhost:3001/projects/total');
        setTotalProjects(responseTotalProjects.data.totalProjects);
      } catch (error) {
        console.error('Error fetching data for dashboard:', error);
      }
    };

    fetchDashboardData();
  }, []);

  // Data for Pie chart
  const domains = [...new Set(interns.map(intern => intern.domain))];
  const internsPerDomain = domains.map(domain => interns.filter(intern => intern.domain === domain).length);

  const pieData = {
    labels: domains,
    datasets: [
      {
        data: internsPerDomain,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF','#01234'],
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="head-title">
        <div className="left">
          <h1><FaTachometerAlt /> Dashboard</h1>
        </div>
      </div>
      <ul className="box-info">
        <li>
          <i className='fa fa-calendar-check'></i>
          <span className="text">
            <h3>{interns.length}</h3>
            <p>Total Interns</p>
            <button>Add Intern</button>
          </span>
        </li>
        <li>
          <i className='fa fa-users'></i>
          <span className="text">
            <h3>{attendedToday}</h3>
            <p>Interns Attended Today</p>
            <button>Mark Attended</button>
          </span>
        </li>
        <li>
          <i className='fa fa-tasks'></i>
          <span className="text">
            <h3>{totalProjects}</h3>
            <p>Total Projects</p>
            <button>Assign Project</button>
          </span>
        </li>
      </ul>

      <div className="charts">
        <div className="chart">
          <h2>Interns Distribution by Domain</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
