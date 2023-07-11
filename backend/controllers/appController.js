const fs = require("fs");
const archiver = require("archiver");
const { spawn } = require("child_process");
const path = require("path");

// Function to handle form submission and generate React app
exports.generateReactApp = (req, res) => {
    // Extract form data from request body
    const { environment, buildTool, projectName, packages, pages, components } =
        req.body;

    // Generate React app based on the form data
    // You can modify this logic as per your requirements
    // Use the child_process.spawn method to run shell commands

    // Create a new directory for the React app
    const appDirectory = path.join(__dirname, `../temp/${projectName}`);
    fs.mkdirSync(appDirectory);

    // Change to the app directory
    process.chdir(appDirectory);

    // Run the create-react-app command
    const createReactAppProcess = spawn(buildTool, ["create-react-app", "."]);

    // Listen for stdout and stderr events
    createReactAppProcess.stdout.on("data", (data) => {
        console.log(data.toString());
    });

    createReactAppProcess.stderr.on("data", (data) => {
        console.error(data.toString());
    });

    // Handle the close event
    createReactAppProcess.on("close", (code) => {
        if (code === 0) {
            // App creation successful, remove node_modules folder
            fs.rmSync(path.join(appDirectory, "node_modules"), {
                recursive: true,
                force: true,
            });
            // App creation successful, continue with generating additional files

            // Example: Create a components directory and files
            fs.mkdirSync("./src/components");
            components.forEach((component) => {
                const { name, usedIn, componentName } = component;
                fs.writeFileSync(
                    `./src/components/${name}.js`,
                    `import React from 'react';

const ${name} = () => {
  return (
    <div>
      <h1>${name}</h1> 
    </div>
  );
};

export default ${componentName};`
                );
            });

            // Example: Create a pages directory and files
            fs.mkdirSync("./src/pages");
            pages.forEach((page) => {
                const { name } = page;
                fs.writeFileSync(
                    `./src/pages/${name}.js`,
                    `import React from 'react';

const ${name} = () => {
  return (
    <div>
      <h1>${name} Page</h1>
    </div>
  );
};

export default ${name};`
                );
            });

            // Example: Create a routes directory and files
            fs.mkdirSync("./src/routes");
            fs.writeFileSync(
                `./src/routes/routes.js`,
                `import React, { useState, useEffect } from "react";
                import { Routes, Route } from "react-router-dom";
                // import pages name dynamically from the pages directory
                ${pages
                    .map(
                        (page) =>
                            `import ${page.name} from "../pages/${page.name}";`
                    )
                    .join("\n")}
                const routes = [
                ${pages
                    .map(
                        (page) =>
                            `{
                            path: "/${page.name.toLowerCase()}",
                            exact: true,
                            element: <${page.name} />,
                            private: false,
                        },`
                    )
                    .join("\n")}
                ];

                export default function Navigation() {
                    return (
                        <>
                            <Routes>
                                {routes.map((route, index) => (
                                <>
                                    <Route key={index} path={route.path} element={route.element} />
                                </>
                                ))}
                            </Routes>
                        </>

                    )
                }
            `
            );

            // Overwrite the App.js file
            // Overwrite the App.js file with the provided code
            fs.writeFileSync(
                `./src/App.js`,
                `import React from "react";
                import { ToastContainer } from "react-toastify";
                import "react-toastify/dist/ReactToastify.css";
                import { BrowserRouter } from "react-router-dom";
                import Navigation from "./routes/routes";
                
                function App() {
                    return (
                    <BrowserRouter>
                        <ToastContainer />
                        <Navigation />
                    </BrowserRouter>
                    );
                }
                
                export default App;`
            );

            // Zip the generated files
            const output = fs.createWriteStream(
                path.join(__dirname, "../temp/react-app.zip")
            );
            const archive = archiver("zip", {
                zlib: { level: 9 },
            });
            archive.directory(appDirectory, false);
            archive.glob("!node_modules/**"); // Exclude the node_modules folder
            archive.pipe(output);
            archive.finalize();

            // Send the zip file as a response
            output.on("close", () => {
                res.download(
                    path.join(__dirname, "../temp/react-app.zip"),
                    (err) => {
                        if (err) {
                            console.error("Error sending zip file:", err);
                        } else {
                            // Zip file sent successfully, do not delete the files
                            console.log("Zip file sent successfully");
                        }
                    }
                );
            });
        } else {
            // App creation failed
            res.status(500).json({ error: "Failed to create React app" });
        }
    });
};
