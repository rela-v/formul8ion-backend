const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Define the schema for the form data
const formSchema = new mongoose.Schema({
    id: String,
    authors: [{
        name: String,
        affiliation: String
    }],
    figures: [{
        caption: String,
        uri: String
    }],
    abstract: String,
    sections: [{
        title: String,
        content: String,
        subsections: [{
            title: String,
            content: String,
            subsubsections: [{
                title: String,
                content: String
            }]
        }]
    }],
    references: [{
        citation: String
    }]
});

// Define the model based on the schema
let FormModel;

if (mongoose.models.Form) {
    FormModel = mongoose.model('Form');
} else {
    FormModel = mongoose.model('Form', formSchema);
}

const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {});
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
};

// Define the handler for the submit-form function
const submitForm = async (req, res) => {
    try {
        // Parse form data from the request body
        const formData = req.body;

        // Create a new form document using the FormModel
        const form = new FormModel(formData);

        // Save the form document to the database
        await form.save();

        // Send a response indicating success
        res.json({ message: 'Form submitted successfully.' });
    } catch (error) {
        // If an error occurs, send a response indicating failure
        console.error('Error submitting form:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = submitForm;

