const fs = require('fs');
const path = require('path');

// Function to copy files
function copyFile(source, target) {
  fs.copyFileSync(source, target);
}

// Ensure the api directory exists
const apiDir = path.join(__dirname, 'api');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir);
}

// Copy serverless function files into the api directory
copyFile(path.join(__dirname, 'submitForm.js'), path.join(apiDir, 'submitForm.js'));
copyFile(path.join(__dirname, 'getForm.js'), path.join(apiDir, 'getForm.js'));

console.log('Build completed successfully.');
