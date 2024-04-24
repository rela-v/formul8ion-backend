const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

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
export const FormModel = mongoose.model('Form', formSchema);


// Define the handler for the submit-form function
module.exports = async (req, res) => {
    try {
      // Create a new form document using the FormModel
      const formData = req.body;
      const form = new FormModel(formData);
  
      // Save the form document to the database
      await form.save();
  
      // Send a response indicating success
      res.json({ message: 'Form submitted successfully.' });
    } catch (error) {
      // If an error occurs, send a response indicating failure
      console.error('Error submitting form:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
