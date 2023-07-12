import React from "react";
import Logo from "../assets/logo.svg";
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={Logo} alt="logo" />
            </div>
            <div className="nav-buttn">
                <button>Let's talk</button>
            </div>
        </div>
    );
};

export default Navbar;
