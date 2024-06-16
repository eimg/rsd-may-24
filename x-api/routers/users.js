require("dotenv").config();

const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { MongoClient, ObjectId } = require("mongodb");

const mongo = new MongoClient(process.env.MONGO);
const db = mongo.db("x");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const auth = (req, res, next) => {
	const { authorization } = req.headers;
	const token = authorization && authorization.split(" ")[1];

	if (!token) {
		return res.status(403).json({ msg: "Unauthorize access" });
	}

	jwt.verify(token, process.env.SECRET, (err, data) => {
		if (err) {
			return res.status(403).json(err);
		}

		res.locals.user = data;
		next();
	});
};

router.get("/verify", auth, (req, res) => {
	const user = res.locals.user;
	return res.json(user);
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ msg: "username and password required" });
	}

	const user = await db.collection("users").findOne({ username });
	if (user) {
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(user, process.env.SECRET);
			return res.json({ token });
		}
	}

	return res.status(401).json({ msg: "username or password incorrect" });
});

router.post("/register", async (req, res) => {
	const { name, username, bio, password } = req.body;
	if (!name || !username || !password) {
		return res
			.status(400)
			.json({ msg: "name, username and password required" });
	}

	try {
		const hash = await bcrypt.hash(password, 10);

		const result = await db
			.collection("users")
			.insertOne({ name, username, bio, password: hash });

		return res.json({ _id: result.insertedId, name, username, bio });
	} catch (e) {
		return res.status(500).json(e.message);
	}
});

module.exports = { usersRouter: router, auth };
