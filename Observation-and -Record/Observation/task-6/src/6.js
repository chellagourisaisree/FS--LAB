```javascript
// Experiment 6: Node.js Modules
// Demonstrating os, path and fs modules

// Import built-in modules
const os = require("os");
const path = require("path");
const fs = require("fs");


// ===============================
// 1. OS MODULE
// ===============================

console.log("===== OS MODULE =====");

console.log("Operating System:", os.platform());
console.log("OS Type:", os.type());
console.log("CPU Architecture:", os.arch());
console.log("Number of CPUs:", os.cpus().length);
console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());
console.log("Home Directory:", os.homedir());


// ===============================
// 2. PATH MODULE
// ===============================

console.log("\n===== PATH MODULE =====");

const filePath = path.join(
    __dirname,
    "files",
    "student.txt"
);

console.log("Complete Path:", filePath);
console.log("File Name:", path.basename(filePath));
console.log("Directory Name:", path.dirname(filePath));
console.log("File Extension:", path.extname(filePath));


// ===============================
// 3. FS MODULE
// ===============================

console.log("\n===== FS MODULE =====");

const fileName = "student.txt";
const content = "Name: Gouri\nBranch: CSE-AIML\nYear: 3";

// Create and write to a file
fs.writeFileSync(fileName, content);

console.log("File created successfully.");


// Read the file
const data = fs.readFileSync(fileName, "utf8");

console.log("\nFile Content:");
console.log(data);


// Append data to the file
fs.appendFileSync(
    fileName,
    "\nCollege: ANITS"
);

console.log("\nData appended successfully.");


// Read updated file
const updatedData = fs.readFileSync(
    fileName,
    "utf8"
);

console.log("\nUpdated File Content:");
console.log(updatedData);


// Check whether file exists
if (fs.existsSync(fileName)) {
    console.log("\nstudent.txt exists.");
}
```
