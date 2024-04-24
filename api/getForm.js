const FormModel = require('../components/Form');
const db = require('./connectToDB');

const getForm = async (req, res) => {
    try {
        const { id } = req.body; // Extract id from req.body

        // Connect to the database
        await db();

        // Find the form document in the database based on the id
        const form = await FormModel.findOne({ id });

        if (form) {
            // If the form is found, delete it from the database
            await FormModel.deleteOne({ id });

            // Send the form as a response
            res.json({ message: 'Form retrieved successfully.', form });
        } else {
            // If the form is not found, send a 404 response
            res.status(404).json({ message: 'Form not found.' });
        }
    } catch (error) {
        // If an error occurs, log the error and send a 500 response
        console.error('Error retrieving form:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getForm;

