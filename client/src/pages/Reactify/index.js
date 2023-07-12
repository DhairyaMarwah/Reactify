import React, { useState } from "react";
import { SubmitForm } from "../../services/submitForm";
import AddIcon from "../../assets/add.svg";
import NextIcon from "../../assets/next.svg";
import BackIcon from "../../assets/back.svg";
import Lottie from "lottie-react";
import * as animationData from "../../assets/animation/animation.json";
export default function Index() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const [currentSection, setCurrentSection] = useState(0);
    const [downloadUrl, setDownloadUrl] = useState("");
    const [environment, setEnvironment] = useState("");
    const [buildTool, setBuildTool] = useState("");
    const [projectName, setProjectName] = useState("");
    const [packages, setPackages] = useState([]);
    const [pages, setPages] = useState([{ name: "" }]);
    const [components, setComponents] = useState([{ name: "", usedIn: "" }]);
    const [isCreatingApp, setIsCreatingApp] = useState(false);

    const sections = [
        {
            label: "Choose Environment",
            value: environment,
            setValue: setEnvironment,
            inputType: "select",
            options: [
                { value: "", label: "Select Environment" },
                { value: "create-react-app", label: "create-react-app" },
            ],
        },
        {
            label: "Build Tool",
            value: buildTool,
            setValue: setBuildTool,
            inputType: "select",
            options: [
                { value: "", label: "Select Build Tool" },
                { value: "yarn", label: "yarn" },
                { value: "npx", label: "npx" },
            ],
        },
        {
            label: "Whats will be the name of your React App",
            value: projectName,
            setValue: setProjectName,
            placeholder: "Project Name",
            inputType: "text",
        },
        {
            label: "Packages {comma-separated}",
            value: packages.join(","),
            setValue: (value) => setPackages(value.split(",")),
            inputType: "text",
        },
        {
            label: "Pages",
            value: pages,
            placeholder: "Page Name",
            setValue: setPages,
            inputType: "array",
            inputKey: "name",
        },
        {
            label: "Components",
            value: components,
            placeholder: "Component Name",
            setValue: setComponents,
            inputType: "array",
            inputKey: "name",
            additionalFields: [
                {
                    label: "Used In",
                    valueKey: "usedIn",
                    options: pages.map((page) => ({
                        value: page.name,
                        label: page.name,
                    })),
                },
            ],
        },
    ];

    const handleNext = () => {
        setCurrentSection(currentSection + 1);
    };

    const handleBack = () => {
        setCurrentSection(currentSection - 1);
    };

    const handleAddItem = (sectionIndex) => {
        const updatedSection = sections[sectionIndex];
        const newItem = { [updatedSection.inputKey]: "" };
        updatedSection.setValue([...updatedSection.value, newItem]);
    };

    const handleInputChange = (sectionIndex, itemIndex, e) => {
        const updatedSection = sections[sectionIndex];
        const updatedValue = [...updatedSection.value];
        updatedValue[itemIndex][updatedSection.inputKey] = e.target.value;
        updatedSection.setValue(updatedValue);
    };

    const handleAdditionalFieldChange = (sectionIndex, itemIndex, field, e) => {
        const updatedSection = sections[sectionIndex];
        const updatedValue = [...updatedSection.value];
        updatedValue[itemIndex][field] = e.target.value;
        updatedSection.setValue(updatedValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsCreatingApp(true);
        const payload = {
            environment,
            buildTool,
            projectName,
            packages,
            pages,
            components,
        };
        const res = await SubmitForm(payload);
        setDownloadUrl(res.downloadUrl);
        console.log(res);
        setIsCreatingApp(false);
    };

    const section = sections[currentSection];

    return (
        <>
            {isCreatingApp ? (
                <>
                    <div className="lottie-container">
                        <h1>Your React App is getting created ...</h1>
                        <Lottie animationData={animationData} />
                    </div>
                </>
            ) : (
                <>
                    <form onSubmit={handleSubmit}>
                        <p>{section.label}:</p>
                        {section.inputType === "select" ? (
                            <select
                                value={section.value}
                                onChange={(e) =>
                                    section.setValue(e.target.value)
                                }
                                required
                            >
                                {section.options.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : section.inputType === "text" ? (
                            <input
                                type="text"
                                value={section.value}
                                placeholder={section.placeholder}
                                onChange={(e) =>
                                    section.setValue(e.target.value)
                                }
                                required
                            />
                        ) : section.inputType === "array" ? (
                            <div className="container-field">
                                {section.value.map((item, index) => (
                                    <div
                                        className="container-field"
                                        key={index}
                                    >
                                        <input
                                            type="text"
                                            value={item[section.inputKey]}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    currentSection,
                                                    index,
                                                    e
                                                )
                                            }
                                            required
                                            placeholder={section.inputKey}
                                        />
                                        {section.additionalFields &&
                                            section.additionalFields.map(
                                                (field) => (
                                                    <select
                                                        key={field.label}
                                                        value={
                                                            item[field.valueKey]
                                                        }
                                                        onChange={(e) =>
                                                            handleAdditionalFieldChange(
                                                                currentSection,
                                                                index,
                                                                field.valueKey,
                                                                e
                                                            )
                                                        }
                                                        required
                                                    >
                                                        <option value="">
                                                            Select {field.label}
                                                        </option>
                                                        {field.options.map(
                                                            (option) => (
                                                                <option
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.value
                                                                    }
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                )
                                            )}
                                    </div>
                                ))}

                                {/* <button
                                    type="button"
                                    onClick={() =>
                                        handleAddItem(currentSection)
                                    }
                                >
                                    Add {section.label}
                                </button> */}
                                <div
                                    className="addicon"
                                    onClick={() =>
                                        handleAddItem(currentSection)
                                    }
                                >
                                    <img src={AddIcon} alt="" />
                                </div>
                            </div>
                        ) : null}

                        <div className="step-btns">
                            {currentSection < sections.length - 1 && (
                                <button type="button" onClick={handleNext}>
                                    Submit and Continue{" "}
                                    <img src={NextIcon} alt="" />
                                </button>
                            )}
                            {currentSection > 0 && (
                                <button
                                    className="secondary"
                                    type="button"
                                    onClick={()=>{
                                        handleBack()
                                        setDownloadUrl("")
                                    }}
                                >
                                    <img src={BackIcon} alt="" /> Go back and
                                    edit
                                </button>
                            )}
                        </div>

                        {currentSection === sections.length - 1 && (
                            <div>
                                 
                                {!downloadUrl!="" ? (
                                    <>
                                        <div className="step-btns">
                                            <button type="submit">
                                                Create App
                                                <img src={NextIcon} alt="" />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <a
                                            href={`http://localhost:3001${downloadUrl}`}
                                            download="reactify.zip"
                                        >
                                            <div className="step-btns">
                                                <button type="button">
                                                    Download
                                                </button>
                                            </div>
                                        </a>
                                    </>
                                )}
                            </div>
                        )}
                    </form>
                </>
            )}
        </>
    );
}
