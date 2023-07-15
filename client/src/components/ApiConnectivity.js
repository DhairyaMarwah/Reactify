import React from "react";
import AddIcon from "../assets/add.svg";
import Remove from "../assets/remove.svg";
const ApiConnectivity = ({
    useApi,
    setUseApi,
    apiBaseUrl,
    setApiBaseUrl,
    apiConnections,
    handleApiConnectionChange,
    handleRemoveApiConnection,
    handleAddApiConnection,
}) => {
    return (
        <div className="Api">
            <p>Does your app require API connectivity?</p>
            <select
                value={useApi}
                onChange={(e) => setUseApi(e.target.value)}
                name=""
                id=""
            >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            {useApi === "Yes" && (
                <div className="container-field | api-inputs">
                    <input
                        type="text"
                        className="small-input"
                        value={apiBaseUrl}
                        placeholder="API Base URL"
                        onChange={(e) => setApiBaseUrl(e.target.value)}
                        required
                    />
                    {apiConnections.map((connection, index) => (
                        <div className="container-field" key={index}>
                            <div className="container-field-flex">
                                <input
                                    type="text"
                                    value={connection.endpoint}
                                    placeholder="Endpoint"
                                    className="small-input"
                                    onChange={(e) =>
                                        handleApiConnectionChange(
                                            index,
                                            "endpoint",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                <select
                                    className="small-input"
                                    value={connection.requestType}
                                    onChange={(e) =>
                                        handleApiConnectionChange(
                                            index,
                                            "requestType",
                                            e.target.value
                                        )
                                    }
                                    required
                                >
                                    <option value="">
                                        Select Request Type
                                    </option>
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                    <option value="DELETE">DELETE</option>
                                </select>
                            </div>
                            <button
                                type="button"
                                className="remove-btn | secondary"
                                onClick={() => handleRemoveApiConnection(index)}
                            >
                                Remove API Connection
                                <img src={Remove} alt="" />
                            </button>
                        </div>
                    ))}
                    <button
                        className="remove-btn"
                        type="button"
                        onClick={handleAddApiConnection}
                    >
                        Add API Connection
                        <img src={AddIcon} alt="" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ApiConnectivity;
