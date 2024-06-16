require("dotenv").config();

const express = require("express");
const router = express.Router();

const { MongoClient, ObjectId } = require("mongodb");

const mongo = new MongoClient(process.env.MONGO);
const db = mongo.db("x");

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

module.exports = { postsRouter: router };
