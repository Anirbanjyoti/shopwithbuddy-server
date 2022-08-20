const express = require("express");
const cors = require("cors");
// const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jia3zq5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// DB_user = shop_with_buddy
// DB_PASS = rJuJyaWIzQYwSKwq
async function run() {
    try {
        await client.connect();
        const shopCollection = client.db("shopwithbuddy").collection("products");

       // Get all products in your website
       app.get("/product", async (req, res) => {
        const products = await shopCollection.find().toArray();
        res.send(products);
      });     

} finally {
    // await client.close();
  }
}

run().catch(console.dir);
// api declare
app.get("/", (req, res) => {
  res.send("Shop with Buddy Server");
});
app.get("/hero", (req, res) => {
  res.send("Shop with Buddy Server is Running on Herokou");
});

// Listening port
app.listen(port, () => {
  console.log(`Listening to port`, port);
});