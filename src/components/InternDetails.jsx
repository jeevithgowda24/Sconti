// src/components/InternDetails.js

import React, { useState } from 'react';
import axios from 'axios'

const InternDetails = ({ addIntern }) => {
  const [intern, setIntern] = useState({
    name: '',
    course: '',
    college: '',
    domain: '',
    duration: '',
    phoneNumber: '',
    address: '',
    email: '',
    alternatePhoneNumber: '',
    dateAdded:'',
    dob:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntern({ ...intern, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation before adding intern
    if (!intern.name || !intern.course || !intern.college || !intern.domain || !intern.duration || !intern.phoneNumber || !intern.address || !intern.email || !intern.alternatePhoneNumber) {
      alert('Please fill in all fields.');
      return;
    }
    // Add intern
    addIntern(intern);
    // Reset form fields
    setIntern({
      name: '',
      course: '',
      college: '',
      domain: '',
      duration: '',
      phoneNumber: '',
      address: '',
      email: '',
      alternatePhoneNumber: '',
      dateAdded:'',
      dob:''

    });
// Server Connection

axios.post('http://localhost:3001/add',{intern:intern})
.then(result=> console.log(result))
.catch(err=>console.log(err))




  };

  const generateOfferLetter = () => {
    // Generate offer letter content based on intern details
    const offerLetterContent = `
      <center><h1>Scontinent Technologies Pvt Ltd.</h1>
      <p>MB#7,2nd Floor, 2nd Block,Old Outer Ring Rd, 2 Stage,Naagarabhaavi, Bengaluru, Karnataka 560072<p>
      <h2>INTERNSHIP JOINING LETTER<h2>
      </center>
       <p>Dear, ${intern.name}</p>
      <p>We are thrilled to welcome you to Scontinent Technologies Pvt Ltd as an intern. Congratulations on
your acceptance into our internship program! We are confident that your talent and dedication will
be a great asset to our team. </p>
     <br/>
     <p><b>Internship Details</b></p>
     <p>Internship Role: ${intern.domain}.</p>
     <p>Location: Bengaluru.</p>
     <p>Stipend/Compensation: No Stipend.</p>


     <p>Your journey with us will be an opportunity to gain practical experience, develop new skills, and
contribute to exciting projects in the tech industry. Our team of experienced professionals is eager
to mentor and support you throughout your internship, ensuring you have a meaningful and
rewarding experience. </p>

     <p>Internship Program Highlights:
- Hands-on experience in innovative tech projects.<br/>
- Collaboration with a diverse and dynamic team.<br/>
- Learning opportunities through workshops and training sessions.<br/>
- Exposure to cutting-edge technologies and industry trends. </p>
      
    <p><b>Joining Details</b></p>
    <p>Reporting Time: 10:00AM</p>
    <p>Office: Bengaluru</p>
    <p>Start Date:${intern.dateAdded}</p>
    
    <p>We are excited to have you join our team and look forward to a fantastic and enriching internship
journey together.</p>
<p>Welcome aboard, and once again, congratulations on becoming a part of Scontinent Technologies!</p>
<p><b>Note</b>: In the period of internship any instance where an intern engages in misconduct or inappropriate
behaviour, the company reserves the right to take appropriate measures, which may include the
possibility of intern's participation being discontinued. </p>
<p>Best Regards,</br>
Naveen Kumar</br>
Scontinent Technology pvt ltd.</br>
9964473910</p> 
<p id="sign"><right>Applicant Signature</right></p>

    `;

    return offerLetterContent;
  };

  // Function to handle print
  const handlePrint = () => {
    const offerLetterContent = generateOfferLetter();
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Offer Letter</title>
          <style>
          #sign{
            margin-left:73%;
          }
            /* Add CSS styling for the offer letter */
            /* For example:
            body {
              font-family: Arial, sans-serif;
            }
            */
          </style>
        </head>
        <body>
          ${offerLetterContent}
          <script>
            // Automatically trigger print dialog
            window.print();
            // Close print window after printing
            window.onafterprint = function() {
              window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };



  return (
    <div className="intern-details-container">
      <h1>Add New Intern</h1>
      <form onSubmit={handleSubmit} className='intern-details-form'>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={intern.name} onChange={handleChange} />

        <label htmlFor="course">Course:</label>
        <select id="course" name="course" value={intern.course} onChange={handleChange}>
          <option value="">Select Course</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
          <option value="B-Tech">B-tech</option>
          <option value="BSc">BSc</option>
        </select>

        <label htmlFor="college">College:</label>
        <input type="text" id="college" name="college" value={intern.college} onChange={handleChange} />

        <label htmlFor="domain">Domain:</label>
        <select id="domain" name="domain" value={intern.domain} onChange={handleChange}>
          <option value="">Select Domain</option>
          <option value="Front End Development">Front End Development</option>
          <option value="Back End Development">Back End Development</option>
          <option value="Full Stack Development">Full Stack Development</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Data Science">Data Science</option>
        </select>

        <label htmlFor="duration">Duration:</label>
        <input type="text" id="duration" name="duration" value={intern.duration} onChange={handleChange} />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" name="phoneNumber" value={intern.phoneNumber} onChange={handleChange} />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={intern.address} onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={intern.email} onChange={handleChange} />

        <label htmlFor="alternatePhoneNumber">Alternate Phone Number:</label>
        <input type="text" id="alternatePhoneNumber" name="alternatePhoneNumber" value={intern.alternatePhoneNumber} onChange={handleChange} />

        <label htmlFor="dateAdded">Date of Joining:</label>
        <input type="date" id="dateAdded" name="dateAdded" value={intern.dateAdded} onChange={handleChange} />


        <label htmlFor="dob">Date of Birth</label>
        <input type="date" id="dob" name="dob" value={intern.dob} onChange={handleChange} />
       
       
        <button type="submit">Add Intern</button>
        <button type="button" onClick={handlePrint}>Print Offer Letter</button> {/* Print button */}
      </form>
    </div>
  );
};

export default InternDetails;
