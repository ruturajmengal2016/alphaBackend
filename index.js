const express = require("express");
const cors = require("cors");
const router = require("./router/router");
const errorHandler = require("./middleware/errorHandler");
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "OPTIONS", "DELETE"],
    Credentials: true,
  })
);
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);
app.listen(5000, (error) => {
  if (error) {
    console.error(error);
  }
  console.log("server running");
});
