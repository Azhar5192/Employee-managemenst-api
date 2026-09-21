const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: String,
    department: String,
    salary: Number
});

const Employee = mongoose.model("Employees", employeeSchema);

module.exports = Employee;