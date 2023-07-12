import React, { useState } from "react";
import { SubmitForm } from "../../services/submitForm";

export default function Index() {
    const [downloadUrl, setdownloadUrl] = useState();
    const [environment, setEnvironment] = useState("");
    const [buildTool, setBuildTool] = useState("");
    const [projectName, setProjectName] = useState("");
    const [packages, setPackages] = useState([]);
    const [pages, setPages] = useState([{ name: "" }]);
    const [components, setComponents] = useState([{ name: "", usedIn: "" }]);

    const handlePageChange = (index, value) => {
        const updatedPages = [...pages];
        updatedPages[index].name = value;
        setPages(updatedPages);
    };

    const handleComponentChange = (index, field, value) => {
        const updatedComponents = [...components];
        updatedComponents[index][field] = value;
        setComponents(updatedComponents);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            environment,
            buildTool,
            projectName,
            packages,
            pages,
            components,
        };
        const res = await SubmitForm(payload);
        setdownloadUrl(res.downloadUrl);
        console.log(res);
        // Reset form fields
        setEnvironment("");
        setBuildTool("");
        setProjectName("");
        setPackages([]);
        setPages([{ name: "" }]);
        setComponents([{ name: "", usedIn: "" }]);
    };
    const handleDownload = () => {
        window.location.href = downloadUrl;
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Environment:
                <select
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value)}
                    required
                >
                    <option value="">Select Environment</option>
                    <option value="create-react-app">create-react-app</option>
                </select>
            </label>
            <br />
            <label>
                Build Tool:
                <select
                    value={buildTool}
                    onChange={(e) => setBuildTool(e.target.value)}
                    required
                >
                    <option value="">Select Build Tool</option>
                    <option value="yarn">yarn</option>
                    <option value="npx">npx</option>
                </select>
            </label>
            <br />
            <label>
                Project Name:
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Packages (comma-separated):
                <input
                    type="text"
                    value={packages}
                    onChange={(e) => setPackages(e.target.value.split(","))}
                    required
                />
            </label>
            <br />
            <label>
                Pages:
                {pages.map((page, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={page.name}
                            onChange={(e) =>
                                handlePageChange(index, e.target.value)
                            }
                            required
                            placeholder="Page Name"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => setPages([...pages, { name: "" }])}
                >
                    Add Page
                </button>
            </label>
            <br />
            <label>
                Components:
                {components.map((component, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={component.name}
                            onChange={(e) =>
                                handleComponentChange(
                                    index,
                                    "name",
                                    e.target.value
                                )
                            }
                            required
                            placeholder="Component Name"
                        />
                        <select
                            value={component.usedIn}
                            onChange={(e) =>
                                handleComponentChange(
                                    index,
                                    "usedIn",
                                    e.target.value
                                )
                            }
                            required
                        >
                            <option value="">Select Used In</option>
                            {pages.map((page, pageIndex) => (
                                <option key={pageIndex} value={page.name}>
                                    {page.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() =>
                        setComponents([...components, { name: "", usedIn: "" }])
                    }
                >
                    Add Component
                </button>
            </label>
            <br />
            <button type="submit">Create App</button>
            <a href={`http://localhost:3001${downloadUrl}`} download="reactify.zip">

            <button  type="button"  >
                Download
            </button>
            </a>
        </form>
    );
}
