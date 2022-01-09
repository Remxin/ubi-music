import React, { useContext } from 'react'
import './Navbar.css';
import $ from 'jquery';
import { UserContext } from '../../UserContext';


const Navbar = () => {
    let isHamburgerOpened = false;
    const { user, setUser } = useContext(UserContext)

    const logout = async () => {
        console.log("logout")
        const req = await fetch(`${process.env.REACT_APP_SERVER_IP}/logout`, {
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        })
        setUser(null)
    }
    const animateHamburgerMenu = () => {
        if (!isHamburgerOpened) {
            $('.hamburger1').addClass('hamburger-animation1');
            $('.hamburger2').addClass('hamburger-animation2');
            $('.hamburger3').addClass('hamburger-animation3');
            $('.mobile-menu ul').slideDown()
            isHamburgerOpened = true;
        } else {
            $('.hamburger1').removeClass('hamburger-animation1');
            $('.hamburger2').removeClass('hamburger-animation2');
            $('.hamburger3').removeClass('hamburger-animation3');
            $('.mobile-menu ul').slideUp();
            isHamburgerOpened = false;
        }
    }
    return (
        <>
            <nav>
                <a href="/"><img src="/images/logo/logo.bmp"></img></a>
                <ul className="menu">
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signup">Signup</a></li>
                    <li><a href="#" onClick={logout}>Logout</a></li>
                </ul>
                <div className="mobile-menu">
                    <div className="hamburger-ico" onClick={() => animateHamburgerMenu()}>
                        <div className="hamburger1"></div>
                        <div className="hamburger2"></div>
                        <div className="hamburger3"></div>
                    </div>
                    <ul className="mobile-links">
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">Signup</a></li>
                        <li><a href="#" onClick={logout}>Logout</a></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
