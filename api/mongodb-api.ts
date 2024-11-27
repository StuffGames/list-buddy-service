// TEST MONGODB CODE
const { MongoClient, ServerApiVersion } = require('mongodb');
const username = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASS;

const CLIENT = process.env.MONGO_DB_CLIENT;
const COLLECTION = process.env.MONGO_DB_COLLECTION;

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
    const db = client.db(CLIENT);
    const user_col = db.collection(COLLECTION);
    const task_col = db.collection("Task-Collection-test");
    
    const user = await user_col.findOne({"username": "userName1"});
    const task_ids = user.tasks;
    const task = await task_col.findOne({"_id": task_ids[0]});
    console.log(task);
  } catch (e) {
      console.error(e);
  }
  finally {
    await client.close();
  }
}
// async function run() {
//   try {
//     await client.connect();
//     const db = client.db(CLIENT);
//     const users = await db
//         .collection(COLLECTION)
//         .find({})
//         .toArray();
//       console.log(users);
//   } catch (e) {
//       console.error(e);
//   }
//   finally {
//     await client.close();
//   }
// }
run().catch(console.dir);