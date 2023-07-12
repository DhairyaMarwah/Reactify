import React from "react";
import Icon from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";
import Features from "../../assets/features.svg";

const Index = () => {
    const navigate = useNavigate();
    return (
        <div className="home-page">
            <div className="animated-react">
                <img src={Icon} alt="" />
            </div>
            <div className="home-page-landing">
                <h1>
                    Reactify: Powering Your <br /> React Projects
                </h1>
                <p>
                    Unlock the Full Potential of React with Reactify: The
                    Comprehensive Solution for Building Beautiful, Scalable, and
                    Interactive Web Applications
                </p>
                <div className="home-page-landing-buttons">
                    <button onClick={() => navigate("/app")}>
                        Get Started
                    </button>
                    <button className="secondary">Check the developer</button>
                </div>
            </div>

            <div className="home-page-landing | features-section">
                <h1>Features Provided</h1>
                <img src={Features} alt="" />
            </div>
        </div>
    );
};

export default Index;
