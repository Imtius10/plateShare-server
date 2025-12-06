const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000;
//3XgKqB0k1J61YdkI
//plateShareAdmin

const uri = "mongodb+srv://plateShareAdmin:3XgKqB0k1J61YdkI@cluster0.p9dmq2f.mongodb.net/?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const db = client.db('plateShare');
        const foodCollection = db.collection('foods');
        const userCollection = db.collection('user');

        app.get('/foods', async (req, res) => {
            const cursor = foodCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/foods', async (req, res) => {
            const newProdcut = req.body;
            const result = await foodCollection.insertOne(newProdcut);
            res.send(result);
        })

        app.get('/foods/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await foodCollection.findOne(query)
            res.send(result)
        })


        app.delete('/foods/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await foodCollection.deleteOne(query)
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
       // await client.close();
    }
}
run().catch(console.dir);

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})