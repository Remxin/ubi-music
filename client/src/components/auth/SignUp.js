import React from 'react'
import "./Login.css"
import { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from "../../UserContext"
import { Redirect } from "react-router-dom"

const SignUp = () => {
    const { user, setUser } = useContext(UserContext);

    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const nameRef = useRef()
    const passwordRef = useRef()
    const emailRef = useRef()
    const iphoneFrameCRef = useRef()
    let interval


    useEffect(() => {
        const timeO = setTimeout(() => {
            let i = 0;
            const changePhoneContent = () => {
                interval = setInterval(() => {
                    if (i > 2) {
                        i = 0
                    }
                    let image = `/images/additional-img/page-mobile-design${i}.png`;
                    // document.querySelector(".iphone-frame-content").src = image;
                    if (!!iphoneFrameCRef.current?.src) {
                        iphoneFrameCRef.current.src = image
                    } else {
                        clearInterval(interval)
                    }
                    i++;
                }, 4000)
            }
            changePhoneContent()
        }, 1000)
    }, [])


    const submitHandler = async (e) => {
        e.preventDefault();
        //---- setting errors ----
        setEmailError("");
        setNameError("");
        setPasswordError("");
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
                clearInterval(interval)

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

    if (user) {
        return <Redirect to="/" />
    }
    return (
        <div>
            <div className="login-form-bgc">
                <div>
                    <img src="/images/additional-img/iphone.png" alt='iPhone' className="iphone"></img>
                    <img src="/images/additional-img/phone-frame1.png" alt="iPhone" className="iphone-frame"></img>
                    <img src="/images/additional-img/page-mobile-design0.png" alt="page-design" className="iphone-frame-content" ref={iphoneFrameCRef}></img>
                </div>

                <form className="login-form" onSubmit={submitHandler}>
                    <h2>Sign-up</h2>
                    <label>Login: <input type="text" placeholder="login" ref={nameRef}></input></label>
                    <div className="sig-error">{nameError}</div>
                    <label>Password: <input type="password" placeholder="password" ref={passwordRef}></input></label>
                    <div className="sig-error">{passwordError}</div>
                    <label>e-mail: <input type="email" placeholder="e-mail" ref={emailRef}></input></label>
                    <div className="sig-error">{emailError}</div>
                    <button>Sign up</button>
                    <p className="link"><a href="/login">Already have an account?</a></p>
                </form>
            </div>
        </div>
    )
}

export default SignUp
