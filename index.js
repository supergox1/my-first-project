// Building a Student Data Management RESTful API for Data Retrieval, Insertion, Update, and Deletion

const express = require('express'); 
const mongoose = require('mongoose');


const app = express(); 
app.use(express.json());
const port = process.env.PORT || 3000;

let data = [
    { "name": "Olufemi Peters", "course": "Engineering", "Matric_number": "1234", "id": 1},
    { "name": "Rasak Alegbe", "course": "Yoruba", "Matric_number": "1235", "id": 2 },
    { "name": "Nnamdi John", "course": "English", "Matric_number": "1236", "id": 3}
];

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});

// To get all students data (READ)
// Endpoint: `/student`
// Method: GET

app.get('/student', function (req, res) {
    res.status(200).json(data);
});

// To fetch a single student's record (READ)
// Endpoint:** `/student:id`
// Method: GET
// Parameters: `id` (integer): The unique identifier of the student.

app.get("/student/:id", function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// To insert a New Student Record(Create)
// Endpoint: `/student`
// Method: POST
// Request Body: JSON object with the following fields:
// `name` (string): Student’s name.
// `course` (string): Student’s course.
// `Matric_number` (string): Student’s matric number.

app.post('/student', function (req, res) {

    let items = data.map(item => item.id);

    let newId = items.length > 0 ? Math.max.apply(Math, items) + 1 : 1;

    let newItem = {
        id: newId,
        name: req.body.name,
        course: req.body.course,
        Matric_number: req.body.Matric_number
    }

    data.push(newItem);

    res.status(201).json({
        'message': "successfully created"
    });
});

// To update a Student Record (Update)
// Endpoint: `/student:id`
// Method: PUT

app.put('/student/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        let updateData = {
            id: found.id,
            name: req.body.name,
            course: req.body.course,
            Matric_number: req.body.Matric_number
        };

        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1, updateData);

        res.status(201).json({ 'message': "data updated" });
    } else {
        res.status(404).json({
            'message': 'unable to insert data because data inserted not matched'
        });
    }
});


// To delete a student record. (DELETE)
// Endpoint: `/student/:id`
// Method: DELETE

app.delete('/student/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1);

        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});


