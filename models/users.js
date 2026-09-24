const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: String,
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: String
});
// User --> save as database name in mongodb atlas
const User = mongoose.model("User", userSchema);

module.exports = User;