const express = require("express");
const app = express();
const cors = require("cors");

const user = require("./router/user");
const driver = require("./router/driver");
const request = require("./router/request");
const record = require("./router/record");

// const sequelize = require("./config/database");
const fileUpload = require("express-fileupload");

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch(err => {
//     console.error("Unable to connect to the database:", err);
//   });

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(fileUpload());

app.use("/api/users", user);
app.use("/api/drivers", driver);
app.use("/api/requests", request);
app.use("/api/records", record);

app.listen(8000, () => console.log("Server running at port 8000"));
