const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');

require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Middleware for parsing JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    
    // Start the server after successful database connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });// Connect to MongoDB Atlas

// Import the Mongoose model dynamically
const FormModel = require('./models').FormModel;

// Define the URL of your backend server
const SERVER_URL = 'http://localhost:3000'; // Change this to your actual server URL

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

app.post('/submit-form', async (req, res) => {
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
  });

// Define a route to handle GET request to retrieve data
app.get('/get-form/:id', async (req, res) => {
  try {
    // Extract the form ID from the request parameters
    const { id } = req.params;

    // Find the form document in the database based on the ID
    const form = await
    FormModel
    .findOne
    ({ id });

    // If the form is found, send it as a response
    // Otherwise, send a 404 Not Found response
    // You can customize the response based on your requirements
    // For example, you can send a different status code or message
    // if the form is not found
    // You can also include additional data in the response
    // such as an error message or additional information
    // based on the specific use case
    // For simplicity, this example sends a generic message
    // for both success and failure cases

    if (form) {
      res.json({ message: 'Form retrieved successfully.', form });
    }
    else {
      res.status(404).json({ message: 'Form not found.' });
    }
  } catch (error) {
    // If an error occurs, send a response indicating failure
    console.error('Error retrieving form:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
);

