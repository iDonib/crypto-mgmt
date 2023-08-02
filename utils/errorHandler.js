const errorHandler = (error, req, res, next) => {
  if (error) {
    let status = error.status || 500;
    let message = error.message || "Internal Server Error";

    console.log(error);
    res.status(status).json({
      status: "failed",
      error: message,
    });
  } else {
    next();
  }
};

module.exports = errorHandler;
