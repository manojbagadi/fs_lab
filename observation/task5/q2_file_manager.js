const fs = require('fs');

const filename = 'sample.txt';

// 1. Create and Write to file
console.log('--- Step 1: Writing to File ---');
fs.writeFileSync(filename, 'Hello, welcome to Node.js File System!\n');
console.log(`File "${filename}" created successfully.`);

// 2. Read the initial content
console.log('\n--- Step 2: Reading File Content ---');
const content = fs.readFileSync(filename, 'utf-8');
console.log(content);

// 3. Append extra content to the file
console.log('--- Step 3: Appending Data to File ---');
fs.appendFileSync(filename, 'This is additional text appended to the file.\n');
console.log('Content appended successfully.');

// 4. Read and display the updated final file
console.log('\n--- Step 4: Final File Content ---');
const finalContent = fs.readFileSync(filename, 'utf-8');
console.log(finalContent);

