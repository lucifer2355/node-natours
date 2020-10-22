const express = require("express");
const morgan = require("morgan");

const toursRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//! MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//!ROUTES
app.use("/api/tours", toursRouter);
app.use("/api/users", userRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
