const User = require('../models/User')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config() // for using process.env variables

const alertErr = (err) => { // this errors will occure bcs of User model manually built function login
    let errors = { name: "", password: "", email: "" }

    if (err.message === "incorrect email") {
        errors.name = "Email not found"
    }
    if (err.message === "incorrect password") {
        errors.passowrd = "The password is incorrect"
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
    return jwt.sign({ id }, process.env.JTW_TOKEN, { expiresIn: 5 * 24 * 60 * 60 }) // jsonweb token expires in 5 days
}

const signup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.create({ name, email, password })
        const jtwToken = createJWT(user._id)
        res.cookie("jwt", jtwToken, { httpOnly: true, maxAge: 5 * 24 * 60 * 60 * 1000 }) // this time time is passed in milliseconds, so *1000
        res.sendStatus(201).json({ user })

    } catch (err) {
        let errors = alertErr(err)
        res.sendStatus(400).json(errors)
    }

}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password) //executing our created login function (located in User model), it'll throw err if something went wrong, so then catch will execute
        const token = createJWT(user._id)
        res.cookie("jwt", process.env.JWT_TOKEN, { expiresIn: 5 * 24 * 60 * 60 })
        res.sendStatus(201).json({ user })
    } catch (err) {
        let errors = alertErr(err)    // alert function will set errors
        res.sendStatus(400).json({ errors })
    }
}

const verifyuser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.JTW_TOKEN, async (err, decodedToken) => {
            if (err) {
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