const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// middeware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8mz1ydx.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const modelsCollection = client.db("model-db").collection("models");

    // models api
    app.get("/models", async (req, res) => {
      try {
        const result = await modelsCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Server Error", error });
      }
    });

    app.get("/models/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const queary = { _id: new ObjectId(id) };
        const result = await modelsCollection.findOne(queary);
        res.status(200).send({
          message: "Models single data fetched successfully",
          data: result,
        });
      } catch (error) {
        res.status(500).send({ message: "Server Error", error });
      }
    });

    app.post("/models", async (req, res) => {
      try {
        const newModels = req.body;
        const result = await modelsCollection.insertOne(newModels);
        res.status(201).send({
          message: "Models  data create successfully",
          data: result,
        });
      } catch (error) {
        res.status(500).send({ message: "Server Error", error });
      }
    });

    app.put("/models/:id", async (req, res) => {
      const id = req.params.id;
      const queary = { _id: new ObjectId(id) };
      console.log(req.body);
      const name = req.body.name;
      const category = req.body.category;
      const description = req.body.description;
      const thumbnail = req.body.thumbnail;
      const updateDoc = {
        $set: {
          name,
          category,
          description,
          thumbnail,
        },
      };
      const result = await modelsCollection.updateOne(queary, updateDoc);
      res.send(result);
      console.log(result);
    });

    app.delete("/models/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const queary = { _id: new ObjectId(id) };
        const result = await modelsCollection.deleteOne(queary);
        res.status(201).send({
          message: "Models  data Deleted successfully",
          data: result,
        });
      } catch (error) {
        res.status(500).send({ message: "Server Error", error });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close()
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server is running port : ${port}`);
});
