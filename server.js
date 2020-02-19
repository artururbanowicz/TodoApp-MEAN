var express = require("express");
var cors = require("cors");
var tasks = require("./routes/Tasks");
var users = require("./routes/Users");
var bodyParser = require("body-parser");
var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/tasks", tasks);
app.use("/users", users);

app.listen(port, () => {
    console.log("SERVER PORT:" + port)
});
