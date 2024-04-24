require('dotenv').config(); // Load environment variables from .env file

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;
{
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

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

module.exports = mongoose.model("Form", formSchema);
