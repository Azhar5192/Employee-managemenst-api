const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/database");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoute")
const loginRoute = require("./routes/LoginRoute")
const logger = require("./middleware/logger");

dotenv.config();

const app = express();

app.use(express.json());
app.use(logger);

connectDB();

app.use(employeeRoutes);
app.use(authRoutes)
app.use(loginRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});