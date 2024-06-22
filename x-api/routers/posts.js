require("dotenv").config();

const express = require("express");
const router = express.Router();

const { MongoClient, ObjectId } = require("mongodb");

const mongo = new MongoClient(process.env.MONGO);
const db = mongo.db("x");

const { auth } = require("./users");

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
            $set: { likes }
        }
    );

    return res.json(update);
});

module.exports = { postsRouter: router };
