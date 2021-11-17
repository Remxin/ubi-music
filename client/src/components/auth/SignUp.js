import React from 'react'
import "./Login.css"
import { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from "../../UserContext"

const SignUp = () => {
    const { user, setUser } = useContext(UserContext);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const nameRef = useRef()
    const passwordRef = useRef()
    const emailRef = useRef()



    useEffect(() => {
        let i = 0
        const changePhoneContent = () => {
            setInterval(() => {
                if (i > 2) {
                    i = 0
                }
                let image = `/images/additional-img/page-mobile-design${i}.png`;
                document.querySelector(".iphone-frame-content").src = image;
                i++;
            }, 4000)
        }
        changePhoneContent()
    }, [])


    const submitHandler = async (e) => {
        // if (!!!nameRef.current && !!!passwordRef.current && !!!email.current) {
        e.preventDefault();
        //---- setting errors ----
        setEmailError("");
        setNameError("");
        setPasswordError("");
        // console.log("jak")
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_IP}/signup`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ "name": nameRef.current.value, "password": passwordRef.current.value, "email": emailRef.current.value }),
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json();
            console.log(data)
            if (data.user) {
                setUser(data.user)
            }

            if (data.errors) {
                await setEmailError(data.errors.email)
                await setNameError(data.errors.name)
                await setPasswordError(data.errors.password)

                console.log(nameError, passwordError, emailError)
            }
            console.log("działa?")
        } catch (error) {
            // console.log(error)

        }

    }


    return (
        <div>
            <div className="login-form-bgc">
                <div>
                    <img src="/images/additional-img/iphone.png" alt='iPhone' className="iphone"></img>
                    <img src="/images/additional-img/phone-frame1.png" alt="iPhone" className="iphone-frame"></img>
                    <img src="/images/additional-img/page-mobile-design0.png" alt="page-design" className="iphone-frame-content"></img>
                </div>

                <form className="login-form" onSubmit={submitHandler}>
                    <h2>Sign-up</h2>
                    <label>Login: <input type="text" placeholder="login" ref={nameRef}></input></label>
                    <div className="login-error sig-error">{nameError}</div>
                    <label>Password: <input type="password" placeholder="password" ref={passwordRef}></input></label>
                    <div className="password-error sig-error">{passwordError}</div>
                    <label>e-mail: <input type="email" placeholder="e-mail" ref={emailRef}></input></label>
                    <div className="email-error sig-error">{emailError}</div>
                    <button>Sign up</button>
                    <p className="link"><a href="/login">Already have an account?</a></p>
                </form>
            </div>
        </div>
    )
}

export default SignUp
