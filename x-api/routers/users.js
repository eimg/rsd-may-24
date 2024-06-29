require("dotenv").config();

const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { MongoClient, ObjectId } = require("mongodb");

const mongo = new MongoClient(process.env.MONGO);
const db = mongo.db("x");

const multer = require("multer");
const upload = multer({ dest: process.env.IMAGES_PATH });

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

router.get("/followers/:id", async function (req, res) {
	const { id } = req.params;

	const user = await db.collection("users")
		.aggregate([
			{
				$match: { _id: new ObjectId(id) },
			},
			{
				$lookup: {
					localField: "followers",
					from: "users",
					foreignField: "_id",
					as: "followers",
				},
			},
		])
		.toArray();

	res.json(user[0]);
});

router.get("/following/:id", async function (req, res) {
	const { id } = req.params;

	const user = await db.collection("users")
		.aggregate([
			{
				$match: { _id: new ObjectId(id) },
			},
			{
				$lookup: {
					localField: "following",
					from: "users",
					foreignField: "_id",
					as: "following",
				},
			},
		])
		.toArray();

	res.json(user[0]);
});

router.get("/:id", async function (req, res) {
	const { id } = req.params;

	try {
		const user = await db.collection("users").findOne({
            _id: new ObjectId(id),
        });

		user.followers = user.followers || [];
		user.following = user.following || [];

		const data = await db
			.collection("posts")
			.aggregate([
				{
					$match: { owner: user._id },
				},
				{
					$lookup: {
						localField: "owner",
						from: "users",
						foreignField: "_id",
						as: "owner",
					},
				},
				{
					$lookup: {
						localField: "_id",
						from: "posts",
						foreignField: "origin",
						as: "comments",
					},
				},
				{
					$unwind: "$owner",
				},
				{
					$limit: 20,
				},
			])
			.toArray();

		return res.json({ user, posts: data });
	} catch (err) {
		return res.sendStatus(500);
	}
});

router.put("/follow/:id", auth, async (req, res) => {
	const targetUserId = req.params.id;
	const authUserId = res.locals.user._id;

	const targetUser = await db.collection("users").findOne({
		_id: new ObjectId(targetUserId),
	});

	const authUser = await db.collection("users").findOne({
		_id: new ObjectId(authUserId),
	});

	targetUser.followers = targetUser.followers || [];
	authUser.following = authUser.following || [];

	targetUser.followers.push(new ObjectId(authUserId));
	authUser.following.push(new ObjectId(targetUserId));

	try {
		await db.collection("users").updateOne(
			{ _id: new ObjectId(targetUserId) },
			{
				$set: { followers: targetUser.followers },
			}
		);

		await db.collection("users").updateOne(
			{ _id: new ObjectId(authUserId) },
			{
				$set: { following: authUser.following },
			}
		);

		return res.json({
			followers: targetUser.followers,
			following: authUser.following,
		});
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}
});

router.put("/unfollow/:id", auth, async (req, res) => {
	const targetUserId = req.params.id;
	const authUserId = res.locals.user._id;

	const targetUser = await db.collection("users").findOne({
		_id: new ObjectId(targetUserId),
	});

	const authUser = await db.collection("users").findOne({
		_id: new ObjectId(authUserId),
	});

	targetUser.followers = targetUser.followers || [];
	authUser.following = authUser.following || [];

	targetUser.followers = targetUser.followers.filter(
		userId => userId.toString() !== authUserId
	);

	authUser.following = authUser.following.filter(
		userId => userId.toString() !== targetUserId
	);

	try {
		await db.collection("users").updateOne(
			{ _id: new ObjectId(targetUserId) },
			{
				$set: { followers: targetUser.followers },
			}
		);

		await db.collection("users").updateOne(
			{ _id: new ObjectId(authUserId) },
			{
				$set: { following: authUser.following },
			}
		);

		return res.json({
			followers: targetUser.followers,
			following: authUser.following,
		});
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}
});

router.get("/profile/search", async (req, res) => {
	let { q } = req.query;

	try {
		let result = await db.collection("users")
			.aggregate([
				{
					$match: {
						name: new RegExp(`.*${q}.*`, "i"),
					},
				},
				{
					$sort: { name: 1 },
				},
				{
					$limit: 5,
				},
			])
			.toArray();

		if (result) {
			return res.json(result);
		}
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}

	return res.status(404).json({ msg: "user not found" });
});

router.post("/photo/:id", upload.single("photo"), async (req, res) => {
	const id = req.params.id;
	const fileName = req.file.filename;

	try {
		await db.collection("users").updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: { photo: fileName },
			}
		);
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}

	return res.json({ msg: "Photo updated" });
});

router.post("/cover/:id", upload.single("cover"), async (req, res) => {
	const id = req.params.id;
	const fileName = req.file.filename;

	try {
		await db.collection("users").updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: { cover: fileName },
			}
		);
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}

	return res.json({ msg: "Cover updated" });
});

module.exports = { usersRouter: router, auth };
