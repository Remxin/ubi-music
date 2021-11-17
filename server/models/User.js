const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "The password should be at least 6 characters long"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        lowercase: true,
        unique: true,
        validate: [isEmail, "Enter a valid email address"]
    },


})


userSchema.pre('save', async function (next) {  // wykona się przed zapisaniem do bazy danych
    const salt = await bcrypt.genSalt();    // generuje dodatkowe zbędne znaki
    this.password = await bcrypt.hash(this.password, salt); // hashuje hasło z dodatkowymi znakami
    next();
})

userSchema.statics.login = async function (email, password) {   // creating own function to the schema (mongoose does not offer anyone)
    const user = await this.findOne({ email });
    if (user) {
        const isAuthenticated = await bcrypt.compare(password, user.password)
        if (isAuthenticated) {
            return user;
        } else {
            throw Error('incorrect password');
        }
    } else {
        throw Error('incorrect email');
    }
}
const User = mongoose.model("user", userSchema);
module.exports = User;