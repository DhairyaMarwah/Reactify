import React from "react";
import ReactifyGrad from "../assets/reactifygrad.svg";
import Logo from "../assets/devfy.svg";

const ReactifyHeader = () => {
  return (
    <div className="reactify-header | max-container">
      <div className="reactify-header-item">
        <div className="reactify-header-flex | header-item-1">
          App Created using <img src={ReactifyGrad} alt="" />
        </div>
      </div>
      <div className="reactify-header-item">
        <div className="reactify-header-flex | header-item-2">
          By <img src={Logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ReactifyHeader;
