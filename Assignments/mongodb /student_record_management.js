use collegeDB;

db.createCollection("students");

db.students.insertMany([
    {
        rollNo: "23CM001",
        name: "Ravi Kumar",
        branch: "CSE-AIML",
        year: 3,
        marks: 85,
        email: "ravi@example.com"
    },
    {
        rollNo: "23CM002",
        name: "Anjali Sharma",
        branch: "CSE",
        year: 3,
        marks: 92,
        email: "anjali@example.com"
    },
    {
        rollNo: "23CM003",
        name: "Kiran Reddy",
        branch: "ECE",
        year: 2,
        marks: 68,
        email: "kiran@example.com"
    },
    {
        rollNo: "23CM004",
        name: "Sneha Rao",
        branch: "CSE-AIML",
        year: 3,
        marks: 45,
        email: "sneha@example.com"
    },
    {
        rollNo: "23CM005",
        name: "Arjun Kumar",
        branch: "MECH",
        year: 2,
        marks: 78,
        email: "arjun@example.com"
    },
    {
        rollNo: "23CM006",
        name: "Priya Singh",
        branch: "CSE",
        year: 4,
        marks: 88,
        email: "priya@example.com"
    }
]);

print("\n--- ALL STUDENTS ---");

db.students.find().forEach(printjson);

print("\n--- STUDENTS FROM CSE-AIML ---");

db.students.find({
    branch: "CSE-AIML"
}).forEach(printjson);


print("\n--- STUDENTS WITH MARKS MORE THAN 75 ---");

db.students.find({
    marks: { $gt: 75 }
}).forEach(printjson);


print("\n--- SEARCH STUDENT BY ROLL NUMBER ---");

db.students.findOne({
    rollNo: "23CM001"
});


print("\n--- STUDENTS WITH MARKS GREATER THAN 80 ---");

db.students.find({
    marks: { $gt: 80 }
}).forEach(printjson);


print("\n--- STUDENTS IN 3RD YEAR ---");

db.students.find({
    year: 3
}).forEach(printjson);

print("\n--- UPDATING RAVI KUMAR'S MARKS ---");

db.students.updateOne(
    { rollNo: "23CM001" },
    { $set: { marks: 90 } }
);

print("\n--- UPDATED RAVI KUMAR RECORD ---");

db.students.findOne({
    rollNo: "23CM001"
});


print("\n--- UPDATING RAVI KUMAR'S EMAIL ---");

db.students.updateOne(
    { rollNo: "23CM001" },
    { $set: { email: "ravikumar@example.com" } }
);

print("\n--- UPDATED EMAIL ---");

db.students.findOne({
    rollNo: "23CM001"
});


print("\n--- DELETING STUDENT 23CM005 ---");

db.students.deleteOne({
    rollNo: "23CM005"
});

print("\n--- STUDENTS AFTER DELETION ---");

db.students.find().forEach(printjson);



print("\n--- STUDENTS SORTED BY MARKS (DESCENDING) ---");

db.students.find()
    .sort({ marks: -1 })
    .forEach(printjson);


print("\n--- CREATING INDEX ON rollNo ---");

db.students.createIndex({
    rollNo: 1
});


print("\n--- AVAILABLE INDEXES ---");

db.students.getIndexes().forEach(printjson);



print("\n--- SEARCHING USING rollNo ---");

db.students.find({
    rollNo: "23CM001"
}).forEach(printjson);


print("\n--- STUDENTS SCORING ABOVE 80 ---");

db.students.find({
    marks: { $gt: 80 }
}).forEach(printjson);


print("\n--- STUDENTS SCORING BELOW 50 ---");

db.students.find({
    marks: { $lt: 50 }
}).forEach(printjson);



print("\n--- HIGHEST-SCORING STUDENT ---");

db.students.find()
    .sort({ marks: -1 })
    .limit(1)
    .forEach(printjson);



print("\n--- STUDENTS FROM CSE BRANCH ---");

db.students.find({
    branch: "CSE"
}).forEach(printjson);


print("\n--- STUDENTS SORTED BY MARKS (ASCENDING) ---");

db.students.find()
    .sort({ marks: 1 })
    .forEach(printjson);


print("\n--- STUDENTS SORTED BY MARKS (DESCENDING) ---");

db.students.find()
    .sort({ marks: -1 })
    .forEach(printjson);


print("\n--- FINAL STUDENT RECORDS ---");

db.students.find().forEach(printjson);
