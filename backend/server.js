const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Define a port
const port = 3001;

// Connect to MongoDB
const connectToDatabase = async () => {
    await mongoose.connect('mongodb://localhost:27017/studentdb');
    console.log('Connected to MongoDB');
}

connectToDatabase();

// Define a schema and model for the collection
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    grade: String
});

const Student = mongoose.model('Student', studentSchema);

// just adding a simpel testing purpose hello world example
app.get('/', async (req, res) => {
    try {
        res.send("Hello World");
    } catch (err) {
        res.status(500).send(err);
    }
});


// Define a route to get all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});