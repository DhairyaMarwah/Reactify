const fs = require("fs");
const archiver = require("archiver");
const { spawn } = require("child_process");
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

    const appDirectory = path.join(__dirname, `../temp/${projectName}`);
    fs.mkdirSync(appDirectory);
    process.chdir(appDirectory);

    const createReactAppProcess = spawn(buildTool, ["create-react-app", "."]);

    createReactAppProcess.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    createReactAppProcess.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    await new Promise((resolve, reject) => {
      createReactAppProcess.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error("Failed to create React app"));
        }
      });
    });

    fs.rmSync(path.join(appDirectory, "node_modules"), {
      recursive: true,
      force: true,
    });

    fs.mkdirSync("./src/components");
    components.forEach((component) => {
      const { name } = component;
      fs.writeFileSync(
        `./src/components/${name}.js`,
        createComponents(name)
      );
    });

    fs.mkdirSync("./src/pages");
    pages.forEach((page) => {
      const { name } = page;
      fs.writeFileSync(`./src/pages/${name}.js`, createPages(name));
    });

    fs.mkdirSync("./src/routes");
    fs.writeFileSync(`./src/routes/routes.js`, createRoutes(pages));

    fs.writeFileSync(`./src/App.js`, appContent);

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