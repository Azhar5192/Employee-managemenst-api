const express = require("express");

const router = express.Router();

const {
    getEmployees,
    getEmployeeById,
    searchEmployeeByname,
    searchEmployeeBydept,
    // filterEmployees,
    // createEmployee,
    // updateEmployee,
    // deleteEmployee,

} = require("../controllers/employeeController");

// GET all employees
router.get("/employees",getEmployees);


// // search employee by name
router.get("/employees/search", searchEmployeeByname);

// // search employee by dept
router.get("/employees/search", searchEmployeeBydept);
// // Filter employee by salary
// router.get("/employees/filter", filterEmployees);


// // GET employee by ID
router.get("/employees/:id",getEmployeeById);

// // Create employee
// router.post("/employees/", createEmployee);

// // Update employee
// router.put("/employees/:id", updateEmployee);

// // Delete employee
// router.delete("/employees/:id", deleteEmployee);

module.exports  = router;
// // Get all employee
// app.get("/employees", async (req,res)=>{
//   try{
//     const employee = await Employee.find();

//     res.status(200).json(employee);
//   } catch(error){
//     res.status(500).json({error: "Database error"})
      
//     }
// })

// // search employee by name
// app.get("/employees/search/name", async (req, res) => {
//   try{
//     const getName = req.query.name;
//     if(!getName){
//       return res.status(404).jdon({error:"Name not found"});

//     }
//     const employees = await Employee.find({
//       name:getName
//     })
//     if(employees.length === 0){
//       return res.status(404).json({error:"No employees found"});

//     }
//     res.status(200).json(employees);
//   } catch(error){
//     res.status(500).json({error:"database error"})
//   }
// });

// // Get search by department
// app.get("/employees/search/department", async (req, res) => {
//     try {
//         const getDept = req.query.department;

//         if (!getDept) {
//             return res.status(400).json({
//                 error: "Department is required"
//             });
//         }

//         const employees = await Employee.find({
//             department: getDept
//         });

//         if (employees.length === 0) {
//             return res.status(404).json({
//                 error: "No employees found"
//             });
//         }

//         res.status(200).json(employees);
//     } catch (error) {
//         res.status(500).json({
//             error: "Database error"
//         });
//     }
// });

// // Filter employees by salary
// app.get("/employees/filter", async (req, res) => {
//     try {
//         const minSalary = Number(req.query.minSalary);

//         if (
//             req.query.minSalary === undefined ||
//             Number.isNaN(minSalary)
//         ) {
//             return res.status(400).json({
//                 error: "Valid minSalary is required"
//             });
//         }

//         const employees = await Employee.find({
//             salary: {
//                 $gte: minSalary
//             }
//         });

//         if (employees.length === 0) {
//             return res.status(404).json({
//                 error: "No employees found"
//             });
//         }

//         res.status(200).json(employees);
//     } catch (error) {
//         res.status(500).json({
//             error: "Database error"
//         });
//     }
// });

// //  GEt employee by ID----------------
// app.get("/employees/:id", async (req, res) => {
//     try {
//         const getId = Number(req.params.id);

//         if (Number.isNaN(getId)) {
//             return res.status(400).json({
//                 error: "Invalid employee ID"
//             });
//         }

//         const employee = await Employee.findOne({
//             id: getId
//         });

//         if (employee === null) {
//             return res.status(404).json({
//                 error: "Employee not found"
//             });
//         }

//         res.status(200).json(employee);
//     } catch (error) {
//         res.status(500).json({
//             error: "Database error"
//         });
//     }
// });

// // Create Employee
// app.post("/employees", async (req, res) => {
//     try {
//         const {
//             name,
//             department,
//             salary
//         } = req.body;

//         // Validation
//         if (
//             typeof name !== "string" ||
//             name.trim() === ""
//         ) {
//             return res.status(400).json({
//                 error: "Invalid name"
//             });
//         }

//         if (
//             typeof department !== "string" ||
//             department.trim() === ""
//         ) {
//             return res.status(400).json({
//                 error: "Invalid department"
//             });
//         }

//         if (
//             typeof salary !== "number" ||
//             Number.isNaN(salary)
//         ) {
//             return res.status(400).json({
//                 error: "Invalid salary"
//             });
//         }

//         // Generate next custom ID
//         const lastEmployee = await Employee.findOne()
//             .sort({ id: -1 });

//         const newId = lastEmployee
//             ? lastEmployee.id + 1
//             : 1;

//         // Create employee
//         const employee = new Employee({
//             id: newId,
//             name: name.trim(),
//             department: department.trim(),
//             salary
//         });

//         // Save to MongoDB
//         await employee.save();

//         res.status(201).json(employee);

//     } catch (error) {
//         res.status(500).json({
//             error: "Failed to create employee"
//         });
//     }
// });

// // UPDATE employee
// app.put("/employees/:id", async (req, res) => {
//     try {
//         const getId = Number(req.params.id);

//         if (Number.isNaN(getId)) {
//             return res.status(400).json({
//                 error: "Invalid employee ID"
//             });
//         }

//         // Don't allow ID change
//         if (req.body.id !== undefined) {
//             return res.status(400).json({
//                 error: "ID cannot be changed"
//             });
//         }

//         // Check employee exists
//         const employee = await Employee.findOne({
//             id: getId
//         });

//         if (employee === null) {
//             return res.status(404).json({
//                 error: "Employee not found"
//             });
//         }

//         // Nothing provided
//         if (
//             req.body.name === undefined &&
//             req.body.department === undefined &&
//             req.body.salary === undefined
//         ) {
//             return res.status(400).json({
//                 error: "No valid fields provided"
//             });
//         }

//         const updateData = {};

//         // Validate and prepare name
//         if (req.body.name !== undefined) {
//             if (
//                 typeof req.body.name !== "string" ||
//                 req.body.name.trim() === ""
//             ) {
//                 return res.status(400).json({
//                     error: "Invalid name"
//                 });
//             }

//             updateData.name = req.body.name.trim();
//         }

//         // Validate and prepare department
//         if (req.body.department !== undefined) {
//             if (
//                 typeof req.body.department !== "string" ||
//                 req.body.department.trim() === ""
//             ) {
//                 return res.status(400).json({
//                     error: "Invalid department"
//                 });
//             }

//             updateData.department = req.body.department.trim();
//         }

//         // Validate and prepare salary
//         if (req.body.salary !== undefined) {
//             if (req.body.salary === "") {
//                 return res.status(400).json({
//                     error: "Salary cannot be empty"
//                 });
//             }

//             if (
//                 typeof req.body.salary !== "number" ||
//                 Number.isNaN(req.body.salary)
//             ) {
//                 return res.status(400).json({
//                     error: "Invalid salary"
//                 });
//             }

//             updateData.salary = req.body.salary;
//         }

//         // Update MongoDB
//         const updatedEmployee =
//             await Employee.findOneAndUpdate(
//                 { id: getId },
//                 updateData,
//                 { new: true }
//             );

//         res.status(200).json(updatedEmployee);

//     } catch (error) {
//         res.status(500).json({
//             error: "Failed to update employee"
//         });
//     }
// });
// // DELETE employee____________
// app.delete("/employees/:id", async (req, res) => {
//     try {
//         const getId = Number(req.params.id);

//         if (Number.isNaN(getId)) {
//             return res.status(400).json({
//                 error: "Invalid employee ID"
//             });
//         }

//         const deletedEmployee =
//             await Employee.findOneAndDelete({
//                 id: getId
//             });

//         if (deletedEmployee === null) {
//             return res.status(404).json({
//                 error: "Employee not found"
//             });
//         }

//         res.status(200).json({
//             message: "Employee successfully deleted",
//             employee: deletedEmployee
//         });

//     } catch (error) {
//         res.status(500).json({
//             error: "Failed to delete employee"
//         });
//     }
// });
