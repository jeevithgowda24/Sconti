import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const [isFutureDate, setIsFutureDate] = useState(false);
  const printRef = useRef();

  // Fetch attendance data based on the selected date
  const fetchAttendanceData = (date) => {
    axios.get('http://localhost:3001/attendance', { params: { date: moment(date).format('YYYY-MM-DD') } })
      .then(response => {
        setAttendanceData(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  };

  // Fetch data when the selected date changes
  useEffect(() => {
    if (selectedDate > new Date()) {
      setIsFutureDate(true);
      setAttendanceData([]); // Clear data for future dates
    } else {
      setIsFutureDate(false);
      fetchAttendanceData(selectedDate);
    }
  }, [selectedDate]);

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Function to handle printing
  const handlePrint = useReactToPrint({
    content: () => printRef.current, // Ref to the component to be printed
  });

  // Function to generate PDF from the printed component
  const generatePdf = () => {
    html2canvas(printRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('attendance.pdf');
    });
  };

  return (
    <div className="attendance-container">
      <h1 className="attendance-header">Attendance Records</h1>
      <div className="date-picker-container">
        <label htmlFor="datePicker">Select Date: </label>
        <DatePicker
          id="datePicker"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="date-picker"
        />
      </div>
      <div ref={printRef} className="attendance-table-container">
        {isFutureDate ? (
          <p className="future-date-message"><center><b>Future date attendance cannot be shown</b></center></p>
        ) : (
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index}>
                  <td>{record.name}</td>
                  <td>{moment(record.date).format('YYYY-MM-DD')}</td> {/* Format date here */}
                  <td className={record.status === 'Present' ? 'present' : 'absent'}>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="button-container">
        <button className="print-button" onClick={handlePrint}>Print</button>
        <button className="pdf-button" onClick={generatePdf}>Download PDF</button>
      </div>
    </div>
  );
};

export default AttendancePage;
