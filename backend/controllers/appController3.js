const fs = require("fs-extra");
const archiver = require("archiver");
const { spawn } = require("child_process");
const path = require("path");
const appContent = require("../scripts/appContent");
const createComponents = require("../scripts/createComponents");
const createPages = require("../scripts/createPages");
const createRoutes = require("../scripts/createRoutes");
const createServiceFileContent = require("../scripts/createServiceFileContent");

// Function to handle form submission and generate React app
exports.generateReactApp = async (req, res) => {
    try {
        const {
            environment,
            buildTool,
            projectName,
            packages,
            pages,
            components,
            projectType,
            useApi,
            apiBaseUrl,
            apiConnections,
        } = req.body;
        let templateDirectory;
        if (buildTool === "pnpm") {
            templateDirectory = path.join(
                __dirname,
                "../temp/templates/buildTool/basic_pnpm_template"
            );
        } else if (buildTool === "yarn") {
            templateDirectory = path.join(
                __dirname,
                "../temp/templates/buildTool/basic_yarn_template"
            );
        } else if (buildTool === "npx") {
            templateDirectory = path.join(
                __dirname,
                "../temp/templates/buildTool/basic_npm_template"
            );
        }

        const appDirectory = path.join(__dirname, `../temp/${projectName}`);
        // const appDirectory = path.join(__dirname, `../temp/${projectName}`);
        fs.mkdirSync(appDirectory);
        fs.copySync(templateDirectory, appDirectory);

        if (projectType === "basic") {
            const componentsDirectory = path.join(
                appDirectory,
                "src/components"
            );
            fs.mkdirSync(componentsDirectory, { recursive: true });

            components.forEach((component) => {
                const { name } = component;
                fs.writeFileSync(
                    path.join(componentsDirectory, `${name}.js`),
                    createComponents(name)
                );
            });

            const pagesDirectory = path.join(appDirectory, "src/pages");
            fs.mkdirSync(pagesDirectory, { recursive: true });

            pages.forEach((page) => {
                const { name } = page;
                fs.writeFileSync(
                    path.join(pagesDirectory, `${name}.js`),
                    createPages(name)
                );
            });

            const routesDirectory = path.join(appDirectory, "src/routes");
            fs.mkdirSync(routesDirectory, { recursive: true });

            fs.writeFileSync(
                path.join(routesDirectory, "routes.js"),
                createRoutes(pages)
            );

            fs.writeFileSync(
                path.join(appDirectory, "src/App.js"),
                appContent,
                {
                    flag: "w",
                }
            );

            // create a service folder and inside it name the the file by endpoint name and i'll later add the content to it
            if (useApi === "Yes") {
                // create a .env file and add the apiBaseUrl to it
                fs.writeFileSync(
                    path.join(appDirectory, ".env"),
                    `REACT_APP_API_URL=${apiBaseUrl}`,
                    {
                        flag: "w",
                    }
                );

                const servicesDirectory = path.join(
                    appDirectory,
                    "src/services"
                );
                fs.mkdirSync(servicesDirectory, { recursive: true });

                apiConnections.forEach((connection) => {
                    const { endpoint, requestType } = connection;
                    fs.writeFileSync(
                        path.join(servicesDirectory, `${endpoint}.js`),
                        createServiceFileContent(endpoint, requestType)
                    );
                });
            }
        } else {
            console.log("projectType is not basic");
        }

        const output = fs.createWriteStream(
            path.join(__dirname, "../temp/react-app.zip")
        );
        const archive = archiver("zip", {
            zlib: { level: 9 },
        });

        archive.directory(appDirectory, false);
        // archive.glob("!node_modules/**");
        archive.pipe(output);
        archive.finalize();

        output.on("close", () => {
            const downloadUrl = `/api/download?filename=react-app.zip`;
            res.json({
                status: "success",
                downloadUrl,
            });
        });
    } catch (error) {
        console.error("Error generating React app:", error);
        res.status(500).json({ error: "Failed to create React app" });
    }
};

exports.downloadFile = (req, res) => {
    const { filename } = req.query;
    const filePath = path.join(__dirname, "../temp", filename);
    res.download(filePath, (err) => {
        if (err) {
            console.error("Error sending file:", err);
        } else {
            // Clean up the temporary files/directory
            fs.rmSync(filePath);
        }
    });
};
