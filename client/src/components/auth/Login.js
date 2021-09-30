import React from 'react'
import './Login.css';

const Login = () => {
    return (
        <div className="login-form-bgc">
            <div>
                <img src="/images/additional-img/iphone.png" alt='iPhone' className="iphone"></img>
                <img src="/images/additional-img/phone-frame1.png" alt="iPhone" className="iphone-frame"></img>
                <img src="/images/additional-img/page-mobile-design0.png" alt="page-design" className="iphone-frame-content"></img>
            </div>

        <form className="login-form">
            <h2>Login</h2>
            <label>Login: <input type="text" placeholder="login"></input></label>
            <label>Password: <input type="password" placeholder="password"></input></label>
            <label>e-mail: <input type="email" placeholder="e-mail"></input></label>
            <button>Log in</button>
        </form>
        </div>
    )
}

export default Login
