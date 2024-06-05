import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';

const InternList = () => {
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [message, setMessage] = useState(null);

  const handleRowClick = (intern) => {
    setSelectedIntern(intern);
  };

  const closeModal = () => {
    setSelectedIntern(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/interns/${id}`);
      setInterns(prevInterns => prevInterns.filter(intern => intern._id !== id));
      setMessage('Intern deleted successfully!');
      setTimeout(() => setMessage(null), 3000); // Clear the message after 3 seconds
    } catch (error) {
      console.error('Error deleting intern:', error);
      setMessage('Failed to delete intern.');
      setTimeout(() => setMessage(null), 3000); // Clear the message after 3 seconds
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3001/interns')
      .then(response => {
        setInterns(response.data);
      })
      .catch(error => {
        console.error('Error fetching interns:', error);
      });
  }, []);

  return (
    <div className="intern-list">
      <h1>Intern List</h1>
      {message && <div className="message">{message}</div>}
      <table className="intern-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Domain</th>
            <th>Duration</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Date of Joining</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interns.map((intern, index) => (
            <tr key={index} onClick={()=>handleRowClick(intern) }>
              <td>{intern.name}</td>
              <td>{intern.domain}</td>
              <td>{intern.duration}</td>
              <td>{intern.phoneNumber}</td>
              <td>{intern.email}</td>
              <td>{intern.dateAdded}</td>
              <td>
                <button onClick={() => handleDelete(intern._id)} className="delete-button">
                <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedIntern && (
        <Modal
          isOpen={!!selectedIntern}
          onRequestClose={closeModal}
          contentLabel="Intern Details"
          className="intern-modal"
          overlayClassName="intern-modal-overlay"
        >
          <h2>Intern Details</h2>
          <table className="details-table">
            <tbody>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{selectedIntern.name}</td>
              </tr>
              <tr>
                <td><strong>Course:</strong></td>
                <td>{selectedIntern.course}</td>
              </tr>
              <tr>
                <td><strong>College:</strong></td>
                <td>{selectedIntern.college}</td>
              </tr>
              <tr>
                <td><strong>Domain:</strong></td>
                <td>{selectedIntern.domain}</td>
              </tr>
              <tr>
                <td><strong>Duration:</strong></td>
                <td>{selectedIntern.duration}</td>
              </tr>
              <tr>
                <td><strong>Phone Number:</strong></td>
                <td>{selectedIntern.phoneNumber}</td>
              </tr>
              <tr>
                <td><strong>Address:</strong></td>
                <td>{selectedIntern.address}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{selectedIntern.email}</td>
              </tr>
              <tr>
                <td><strong>Alternate Phone Number:</strong></td>
                <td>{selectedIntern.alternatePhoneNumber}</td>
              </tr>
              <tr>
                <td><strong>Date of Joining:</strong></td>
                <td>{selectedIntern.dateAdded}</td>
              </tr>
              <tr>
                <td><strong>Date of Birth:</strong></td>
                <td>{selectedIntern.dob}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={closeModal} className="close-button">Close</button>
        </Modal>
      )}
    </div>
  );
};

export default InternList;
