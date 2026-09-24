
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user")
// create function for login
const login = async (req, res) => {
    try {
        // get the email and password from req.body
        const { email, password } = req.body;

        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(401).json({
                error: "User doesn't exist"
            });
        }

        const passComparation = await bcrypt.compare(password, findUser.password)

        if (!passComparation) {
            return res.status(401).json({
                error: "Wrong password please try again"
            });
        }
        const token = JWT.sign(
            {
                id: findUser._id,
                email: findUser.email,
                role: findUser.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"

            }
        )
        return res.status(200).json({
            message: "Login successful!",
            // token: token
        });



    } catch (error) {
        res.status(500).json({
            error: "Enter credentials to login"
        });
    }
}

module.exports = login
