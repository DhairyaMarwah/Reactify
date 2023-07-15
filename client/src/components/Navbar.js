import React from "react";
import Logo from "../assets/logo.svg";
import DevFy from "../assets/devfy.svg";
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={Logo} alt="logo" />
            </div>
            <div className="nav-buttn">
                <p>Powered by</p>
                <img src={DevFy} alt="" />
            </div>
        </div>
    );
};

export default Navbar;
