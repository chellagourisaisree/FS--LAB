const fs = require('fs');

const fileName = 'example.txt';
const initialContent = 'Hello, World!\n';
const extraContent = 'Appended line of text.\n';

// 1. Create or Write to the file
fs.writeFileSync(fileName, initialContent);
console.log('1. File created and written to.');

// 2. Read the initial contents
const readInitial = fs.readFileSync(fileName, 'utf8');
console.log('2. Reading file contents:\n' + readInitial);

// 3. Append additional content
fs.appendFileSync(fileName, extraContent);
console.log('3. Content appended.');

// 4. Read and display final contents
const readFinal = fs.readFileSync(fileName, 'utf8');
console.log('4. Displaying final file contents:\n' + readFinal);
