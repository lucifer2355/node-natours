const express = require("express");
const morgan = require("morgan");

const toursRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//! MIDDLEWARES
app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello Middleware 👋🏻");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//!ROUTES

app.use("/api/tours", toursRouter);
app.use("/api/users", userRouter);

//! START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
