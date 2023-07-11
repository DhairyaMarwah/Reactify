const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const appRoutes = require("./routes/appRoutes");

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the appRoutes for routing
app.use("/api", appRoutes);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
