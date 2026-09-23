const { application } = require("express");
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

// get employee by id
const getEmployeeById = async (req, res) => {
    try {
        const getId = Number(req.params.id);
        if (isNaN(getId)) {
            return res.status(400).json({ error: "Invalid employee ID "});

        }

        const employee = await Employee.findOne({ id: getId });

        if (employee === null) {
            return res.status(404).json({ error: "Employee not found" });

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

        const employee = await Employee.find({ name: name });

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

        const employee = await Employee.find({ department: department.toUpperCase() });


        res.status(200).json(employee);


    } catch (error) {
        // console.log("check")
        res.status(500).json({

            error: "Database error",
            details: error.message
        });
    }
};

// Filter emp by salary
const filterEmployees = async (req, res) => {
    try {
        const salary = parseFloat(req.query.minSalary) || 0;


        const employee = await Employee.find({ salary: { $gte: salary } });

        res.status(200).json(employee)

    } catch (error) {
        res.status(404).json({ error: "Not found", details: error.message })
    }
}

// Create employee
const createEmployee = async (req, res) => {

    try {
        const {
            name,
            department,
            salary
        } = req.body;

        // Validation
        if (
            typeof name !== "string" ||
            name.trim() === ""
        ) {
            return res.status(400).json({
                error: "Name cannot be empty"
            });
        }

        if (
            typeof department !== "string" ||
            department.trim() === ""
        ) {
            return res.status(400).json({
                error: "Invalid department"
            });
        }

        if (
            typeof salary !== "number" ||
            Number.isNaN(salary)
        ) {
            return res.status(400).json({
                error: "Invalid salary"
            });
        }

        // Generate next custom ID
        const lastEmployee = await Employee.findOne()
            .sort({ id: -1 });

        const newId = lastEmployee
            ? lastEmployee.id + 1
            : 1;

        // Create employee
        const employee = new Employee({
            id: newId,
            name: name.trim(),
            department: department.trim(),
            salary
        });

        // Save to MongoDB
        await employee.save();

        res.status(201).json(employee);

    } catch (error) {
        res.status(500).json({
            error: "Failed to create employee"
        });
    }

};
// Update employee
const updateEmployee = async (req,res) =>{


    try {
        const getId = Number(req.params.id);

        if (Number.isNaN(getId)) {
            return res.status(400).json({
                error: "Invalid employee ID"
            });
        }

        // Don't allow ID change
        if (req.body.id !== undefined) {
            return res.status(400).json({
                error: "ID cannot be changed"
            });
        }

        // Check employee exists
        const employee = await Employee.findOne({
            id: getId
        });

        if (employee === null) {
            return res.status(404).json({
                error: "Employee not found"
            });
        }

        // Nothing provided
        if (
            req.body.name === undefined &&
            req.body.department === undefined &&
            req.body.salary === undefined
        ) {
            return res.status(400).json({
                error: "No valid fields provided"
            });
        }

        const updateData = {};

        // Validate and prepare name
        if (req.body.name !== undefined) {
            if (
                typeof req.body.name !== "string" ||
                req.body.name.trim() === ""
            ) {
                return res.status(400).json({
                    error: "Invalid name"
                });
            }

            updateData.name = req.body.name.trim();
        }

        // Validate and prepare department
        if (req.body.department !== undefined) {
            if (
                typeof req.body.department !== "string" ||
                req.body.department.trim() === ""
            ) {
                return res.status(400).json({
                    error: "Invalid department"
                });
            }

            updateData.department = req.body.department.trim();
        }

        // Validate and prepare salary
        if (req.body.salary !== undefined) {
            if (req.body.salary === "") {
                return res.status(400).json({
                    error: "Salary cannot be empty"
                });
            }

            if (
                typeof req.body.salary !== "number" ||
                Number.isNaN(req.body.salary)
            ) {
                return res.status(400).json({
                    error: "Invalid salary"
                });
            }

            updateData.salary = req.body.salary;
        }

        // Update MongoDB
        const updatedEmployee =
            await Employee.findOneAndUpdate(
                { id: getId },
                updateData,
                { new: true }
            );

        res.status(200).json(updatedEmployee);

    } catch (error) {
        res.status(500).json({
            error: "Failed to update employee"
        });
    }
};
//  DELETE employe by id
const deleteEmployee = async (req,res) => {
        try {
        const getId = Number(req.params.id);

        if (Number.isNaN(getId)) {
            return res.status(400).json({
                error: "Invalid employee ID"
            });
        }

        const deletedEmployee =
            await Employee.findOneAndDelete({
                id: getId
            });

        if (deletedEmployee === null) {
            return res.status(404).json({
                error: "Employee not found"
            });
        }

        res.status(200).json({
            // employee: deletedEmployee,
            message: "Employee successfully deleted"
        });

    } catch (error) {
        res.status(500).json({
            error: "Failed to delete employee"
        });
    }

}

module.exports = {
    getEmployees,
    getEmployeeById,
    searchEmployeeByname,
    searchEmployeeBydept,
    filterEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    
};