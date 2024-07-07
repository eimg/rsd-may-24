require("dotenv").config();

const express = require("express");
const router = express.Router();

const { MongoClient, ObjectId } = require("mongodb");

const mongo = new MongoClient(process.env.MONGO);
const db = mongo.db("x");

const { auth } = require("./users");
const { clients } = require("./ws");

router.get("/", async (req, res) => {
	const posts = await db
		.collection("posts")
		.aggregate([
			{
				$match: {
					type: "post",
				},
			},
			{
				$sort: {
					created: -1,
				},
			},
			{
				$limit: 10,
			},
			{
				$lookup: {
					from: "posts",
					localField: "_id",
					foreignField: "origin",
					as: "comments",
					pipeline: [
						{
							$lookup: {
								from: "users",
								localField: "owner",
								foreignField: "_id",
								as: "owner",
							},
						},
						{
							$unwind: "$owner",
						},
					],
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "owner",
					foreignField: "_id",
					as: "owner",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "likes",
					foreignField: "_id",
					as: "likes",
				},
			},
			{
				$unwind: "$owner",
			},
		])
		.toArray();
	return res.json(posts);
});

router.get("/followed", auth, async (req, res) => {
	const user = res.locals.user;

	const followed = user.following.map(id => {
		return new ObjectId(id);
	});

	const posts = await db
		.collection("posts")
		.aggregate([
			{
				$match: {
					type: "post",
				},
			},
			{
				$match: {
					owner: {
						$in: followed,
					},
				},
			},
			{
				$sort: {
					created: -1,
				},
			},
			{
				$limit: 10,
			},
			{
				$lookup: {
					from: "posts",
					localField: "_id",
					foreignField: "origin",
					as: "comments",
					pipeline: [
						{
							$lookup: {
								from: "users",
								localField: "owner",
								foreignField: "_id",
								as: "owner",
							},
						},
						{
							$unwind: "$owner",
						},
					],
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "owner",
					foreignField: "_id",
					as: "owner",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "likes",
					foreignField: "_id",
					as: "likes",
				},
			},
			{
				$unwind: "$owner",
			},
		])
		.toArray();
	return res.json(posts);
});

router.put("/like/:id", auth, async (req, res) => {
	const { id } = req.params;
	const user = res.locals.user;

	const post = await db
		.collection("posts")
		.findOne({ _id: new ObjectId(id) });

	const likes = [...post.likes, new ObjectId(user._id)];

	const update = await db.collection("posts").updateOne(
		{ _id: new ObjectId(id) },
		{
			$set: { likes },
		}
	);

	await db.collection("notis").insertOne({
		type: "like",
		actor: new ObjectId(user._id),
		msg: `likes your post.`,
		target: post._id,
		owner: post.owner,
		read: false,
		created: new Date(),
	});

	const notiCount = await db
		.collection("notis")
		.find({
			owner: post.owner,
		})
		.toArray();

	clients.map(client => {
		if (client._id == post.owner.toString()) {
			client.send(
				JSON.stringify({ type: "notis", count: notiCount.length })
			);
			console.log(`noti count sent to ${post.owner.toString()}`);
		}
	});

	return res.json(update);
});

router.put("/unlike/:id", auth, async (req, res) => {
	const { id } = req.params;
	const user = res.locals.user;

	const post = await db
		.collection("posts")
		.findOne({ _id: new ObjectId(id) });

	const likes = post.likes.filter(like => {
		return like.toString() !== user._id;
	});

	const update = await db.collection("posts").updateOne(
		{ _id: new ObjectId(id) },
		{
			$set: { likes },
		}
	);

	return res.json(update);
});

router.post("/", auth, async function (req, res) {
	const { user } = res.locals;
	const { body } = req.body;

	const post = {
		type: "post",
		body,
		owner: new ObjectId(user._id),
		created: new Date(),
		likes: [],
	};

	const result = await db.collection("posts").insertOne(post);
	const resultPost = await getPost(result.insertedId);

    // clients.map(client => {
	// 	client.send(JSON.stringify({ type: "post", post: resultPost }));
	// });

	res.status(201).json(resultPost);
});

router.post("/comment/:origin", auth, async function (req, res) {
	const { user } = res.locals;
	const { body } = req.body;
	const { origin } = req.params;

	const comment = {
		type: "comment",
		origin: new ObjectId(origin),
		body,
		owner: new ObjectId(user._id),
		created: new Date(),
		likes: [],
	};

	const result = await db.collection("posts").insertOne(comment);
	const data = await getPost(result.insertedId);

	const originPost = await db
		.collection("posts")
		.findOne({ _id: new ObjectId(origin) });

	await db.collection("notis").insertOne({
		type: "comment",
		actor: new ObjectId(user._id),
		msg: `comment your post.`,
		target: new ObjectId(origin),
		owner: originPost.owner,
		read: false,
		created: new Date(),
	});

	res.status(201).json(data);
});

router.get("/:id", async function (req, res) {
	const { id } = req.params;
	const post = await getPost(id);
	if (post) {
		res.json(post);
	} else {
		res.sendStatus(500);
	}
});

async function getPost(id) {
	try {
		const data = await db
			.collection("posts")
			.aggregate([
				{
					$match: { _id: new ObjectId(id) },
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
						from: "users",
						localField: "likes",
						foreignField: "_id",
						as: "likes",
					},
				},
				{
					$lookup: {
						localField: "_id",
						from: "posts",
						foreignField: "origin",
						as: "comments",
						pipeline: [
							{
								$lookup: {
									from: "users",
									localField: "owner",
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
								$lookup: {
									from: "users",
									localField: "likes",
									foreignField: "_id",
									as: "likes",
								},
							},
							{
								$unwind: "$owner",
							},
						],
					},
				},
				{
					$unwind: "$owner",
				},
			])
			.toArray();

		return data[0];
	} catch (err) {
		return false;
	}
}

module.exports = { postsRouter: router };
