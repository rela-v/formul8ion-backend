require('dotenv').config(); // Load environment variables from .env file

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;

async function main() {
  try {
    await mongoose.connect(mongoDB);

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
            title: String, // Added missing property "title"
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

    // Export the model
    module.exports = mongoose.model("Form", formSchema);
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

main().catch((err) => console.log(err));

