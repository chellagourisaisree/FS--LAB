class Student {

    constructor(name, rollNumber, department, cgpa) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.department = department;
        this.cgpa = cgpa;
    }
}


const button = document.getElementById("displayBtn");


button.addEventListener("click", function () {

    const name = document.getElementById("name").value;
    const rollNumber = document.getElementById("rollNumber").value;
    const department = document.getElementById("department").value;
    const cgpa = document.getElementById("cgpa").value;


    const student = new Student(
        name,
        rollNumber,
        department,
        cgpa
    );


    const container = document.getElementById("profileContainer");

    container.innerHTML = "";

    const profile = document.createElement("div");

    profile.className = "profile";


    const heading = document.createElement("h2");

    heading.textContent = "Student Profile";

    profile.appendChild(heading);

    const nameElement = document.createElement("p");
    nameElement.textContent = "Name       : " + student.name;

    const rollElement = document.createElement("p");
    rollElement.textContent = "Roll No    : " + student.rollNumber;

    const departmentElement = document.createElement("p");
    departmentElement.textContent = "Department : " + student.department;

    const cgpaElement = document.createElement("p");
    cgpaElement.textContent = "CGPA       : " + student.cgpa;


    profile.appendChild(nameElement);
    profile.appendChild(rollElement);
    profile.appendChild(departmentElement);
    profile.appendChild(cgpaElement);


    container.appendChild(profile);

});
