const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello from express!");
});

app.listen(port, () => {
  console.log(`[server] running in http://localhost:${port}`);
});
