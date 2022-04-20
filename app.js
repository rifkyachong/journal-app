// pre-process (all imports)
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./database/connect");
const authRouter = require("./router/auth");
const journalsRouter = require("./router/journals");
const errorHandler = require("./middleware/error-handler");
const authentication = require("./middleware/authentication");

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const expressRateLimiter = require("express-rate-limit");

// server metadata
const app = express();
const port = process.env.PORT || 8081;

// middleware
app.use(express.static("public"));
app.use(express.json());

// security middleware
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(
  expressRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// routes
app.use("/auth", authRouter);
app.use("/journals", authentication, journalsRouter);
app.use("*", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

// error handler & not found
// app.use(notFound);
app.use(errorHandler);

// start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to database...");
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
