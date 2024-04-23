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
