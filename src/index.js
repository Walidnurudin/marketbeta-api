const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();

// ROUTER
const userRouter = require("./modules/user/userRoutes");
const productRouter = require("./modules/product/productRoutes");

const port = process.env.PORT;
const app = express();

mongoose.connect(
  `${process.env.DB_HOST}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log(`connect to DB...`);
  }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello from express!");
});
app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(port, () => {
  console.log(`[server] running in http://localhost:${port}`);
});
