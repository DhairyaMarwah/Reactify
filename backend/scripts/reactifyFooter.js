const reactifyFooter = `
    import React from "react";
import ArrowBlack from "../assets/arrowblack.svg";
const ReactifyFooter = () => {
    const footerContent = [
        {
          title: "DevFy.app",
          description: "DevFy is an app to create different apps quickly.",
          link: "",
        },
        {
          title: "DjangoFy",
          description: "DjangoFy is an to create Django apps quickly.",
          link: "",
        },
        {
          title: "Portfolio",
          description: "Check out portfolio of the creator of Reactify.",
          link: "",
        },
        {
          title: "Hire Me",
          description: "Need that magical touch for your project? Reach out.",
          link: "",
        },
      ];
  return (
    <div className="reactify-footer | max-container">
      {footerContent.map((content, index) => {
        return (
          <div className="reactify-footer-item" key={index}>
            <div className="reactify-footer-item-header">
              {content.title} <img src={ArrowBlack} alt="" />
            </div>
            <div className="reactify-footer-item-description">
              {content.description}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReactifyFooter;

    `;
module.exports = reactifyFooter;
