// netlify-function.js

const mongoose = require('mongoose');

// Connect to MongoDB using the connection string stored in the environment variable
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const mongoose = require('mongoose');

// Define the Mongoose schema
const FormSchema = new mongoose.Schema({
  authors: [{
    name: String,
    affiliation: String
  }],
  figures: [{
    caption: String,
    url: String
  }],
  abstract: String,
  sections: [{
    title: String,
    content: String
  }],
  references: [{
    title: String,
    authors: String,
    year: String,
    url: String
  }]
});

// Create the Mongoose model
const FormModel = mongoose.model('Form', FormSchema);

// Export the model
module.exports = FormModel;


// Define your serverless function handler
exports.handler = async (event, context) => {
  // Extract request method and body from the event object
  const { httpMethod, body } = event;

  try {
    // Ensure the request method is POST
    if (httpMethod !== 'POST') {
      return {
        statusCode: 405, // Method Not Allowed
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }

    // Parse the request body (assuming it's in JSON format)
    const requestData = JSON.parse(body);

    // Perform database operation based on the request
    // For example, if you want to insert data into the database
    const newData = await FormModel.create(requestData);

    // Return success response with the inserted data
    return {
      statusCode: 200,
      body: JSON.stringify(newData)
    };
  } catch (error) {
    // Return error response if any error occurs
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
  
