const FormModel = require('../components/Form');
const db = require('./connectToDB');

const getForm = async (id) => {
    try {
        await db();
        const form = await FormModel.findOne({ id });
        if (form) {
            await FormModel.deleteOne({ id });
            return { message: 'Form retrieved successfully.', form };
        } else {
            return { message: 'Form not found.' };
        }
    } catch (error) {
        console.error('Error retrieving form:', error.message);
        throw error;
    }
};
getForm("12345");
module.exports = getForm;
