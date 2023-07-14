const fs = require("fs-extra");
const archiver = require("archiver");
const { spawnSync } = require("child_process");
const path = require("path");
const appContent = require("../scripts/appContent");
const createComponents = require("../scripts/createComponents");
const createPages = require("../scripts/createPages");
const createRoutes = require("../scripts/createRoutes");

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
        } = req.body;

        const templateDirectory = path.join(__dirname, "../temp/template1");
        const appDirectory = path.join(__dirname, `../temp/${projectName}`);
        if (fs.existsSync(appDirectory)) {
            fs.removeSync(appDirectory);
        }
        fs.mkdirSync(appDirectory);

        // Copy the template project to the new app directory
        fs.copySync(templateDirectory, appDirectory);

        // Update package.json with the new project name
        const packageJsonPath = path.join(appDirectory, "package.json");
        const packageJson = require(packageJsonPath);
        packageJson.name = projectName;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        // Install dependencies
        const installPackagesCommand = spawnSync(buildTool, ["install"], {
            cwd: appDirectory,
            stdio: "inherit",
        });

        // Generate components
        fs.mkdirSync(path.join(appDirectory, "src/components"));
        components.forEach((component) => {
            const { name } = component;
            fs.writeFileSync(
                path.join(appDirectory, `src/components/${name}.js`),
                createComponents(name)
            );
        });

        // Generate pages
        fs.mkdirSync(path.join(appDirectory, "src/pages"));
        pages.forEach((page) => {
            const { name } = page;
            fs.writeFileSync(
                path.join(appDirectory, `src/pages/${name}.js`),
                createPages(name)
            );
        });

        // Generate routes
        fs.mkdirSync(path.join(appDirectory, "src/routes"));
        fs.writeFileSync(
            path.join(appDirectory, "src/routes/routes.js"),
            createRoutes(pages)
        );

        // Update App.js with the desired content
        fs.writeFileSync(path.join(appDirectory, "src/App.js"), appContent);

        const output = fs.createWriteStream(
            path.join(__dirname, "../temp/react-app.zip")
        );
        const archive = archiver("zip", {
            zlib: { level: 9 },
        });

        archive.directory(appDirectory, false);
        archive.glob("!node_modules/**");
        archive.pipe(output);
        archive.finalize();

        output.on("close", () => {
            const downloadUrl = `/api/download?filename=react-app.zip`;
            res.json({ downloadUrl });
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
