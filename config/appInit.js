require("dotenv").config();
require("./dbInit");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const postRoutes = require("../routes/post");
app.use("/posts", postRoutes);

// error handler
// 錯誤處理的 middleware 相較一般 middleware 會多一個 err 引數
app.use(function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
