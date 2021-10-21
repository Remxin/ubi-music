import React from 'react'
import './Login.css';

const Login = () => {
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

    changePhoneContent()
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
                <button>Log in</button>
                <p className="link"><a href="/signup">Do not have an account?</a></p>
            </form>
        </div>
    )
}

export default Login
