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

// Import the Mongoose model dynamically
const FormModel = require('./models').FormModel;

// Define the data for the new form
const formData = {
    id: 'example-form-1',
    authors: [
        {
            name: 'John Doe',
            affiliation: 'University of Example'
        },
        {
            name: 'Jane Smith',
            affiliation: 'Institute of Example'
        }
    ],
    figures: [
        {
            caption: 'Figure 1',
            uri: 'https://example.com/figure1.jpg'
        },
        {
            caption: 'Figure 2',
            uri: 'https://example.com/figure2.jpg'
        }
    ],
    abstract: 'This is an example abstract.',
    sections: [
        {
            title: 'Introduction',
            content: 'This is the introduction section.',
            subsections: [
                {
                    title: 'Subsection 1',
                    content: 'This is subsection 1 content.',
                    subsubsections: [
                        {
                            title: 'Subsubsection 1',
                            content: 'This is subsubsection 1 content.'
                        },
                        {
                            title: 'Subsubsection 2',
                            content: 'This is subsubsection 2 content.'
                        }
                    ]
                },
                {
                    title: 'Subsection 2',
                    content: 'This is subsection 2 content.'
                }
            ]
        },
        {
            title: 'Methods',
            content: 'This is the methods section.'
        }
    ],
    references: [
        {
            citation: 'Reference 1'
        },
        {
            citation: 'Reference 2'
        }
    ]
};

// Define the handler for the submit-form function
module.exports.submitForm = async (req, res) => {
    try {
      // Create a new form document using the FormModel
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

// Define the handler for the get-form function
module.exports.getForm = async (req, res) => {
  try {
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
