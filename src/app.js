const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware for parsing JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/submit-abstract', (req, res) => {
    const abstractText = req.body.abstractText;

    // Process the JSON data as needed
    // For example, you can store it in a database or generate HTML code

    // Here, we'll just log the abstract text to the console
    console.log('Abstract Text:', abstractText);

    // Send a response back to the frontend
    res.status(200).json({ message: 'Abstract submitted successfully.' });

    // Delete the data after it has been accessed
    deleteDataAfterAccess();
});

// Function to delete data after it has been accessed
function deleteDataAfterAccess() {
    // Implement logic here to delete the data
    // For example, you can delete the data from the database or clear the data from memory
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

