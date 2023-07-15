import React from "react";
import Basic from "../assets/basic.png";
import Advance from "../assets/advance.png";
const AppTypeSelection = ({ setProjectType }) => {
    return (
        <div className="typeOf-App">
            <div onClick={() => setProjectType("basic")}>
                <img src={Basic} alt="" />
                <p>Basic Setup</p>
            </div>
            <div onClick={() => setProjectType("advance")}>
                <img src={Advance} alt="" />
                <p>Advance Setup</p>
            </div>
        </div>
    );
};

export default AppTypeSelection;
