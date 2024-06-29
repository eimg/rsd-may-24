const express = require("express");
const app = express();

const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient("mongodb://localhost");
const db = client.db("todo");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require("cors");
app.use(cors());

app.get("/tasks", async (req, res) => {
	const data = await db.collection("tasks").find().toArray();

	setTimeout(() => {
        res.json(data);
    }, 2000);
});

app.get("/tasks/:id", async (req, res) => {
	const { id } = req.params;

	const data = await db
		.collection("tasks")
		.findOne({ _id: new ObjectId(id) });

	return res.json(data);
});

app.post("/tasks", async (req, res) => {
	const { name } = req.body;
	if (!name) return res.status(400).json({ msg: "name required" });

	const result = await db.collection("tasks").insertOne({
		name,
		done: false,
	});

	return res.json({ _id: result.insertedId, name, done: false });
});

app.put("/tasks/:id", async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	if (!name) return res.status(400).json({ msg: "name required" });

	try {
		const result = await db
			.collection("tasks")
			.updateOne({ _id: new ObjectId(id) }, { $set: { name } });

		return res.json(result);
	} catch (e) {
		return res.sendStatus(500);
	}
});

app.put("/tasks/:id/toggle", async (req, res) => {
	const { id } = req.params;

	const data = await db
		.collection("tasks")
		.findOne({ _id: new ObjectId(id) });

	const result = await db.collection("tasks").updateOne(
		{ _id: new ObjectId(id) },
		{
			$set: { done: !data.done },
		}
	);

	return res.json(result);
});

app.delete("/tasks/:id", async (req, res) => {
	const { id } = req.params;
	const result = await db
		.collection("tasks")
		.deleteOne({ _id: new ObjectId(id) });

	return res.json(result);
});

app.listen(8888, () => {
	console.log("Todo API running at 8888");
});
