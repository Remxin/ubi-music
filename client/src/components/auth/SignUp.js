import React from 'react'
import "./Login.css"
import { useState, useContext, useRef } from 'react';
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


    let i = 0;
    const changePhoneContent = () => {
        const interval = setInterval(() => {
            if (i > 2) {
                i = 0
            }
            let image = `/images/additional-img/page-mobile-design${i}.png`;
            document.querySelector(".iphone-frame-content").src = image;
            i++;
        }, 4000)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        //setting errors
        setEmailError("");
        setNameError("");
        setPasswordError("");

        console.log(nameRef.current.value, passwordRef.current.value, emailRef.current.value)

        try {
            const res = fetch('http:localhost:5000/signup', {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ "name": nameRef.current.value, "password": passwordRef.current.value, "email": emailRef.current.value }),
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }


    }

    changePhoneContent()
    return (
        <div>
            <div className="login-form-bgc">
                <div>
                    <img src="/images/additional-img/iphone.png" alt='iPhone' className="iphone"></img>
                    <img src="/images/additional-img/phone-frame1.png" alt="iPhone" className="iphone-frame"></img>
                    <img src="/images/additional-img/page-mobile-design0.png" alt="page-design" className="iphone-frame-content"></img>
                </div>

                <form className="login-form" onSubmit={submitHandler()}>
                    <h2>Sign-up</h2>
                    <label>Login: <input type="text" placeholder="login" ref={nameRef}></input></label>
                    <label>Password: <input type="password" placeholder="password" ref={passwordRef}></input></label>
                    <label>e-mail: <input type="email" placeholder="e-mail" ref={emailRef}></input></label>
                    <button>Sign up</button>
                    <p className="link"><a href="/login">Already have an account?</a></p>
                </form>
            </div>
        </div>
    )
}

export default SignUp
