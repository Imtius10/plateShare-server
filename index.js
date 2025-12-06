const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

const uri = "mongodb+srv://plateShareAdmin:3XgKqB0k1J61YdkI@cluster0.p9dmq2f.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.use(cors());
app.use(express.json());

async function run() {
    try {
        await client.connect();
        const db = client.db('plateShare');
        const foodCollection = db.collection('foods');
        const userCollection = db.collection('user');
        const requestsCollection = db.collection('foodRequests'); // <--- FIXED

        // ------------------ FOOD ------------------
        app.get('/foods', async (req, res) => {
            const result = await foodCollection.find().toArray();
            res.send(result);
        });

        app.get('/foods/:id', async (req, res) => {
            const id = req.params.id;
            const result = await foodCollection.findOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        app.post('/foods', async (req, res) => {
            const newFood = req.body;
            const result = await foodCollection.insertOne(newFood);
            res.send(result);
        });

        app.delete('/foods/:id', async (req, res) => {
            const id = req.params.id;
            const result = await foodCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        app.patch('/foods/:id', async (req, res) => {
            const id = req.params.id;
            const update = req.body;
            const result = await foodCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: update }
            );
            res.send(result);
        });

        // ------------------ FOOD REQUESTS ------------------
        app.post("/food-requests", async (req, res) => {
            const request = req.body;
            const result = await requestsCollection.insertOne(request);
            res.send(result);
        });

        app.get("/requests", async (req, res) => {
            const foodId = req.query.foodId;
            const requests = await requestsCollection
                .find({ foodId })
                .toArray();
            res.send(requests);
        });

        app.patch("/food-requests/:id", async (req, res) => {
            const id = req.params.id;
            const update = req.body;
            const result = await requestsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: update }
            );
            res.send(result);
        });

        console.log("MongoDB connected, server running...");
    } finally {
        // Do not close the client
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
