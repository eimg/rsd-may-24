require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { usersRouter } = require("./routers/users");
app.use('/users', usersRouter);

const { postsRouter } = require("./routers/posts");
app.use("/posts", postsRouter);

app.use("/images", express.static(process.env.IMAGES_PATH));

app.listen(process.env.PORT, () => {
    console.log(`X Api running at ${process.env.PORT}...`);
});
