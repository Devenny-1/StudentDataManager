const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());

// In-memory to store student data
let students = [];

//add a new student data, works perfectly on postman
app.post('/addnewstudents', (req, res) => {
    const { name, age, email, course, department, guardianContact } = req.body;

    const newStudent = {
        id: Date.now(),
        name,
        age,
        email,
        course,
        department,
        guardianContact
    };
    
    students.push(newStudent);
    res.status(201).json(newStudent);
});

//Get all students
app.get('/getallstudents', (req, res) => {
    res.status(200).json(students);
});

//Get a student by an ID
app.get('/getstudentbyid/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({ error: "Student is not found" });
    }

    res.status(200).json(student);
});

//Update a student information
app.put('/updatestudent/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    // Update the existing student data with the new data from the request body
    const updatedStudent = { 
        ...students[studentIndex], 
        ...req.body,
        id: studentId // Ensure the ID cannot be overwritten
    };
    
    students[studentIndex] = updatedStudent;
    res.status(200).json(updatedStudent);
});

//Delete a student 
app.delete('/deleteAstudent/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    // Remove the student from the array
    const deletedStudent = students.splice(studentIndex, 1);
    res.status(200).json({ message: "Student deleted successfully", deletedStudent });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});