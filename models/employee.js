const mongoose = require("mongoose");

// schema creation
const employeeSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

// model creation
const Employee = mongoose.model("Employee",employeeSchema);

module.exports = Employee;