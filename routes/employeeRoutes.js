const express = require("express");

const router = express.Router();

const {
    getEmployees,
    getEmployeeById,
    searchEmployeeByname,
    searchEmployeeBydept,
    filterEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,

} = require("../controllers/employeeController");

// GET all employees
router.get("/employees",getEmployees);


// // search employee by name
router.get("/employees/search", searchEmployeeByname);

// // search employee by dept
router.get("/employees/search/dept", searchEmployeeBydept);

// // Filter employee by salary
router.get("/employees/filter", filterEmployees);


// // GET employee by ID
router.get("/employees/:id",getEmployeeById);

// // Create employee
router.post("/employees/", createEmployee);

// // Update employee
router.put("/employees/:id", updateEmployee);

// // Delete employee
router.delete("/employees/:id", deleteEmployee);

module.exports  = router;
