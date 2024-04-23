const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const uri = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Define your Mongoose schema and model
// Define your Mongoose schema
const FormSchema = new mongoose.Schema({
    id: { type: String, required: true },
    authors: [{
        name: { type: String, required: true },
        affiliation: { type: String, required: true }
    }],
    figures: [{
        caption: { type: String },
        uri: { type: String, required: true }
    }],
    abstract: { type: String, required: true },
    sections: [{
        title: { type: String, required: true },
        content: { type: String, required: true },
        subsections: [{
            title: { type: String, required: true },
            content: { type: String, required: true },
            subsubsections: [{
                title: { type: String, required: true },
                content: { type: String, required: true }
            }]
        }]
    }],
    references: [{
        citation: { type: String, required: true }
    }]
});
const FormModel = mongoose.model('Form', FormSchema);

// Example function to insert data into the database
exports.handler = async (event, context) => {
    try {
        const requestData = JSON.parse(event.body); // Assuming the request body contains data to be inserted
        const newData = await FormModel.create(requestData);
        return {
            statusCode: 200,
            body: JSON.stringify(newData)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
exports.FormModel = FormModel;

