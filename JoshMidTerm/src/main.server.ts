export { AppServerModule as default } from './app/app.module.server';
/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://17398978:q4w4s3x0gX2kaadx@midtermhalat.odiccis.mongodb.net/?retryWrites=true&w=majority&appName=MidtermHalat";

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);*/
