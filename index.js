const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const cors = require('cors')

mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}, () => {
  console.log('connected to databse')
});

const corsOptions = {
  exposedHeaders: ["todo-auth"]
}
app.use(cors(corsOptions));
app.use('/uploader', express.static('uploader'))

app.use(bodyParser.json());

app.use("/api/v1", routes);

app.listen(3000);