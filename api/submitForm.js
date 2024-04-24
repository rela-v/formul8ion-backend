const FormModel = require('../components/Form');
const db = require('./connectToDB');

const submitForm = async (formData) => {
    try {
        await db(); // Connect to the database
        await FormModel.create(formData); // Create a new form document
        return { message: 'Form submitted successfully.' }; // Return success message
    } catch (error) {
        console.error('Error submitting form:', error.message); // Log the error
        throw error; // Throw the error for handling elsewhere
    }
};

module.exports = submitForm;

const formData = {
    id: "123456",
    authors: [
        { name: "John Doe", affiliation: "University of Example" },
        { name: "Jane Smith", affiliation: "College of Sample" }
    ],
    figures: [
        { caption: "Figure 1", uri: "https://example.com/figure1" },
        { caption: "Figure 2", uri: "https://example.com/figure2" }
    ],
    abstract: "This is the abstract of the form.",
    sections: [
        {
            title: "Section 1",
            content: "Content of section 1",
            subsections: [
                {
                    title: "Subsection 1.1",
                    content: "Content of subsection 1.1",
                    subsubsections: [
                        {
                            title: "Subsubsection 1.1.1",
                            content: "Content of subsubsection 1.1.1"
                        }
                    ]
                },
                {
                    title: "Subsection 1.2",
                    content: "Content of subsection 1.2",
                    subsubsections: [
                        {
                            title: "Subsubsection 1.2.1",
                            content: "Content of subsubsection 1.2.1"
                        },
                        {
                            title: "Subsubsection 1.2.2",
                            content: "Content of subsubsection 1.2.2"
                        }
                    ]
                }
            ]
        },
        {
            title: "Section 2",
            content: "Content of section 2",
            subsections: [
                {
                    title: "Subsection 2.1",
                    content: "Content of subsection 2.1",
                    subsubsections: [
                        {
                            title: "Subsubsection 2.1.1",
                            content: "Content of subsubsection 2.1.1"
                        }
                    ]
                }
            ]
        }
    ],
    references: [
        { citation: "Reference 1" },
        { citation: "Reference 2" }
    ]
};
