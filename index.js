const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

//Main request
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Employee Database." });
});
//Will route to employee.routes whenever request is made
require("./routes/employee.routes.js")(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});