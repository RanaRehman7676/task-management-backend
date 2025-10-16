// importing Modules
const express = require("express");
const http = require("http");
const cors = require("cors");
const ENV = require("./src/Helper/ENV/environment");
const restApis = require("./src/routes");
const PORT = ENV.PORT;

// App Configuration
const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync Database
require("./src/dbConfig/mdbConnection");

// API Routes
app.use("/api/", restApis);

// api status route
app.get("/status", (req, res) => {
  res.status(200).json({
    status: "Healthy",
    API: "Task-APIs",
    version: 1.0,
    developer: "Abdul Rehman",
  });
});

server.listen(PORT, () =>
  console.log(`Server Is running on ${ENV.BASE_URL}`))