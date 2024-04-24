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
const FormModel = mongoose.model('Form', formSchema);


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
module.exports = async (req, res) => {
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
