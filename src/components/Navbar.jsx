import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';
import Modal from 'react-modal';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setMessage('Please enter intern name.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3001/interns/search?name=${searchTerm}`);
      setSearchResults(response.data);
      if (response.data.length === 0) {
        setMessage('No interns found.');
      } else {
        setMessage('');
      }
    } catch (error) {
      console.error('Error searching interns:', error);
      setMessage('Error searching interns.');
    }
  };

  const handleResultClick = (intern) => {
    setSelectedIntern(intern);
    setSearchResults([]);
    setSearchTerm('');
    setMessage('');
  };

  const closeModal = () => {
    setSelectedIntern(null);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setSearchResults([]);
      setMessage('');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <form onSubmit={handleSearch}>
          <div className="form-input">
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button type="submit" className="search-btn">
              <AiOutlineSearch className="search-icon" />
            </button>
          </div>
        </form>
        <a href="#" className="profile">
          <img src="./images/sconti.jpeg.jpg" alt="Profile" />
        </a>
      </nav>
      {message && <div className="message">{message}</div>}
      {searchResults.length > 0 && (
        <div className="search-results">
          <ul>
            {searchResults.map((intern) => (
              <li key={intern._id} onClick={() => handleResultClick(intern)}>
                {intern.name}
              </li>
            ))}
          </ul>
        </div>
      )}
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

export default Navbar;
