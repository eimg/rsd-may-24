require("dotenv").config();

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO);

const db = mongo.db("x");

const { auth } = require("./users");

router.get("/", auth, async (req, res) => {
	const user = res.locals.user;

	try {
		let notis = await db.collection("notis")
			.aggregate([
				{
					$match: { owner: new ObjectId(user._id) },
				},
				{
					$sort: { _id: -1 },
				},
				{
					$limit: 40,
				},
				{
					$lookup: {
						from: "users",
						localField: "actor",
						foreignField: "_id",
						as: "user",
					},
				},
                {
                    $unwind: "$user",
                }
			])
			.toArray();

		return res.json(notis);
	} catch (e) {
		return res.status(500).json({ error: e.message });
	}
});

router.post("/", auth, async (req, res) => {
	const user = res.locals.user;
	const { type, target } = req.body;

	let post = await db.collection("posts").findOne({
		_id: new ObjectId(target),
	});

	let result = await db.collection("notis").insertOne({
		type,
		actor: new ObjectId(user._id),
		msg: `${type}s your post.`,
		target: new ObjectId(target),
		owner: post.owner,
		read: false,
		created: new Date(),
	});

	let noti = await db.collection("notis").findOne({
		_id: result.insertedId,
	});

	return res.status(201).json(noti);
});

router.put("/", auth, async (req, res) => {
	const user = res.locals.user;

	await db.collection("notis").updateMany(
		{ owner: new ObjectId(user._id) },
		{
			$set: { read: true },
		}
	);

	return res.json({ msg: "all notis marked read" });
});

router.put("/:id", auth, async (req, res) => {
	const id = req.params.id;

	db.collection("notis").updateOne(
		{ _id: new ObjectId(id) },
		{
			$set: { read: true },
		}
	);

	return res.json({ msg: "noti marked read" });
});

module.exports = { notiRouter: router };
