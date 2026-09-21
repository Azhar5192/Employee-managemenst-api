const Employee = require("../models/employees");

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();

        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({
            error: "Database error"
        });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const getId = Number(req.params.id);

        const employee = await Employee.findOne({id : getId});

        if (employee === null){
            return res.status(404).json({error: "Employee not found"});

        }

        res.status(200).json(employee);
    } catch (error) {
        // console.log("check")
        res.status(500).json({
            
            error: "Database error",
            details: error.message
        });
    }
};

// search emp by name
const searchEmployeeByname = async (req, res) => {
    try {
        const name = req.query.name;

        const employee = await Employee.find({name: name});

        res.status(200).json(employee);

    } catch (error) {
        // console.log("check")
        res.status(500).json({
            
            error: "Database error",
            details: error.message
        });
    }
};


// search emp by dept
const searchEmployeeBydept = async (req, res) => {
    try {
        const department = req.query.department;

        const employee = await Employee.find({department: department});
        
        res.status(200).json(employee);
        
        
    } catch (error) {
        // console.log("check")
        res.status(500).json({
            
            error: "Database error",
            details: error.message
        });
    }
};


module.exports = {
    getEmployees,
    getEmployeeById,
    searchEmployeeByname,
    searchEmployeeBydept,


};