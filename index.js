const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config() // .env
const port = process.env.PORT || 3000;

// midleware
app.use(cors());
app.use(express.json());

// mongo cobnect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vgnfmcl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const run = async () => {
  try {
    await client.connect();

    const carsCollection = client.db('toyazoneDB').collection('regularcar')

    // get data from mongo to server
    app.get('/regular', async (req, res) => {
      const result = await carsCollection.find().toArray();
      res.send(result);
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Toyazone successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Toyazone Server is Running...');
})

app.listen(port, () => {
  console.log(`Toyazone Server is Running on Port: ${port}`);
})