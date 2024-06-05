import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const MarkAttendancePage = ({ attendance, setAttendance }) => {
  const currentDate = moment(new Date()).format('YYYY-MM-DD'); // Format current date
  const [markedAttendance, setMarkedAttendance] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await axios.get('http://localhost:3001/interns');
        setInterns(response.data);
      } catch (error) {
        console.error('Error fetching interns data:', error);
      }
    };

    fetchInterns();

    const storedMarkedAttendance = JSON.parse(localStorage.getItem('markedAttendance'));
    if (storedMarkedAttendance) {
      setMarkedAttendance(storedMarkedAttendance);
    }
  }, []);

  const isAttendanceMarked = (name) => {
    return markedAttendance.some(entry => entry.name === name && entry.date === currentDate);
  };

  const getAttendanceStatus = (name) => {
    const entry = markedAttendance.find(entry => entry.name === name && entry.date === currentDate);
    return entry ? entry.status : null;
  };

  const handleAttendance = async (name, status) => {
    if (isAttendanceMarked(name)) {
      alert(`${name}'s attendance has already been marked for today.`);
      return;
    }

    const newAttendance = { name, date: currentDate, domain: selectedDomain, status };
    try {
      await axios.post('http://localhost:3001/attendance', newAttendance);
      setAttendance(prevAttendance => [...prevAttendance, newAttendance]);
      setMarkedAttendance(prevMarkedAttendance => [...prevMarkedAttendance, newAttendance]);
      localStorage.setItem('markedAttendance', JSON.stringify([...markedAttendance, newAttendance]));
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  const removeAttendance = (name) => {
    const indexToRemove = markedAttendance.findIndex(entry => entry.name === name && entry.date === currentDate);
    if (indexToRemove === -1) {
      return;
    }

    const updatedAttendance = markedAttendance.filter((_, index) => index !== indexToRemove);
    setMarkedAttendance(updatedAttendance);
    localStorage.setItem('markedAttendance', JSON.stringify(updatedAttendance));
    setAttendance(prevAttendance => prevAttendance.filter(entry => !(entry.name === name && entry.date === currentDate)));
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const filteredInterns = selectedDomain === 'All'
    ? interns
    : interns.filter(intern => intern.domain === selectedDomain);

  return (
    <div className="mark-attendance-container">
      <h1>Mark Attendance</h1>
      <div className="filter-container">
        <label htmlFor="domain">Select Domain: </label>
        <select id="domain" value={selectedDomain} onChange={handleDomainChange}>
          <option value="All">All</option>
          <option value="Full Stack Development">Full Stack Development</option>
          <option value="Back End Development">Backend Development</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Front End Development">Front End Development</option>
          <option value="Data Science">Data Science</option>
        
        </select>
      </div>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Domain</th>
            <th>Date</th>
            <th>Status</th>
            <th>Marked</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredInterns.map(intern => (
            <tr key={intern.name}>
              <td>{intern.name}</td>
              <td>{intern.domain}</td>
              <td>{currentDate}</td> {/* Display formatted current date */}
              <td>
                <button onClick={() => handleAttendance(intern.name, 'Present')} className="present-button">
                  Present
                </button>
                <button onClick={() => handleAttendance(intern.name, 'Absent')} className="absent-button">
                  Absent
                </button>
              </td>
              <td>{isAttendanceMarked(intern.name) ? getAttendanceStatus(intern.name) === 'Present' ? 'P' : 'A' : ''}</td>
              <td>
                {isAttendanceMarked(intern.name) && (
                  <button onClick={() => removeAttendance(intern.name)} className="update-button">
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarkAttendancePage;
