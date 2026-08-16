// Create Student class
class Student {

    constructor(name, rollNumber, department, cgpa) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.department = department;
        this.cgpa = cgpa;
    }
}


// Select the button
const button = document.getElementById("displayBtn");


// Add click event
button.addEventListener("click", function () {

    // Get values from input fields
    const name = document.getElementById("name").value;
    const rollNumber = document.getElementById("rollNumber").value;
    const department = document.getElementById("department").value;
    const cgpa = document.getElementById("cgpa").value;


    // Create Student object
    const student = new Student(
        name,
        rollNumber,
        department,
        cgpa
    );


    // Select profile container
    const container = document.getElementById("profileContainer");

    // Clear previous profile
    container.innerHTML = "";


    // Create profile dynamically
    const profile = document.createElement("div");

    profile.className = "profile";


    // Create heading
    const heading = document.createElement("h2");

    heading.textContent = "Student Profile";

    profile.appendChild(heading);


    // Create student details
    const nameElement = document.createElement("p");
    nameElement.textContent = "Name       : " + student.name;

    const rollElement = document.createElement("p");
    rollElement.textContent = "Roll No    : " + student.rollNumber;

    const departmentElement = document.createElement("p");
    departmentElement.textContent = "Department : " + student.department;

    const cgpaElement = document.createElement("p");
    cgpaElement.textContent = "CGPA       : " + student.cgpa;


    // Add details to profile
    profile.appendChild(nameElement);
    profile.appendChild(rollElement);
    profile.appendChild(departmentElement);
    profile.appendChild(cgpaElement);


    // Display profile on webpage
    container.appendChild(profile);

});