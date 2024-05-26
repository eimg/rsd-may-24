const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient("mongodb://localhost");

const tasks = client.db("todo").collection("tasks");

async function getTasks() {
    const data = await tasks.find().toArray();
    console.log( data );
}

// getTasks();

async function insertTask(name) {
    const result = await tasks.insertOne({
        name,
        done: true,
    });

    console.log(result);
    process.exit(0);
}

insertTask('Learn mongodb');
