// TEST MONGODB CODE
const { MongoClient, ServerApiVersion } = require('mongodb');
const username = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASS;

const uri = `mongodb+srv://${username}:${password}@listbuddy-test.aj5m5.mongodb.net/?retryWrites=true&w=majority&appName=ListBuddy-Test`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    tls: true,
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    }
});

async function run() {
  try {
    await client.connect();
    const db = client.db("sample_mflix");
    const movies = await db
        .collection("movies")
        .find({})
        .sort({ metacritic: -1 })
        .limit(10)
        .toArray();
      console.log(movies);
  } catch (e) {
      console.error(e);
  }
  finally {
    await client.close();
  }
  // try {
  //   // Connect the client to the server	(optional starting in v4.7)
  //   // console.log(client);
  //   await client.connect();
  //   // Send a ping to confirm a successful connection
  //   await client.db("admin").command({ ping: 1 });
  //   console.log("Pinged your deployment. You successfully connected to MongoDB!");
  // } finally {
  //   // Ensures that the client will close when you finish/error
  //   await client.close();
  // }
}
run().catch(console.dir);