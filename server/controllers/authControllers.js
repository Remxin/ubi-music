const User = require('../models/User')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config() // for using process.env variables

const jwtAge = 5 * 24 * 60 * 60
const alertErr = (err) => { // this errors will occure bcs of User model manually built function login
    let errors = { name: "", password: "", email: "" }

    if (err.message === "incorrect email") {
        errors.name = "Email not found"
    }
    if (err.message === "incorrect password") {
        errors.password = "The password is incorrect"
    }
    if (err.code === 11000) {
        errors.email = "This email is already registered"
    }
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

const createJWT = (id) => {
    console.log("im in")
    return jwt.sign({ id: id }, process.env.JTW_TOKEN, { expiresIn: jwtAge + "s" }) // jsonweb token expires in 5 days
}

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        // const token = createJWT(user._id);
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: jwtAge + "s" })
        // console.log(token)
        res.cookie('jwt', token, { httpOnly: true, maxAge: jwtAge * 1000 })
        // res.sendStatus(201).json({ user })
        res.status(201).json({ user })

    } catch (error) {
        let errors = alertErr(error);
        // res.sendStatus(400).json({ errors })
        res.status(400).json({ errors })
    }

}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password) //executing our created login function (located in User model), it'll throw err if something went wrong, so then catch will execute
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: jwtAge + "s" })
        res.cookie("jwt", token, { expiresIn: jwtAge * 1000, httpOnly: true })
        res.status(201).json({ user })
    } catch (err) {
        let errors = alertErr(err)    // alert function will set errors
        res.status(400).json({ errors })
    }
}

const verifyuser = (req, res, next) => {
    const token = req.cookies.jwt
    console.log(process.env.JWT_TOKEN)
    if (token) {
        jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => {
            if (err) {
                console.log("tutaj")
                console.log(err.message)
            } else {
                let user = await User.findById(decodedToken.id)
                res.json(user)
                next()
            }
        })
    } else {
        next()
    }
}

const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 })
    res.sendStatus(200).json({ logout: true })
}

module.exports = { login, signup, verifyuser, logout }