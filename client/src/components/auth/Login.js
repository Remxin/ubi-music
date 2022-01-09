import React, { useEffect, useContext, useState, useRef } from 'react'
import './Login.css';
import { UserContext } from '../../UserContext';
import { Redirect } from "react-router-dom"

const Login = () => {
    const { user, setUser } = useContext(UserContext)
    // console.log(user, setUser)
    const [passwordError, setPasswordError] = useState("")

    const emailRef = useRef()
    const passwordRef = useRef()
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

    const loginUser = async (e) => {
        e.preventDefault();
        //---- setting error ----
        setPasswordError("");
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_IP}/login`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ "password": passwordRef.current.value, "email": emailRef.current.value }),
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json();
            console.log(data)
            if (data.user) {
                setUser(data.user)
                console.log(interval)
                clearInterval(interval)
            }

            if (data.errors) {
                console.log(data.errors.password)
                setPasswordError(data.errors.password)
            }
            console.log("działa?")
        } catch (error) {
            console.log(error)
        }
    }

    if (user) {
        console.log("user")
        return <Redirect to="/" />
    }
    return (
        <div className="login-form-bgc">
            <div>
                <img src="/images/additional-img/iphone.png" alt='iPhone' className="iphone"></img>
                <img src="/images/additional-img/phone-frame1.png" alt="iPhone" className="iphone-frame"></img>
                <img src="/images/additional-img/page-mobile-design0.png" alt="page-design" className="iphone-frame-content" ref={iphoneFrameCRef}></img>
            </div>

            <form className="login-form" onSubmit={loginUser}>
                <h2>Login</h2>
                <label>Email: <input type="text" placeholder="login" ref={emailRef}></input></label>
                <label>Password: <input type="password" placeholder="password" ref={passwordRef}></input></label>
                <div className="sig-error">{passwordError}</div>
                <button>Log in</button>
                <p className="link"><a href="/signup">Do not have an account?</a></p>
            </form>
        </div>
    )
}

export default Login
