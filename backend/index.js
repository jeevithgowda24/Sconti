const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const InternModel = require('./Models/interns');
const AttendanceModel=require('./Models/attendance_model');
const ProjectModel=require('./Models/project')



const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://jeevithgowda8467:84678467@cluster0.1lhep5l.mongodb.net/IAS');

// Endpoint to fetch all interns data
app.get('/interns', async (req, res) => {
    try {
        const interns = await InternModel.find();
        res.json(interns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//Endpoint to add interns to database
app.post('/add', (req, res) => {
    const internData = req.body.intern;
    InternModel.create(internData)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});
//Endpoint to display attendance in dashboard
app.get('/attendance/today', async (req, res) => {
    try {
        const currentDate = new Date().toISOString().split('T')[0];
        const attendanceToday = await AttendanceModel.find({ date: currentDate, status: 'Present' });
        res.json(attendanceToday);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch today\'s attendance' });
    }
});

//Endpoint to send the attendance to the database
app.post('/attendance', (req, res) => {
    const { name, date, domain, status } = req.body;
    const attendanceData = {
        name,
        date,
        domain,
        status
    };
    AttendanceModel.create(attendanceData)
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});

//Endpoint to display the today's data in attendance page

const moment = require('moment');

app.get('/attendance', async (req, res) => {
    const { date } = req.query;
  
    // Format the date consistently using moment
    const formattedDate = moment(date).format('YYYY-MM-DD');
  
    try {
      // Find attendance records for the specified date
      const attendanceRecords = await AttendanceModel.find({ date: formattedDate });
      res.json(attendanceRecords);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      res.status(500).json({ error: 'Error fetching attendance data' });
    }
  });
  

// Endpoint to delete an intern by ID
app.delete('/interns/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await InternModel.findByIdAndDelete(id);
        res.json({ message: 'Intern deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete intern' });
    }
});


// Endpoint to fetch all projects
app.get('/projects', async (req, res) => {
    try {
        const projects = await ProjectModel.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to add a new project
app.post('/projects', async (req, res) => {
    const projectData = req.body;
    try {
        const project = await ProjectModel.create(projectData);
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to delete a project by ID
app.delete('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await ProjectModel.findByIdAndDelete(id);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
});


//Endpoint to get list of projects available
app.get('/projects/total', async (req, res) => {
    try {
      const totalProjectsCount = await ProjectModel.countDocuments();
      res.json({ totalProjects: totalProjectsCount });
    } catch (error) {
      console.error('Error fetching total projects count:', error);
      res.status(500).json({ message: 'Error fetching total projects count' });
    }
});


// Endpoint to search interns by name
app.get('/interns/search', async (req, res) => {
    try {
        const { name } = req.query;
        const interns = await InternModel.find({
            name: { $regex: name, $options: 'i' }
        });
        res.json(interns);
    } catch (error) {
        res.status(500).json({ message: 'Failed to search interns' });
    }
});


app.listen(3001, () => {
    console.log(`Server is Running`);
});
