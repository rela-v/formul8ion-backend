const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB Atlas
mongoose.connect( process.env.MONGODB_URI;, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

// Define the handler for the get-form function
const getForm = async (req, res) => {
  try {
    // Import the Mongoose model dynamically
    const FormModel = require('./submitForm.js').FormModel;

    // Extract the form ID from the request parameters
    const { id } = req.query;

    // Find the form document in the database based on the ID
    const form = await FormModel.findOne({ id });

    // If the form is found, send it as a response
    // Otherwise, send a 404 Not Found response
    if (form) {
      // Delete the form document from the database
      await FormModel.deleteOne({ id });

      // Send the form as a response
      res.json({ message: 'Form retrieved successfully.', form });
    } else {
      res.status(404).json({ message: 'Form not found.' });
    }
  } catch (error) {
    // If an error occurs, send a response indicating failure
    console.error('Error retrieving form:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = getForm;

