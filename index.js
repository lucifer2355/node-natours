const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const AppError = require("./utils/appError");
const globErrorHandler = require("./controllers/errorController");
const toursRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//! GOBAL MIDDLEWARES
//* SET Security HTTP headers
app.use(helmet());

//* Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//* Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});
app.use("/api", limiter);

//* Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

//* Serving static file
app.use(express.static(`${__dirname}/public`));

//* Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//!ROUTES
app.use("/api/tours", toursRouter);
app.use("/api/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globErrorHandler);

module.exports = app;
