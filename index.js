const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    const regularCollection = client.db('toyazoneDB').collection('regularcar')
    const sportsCollection = client.db('toyazoneDB').collection('sportscar')
    const policeCollection = client.db('toyazoneDB').collection('policecar')

    // regular car: get data from mongo to server
    app.get('/regular', async (req, res) => {
      const result = await regularCollection.find().toArray();
      res.send(result);
    })

    // regular car: view Detail
    app.get('/regular/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = {
        projection: { img: 1, name: 1, price: 1, rating: 1, description: 1 }
      };
      const result = await regularCollection.findOne(query, options)
      res.send(result)
    })

    // sports car: get data from mongo to server
    app.get('/sports', async (req, res) => {
      const result = await sportsCollection.find().toArray();
      res.send(result);
    })

    // sports car: view Detail
    app.get('/sports/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = {
        projection: { img: 1, name: 1, price: 1, rating: 1, description: 1 }
      };
      const result = await sportsCollection.findOne(query, options)
      res.send(result)
    })

    // police car: get data from mongo to server
    app.get('/police', async (req, res) => {
      const result = await policeCollection.find().toArray();
      res.send(result);
    })

    // police car: view Detail
    app.get('/police/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = {
        projection: { img: 1, name: 1, price: 1, rating: 1, description: 1 }
      };
      const result = await policeCollection.findOne(query, options)
      res.send(result)
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