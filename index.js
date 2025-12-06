const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p9dmq2f.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

app.use(cors());
app.use(express.json());

async function run() {
    try {
        await client.connect();
        const db = client.db("plateShare");
        const foodCollection = db.collection("foods");
        const requestCollection = db.collection("foodRequests");

        // ------------------ FOODS ------------------
        app.get("/foods", async (req, res) => {
            const email = req.query.donator_email;
            const foods = email
                ? await foodCollection.find({ donator_email: email }).toArray()
                : await foodCollection.find().toArray();
            res.send(foods);
        });

        app.get("/foods/:id", async (req, res) => {
            const id = req.params.id;
            const food = await foodCollection.findOne({ _id: new ObjectId(id) });
            res.send(food);
        });

        app.post("/foods", async (req, res) => {
            const food = req.body;
            const result = await foodCollection.insertOne(food);
            res.send(result);
        });

        app.patch("/foods/:id", async (req, res) => {
            const id = req.params.id;
            const update = req.body;
            const result = await foodCollection.updateOne({ _id: new ObjectId(id) }, { $set: update });
            res.send(result);
        });

        app.delete("/foods/:id", async (req, res) => {
            const id = req.params.id;
            const result = await foodCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        // ------------------ FOOD REQUESTS ------------------
        app.post("/food-requests", async (req, res) => {
            const request = req.body;
            request.foodId = request.foodId.toString();
            request.createdAt = new Date();
            const result = await requestCollection.insertOne(request);
            res.send({ insertedId: result.insertedId }); 
        });


        app.get("/my-requests", async (req, res) => {
            const email = req.query.userEmail;
            if (!email) return res.send([]);
            const requests = await requestCollection.find({ requester_email: email }).toArray();
            res.send(requests);
        });

        app.get("/requests/food/:foodId", async (req, res) => {
            const foodId = req.params.foodId;
            const requests = await requestCollection.find({ foodId }).toArray();
            res.send(requests);
        });

        app.patch("/requests/:id", async (req, res) => {
            const id = req.params.id;
            const { status } = req.body;
            const result = await requestCollection.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
            res.send(result);
        });

        console.log("MongoDB Connected + API Running");
    } finally {
        // Keep connection alive
    }
}

run().catch(console.dir);

app.get("/", (req, res) => res.send("Server is running"));
app.listen(port, () => console.log(`Server running on port ${port}`));
