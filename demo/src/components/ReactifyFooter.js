import React from "react";
import ArrowBlack from "../assets/arrowblack.svg";
const ReactifyFooter = () => {
  const footerContent = [
    {
      title: "DjangoFy",
      description: "DjangoFy is an to create Django apps quickly.",
      link: "",
    },
    {
      title: "DjangoFy",
      description: "DjangoFy is an to create Django apps quickly.",
      link: "",
    },
    {
      title: "DjangoFy",
      description: "DjangoFy is an to create Django apps quickly.",
      link: "",
    },
    {
      title: "DjangoFy",
      description: "DjangoFy is an to create Django apps quickly.",
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
