const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        default: '',  // Intern's name or empty if not assigned
    },
    domain: {
        type: String,
        required: true,
    },
});

const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = ProjectModel;
