require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { usersRouter, auth } = require("./routers/users");
app.use('/users', usersRouter);

app.delete('/posts', auth, async (req, res) => {
    res.json({msg: 'posts delete'});
});

app.listen(process.env.PORT, () => {
    console.log(`X Api running at ${process.env.PORT}...`);
});
