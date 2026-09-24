const bcrypt = require("bcryptjs");
const User = require("../models/users")
// REGISTRATION
const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName) {
            return res.status(400).json({ error: "Name is Required" })
        }
        if (!email) {
            return res.status(400).json({ error: "Email is Required" })
        }
        if (!password) {
            return res.status(400).json({ error: "you must have a password" })
        }

        // check existing email
        const existingUser = await User.findOne({ email });

        // user exist with same email address
        if (existingUser !== null)
            return res.status(409).json({
                error: "Email already registered"
            });

        // the 10 is salt rounds / cost factor
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            userName,
            email,
            password: hashedPassword,
            role: "User"
        });
        await user.save()
        res.status(201).json({ message: "User registration successfully!" });

    } catch (error) {
        res.status(500).json({
            error: "internal server error",
            details: error.message
        })
    }

};
module.exports = {
    register,
}