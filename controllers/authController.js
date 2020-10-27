const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //! Check if email or password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  //! Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect email or password", 401));

  //! If everything ok, send the token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //! Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  //! Verification token
  const decode = await promisify(jwt.verify(token, process.env.JWT_SECRET));

  //! Check if user is still exists
  const freshUser = await User.findById(decode.id);
  if (!freshUser)
    return next(
      new AppError("The user beloging to this token does no longer exisr.", 401)
    );

  //! Check if user chnaged password after the token was issue
  if (freshUser.changedPasswordAfter(decode.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again", 401)
    );
  }

  //! Grant access to protect route
  req.user = freshUser;

  next();
});
