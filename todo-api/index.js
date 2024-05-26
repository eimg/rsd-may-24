const express = require("express");
const app = express();

const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient("mongodb://localhost");
const db = client.db("todo");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/tasks", async (req, res) => {
	const data = await db.collection("tasks").find().toArray();

	return res.json(data);
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
    if(!name) return res.status(400).json({ msg: 'name required' });

    const result = await db.collection("tasks").insertOne({
        name, done: false
    });

    return res.json({ _id: result.insertedId, name, done: false });
});

app.listen(8888, () => {
    console.log("Todo API running at 8888");
});
