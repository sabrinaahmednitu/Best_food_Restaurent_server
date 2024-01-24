const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fkjuk.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const restaurantCollection = client.db('best_food_restaurent').collection('food_itemData');
    const foodOrderCollection = client.db('best_food_restaurent').collection('food_order');

    // users get data client site
    app.get('/users', async (req, res) => {
      const query = restaurantCollection.find();
      const result = await query.toArray();
      res.send(result);
    });

    app.get('/product', async (req, res) => {
      const query = restaurantCollection.find();
      const result = await query.toArray();
      res.send(result);
    });

    //fetch all data here
    app.get('/product/:id([0-9a-fA-F]{24})', async (req, res) => {
      // console.log(req.params.id);
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }; // Convert the id to ObjectId
      const result = await restaurantCollection.findOne(query);
      res.send(result);
    });

    //post orderd data
    app.post('/foodOrder', async (req, res) => {
      const order = req.body;
      const result = await foodOrderCollection.insertOne(order);
      res.send(result);
    });

    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send(
    '<h1 style="font-size:40; margin:20% auto; text-align:center;">Best Food Restaurent</h1>'
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// hello world
