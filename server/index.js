const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const admin = require("firebase-admin");
const app = express();
const port = process.env.PORT || 3000;

// middeware
app.use(express.json());
app.use(cors());

// firebase admin sdk
const serviceAccount = require("./firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "unauthorized access token" });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "unauthorized access token" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    // console.log(decoded);
    next();
  } catch (error) {
    res.status(401).send({ message: "unauthorized access token" });
  }
};

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
    // await client.connect();
    const modelsCollection = client.db("model-db").collection("models");
    const downloadsCollention = client.db("model-db").collection("download");

    // models api
    app.get("/models", async (req, res) => {
      try {
        const result = await modelsCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Server Error", error });
      }
    });

    app.get("/models/:id", verifyToken, async (req, res) => {
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
      const query = { _id: new ObjectId(id) };
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
      const result = await modelsCollection.updateOne(query, updateDoc);
      res.send(result);
      console.log(result);
    });

    app.delete("/models/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const queary = { _id: new ObjectId(id) };
        const result = await modelsCollection.deleteOne(queary);
        res.status(200).send({
          message: "Models  data Deleted successfully",
          data: result,
        });
      } catch (error) {
        res.status(500).send({ message: "Server Error", error });
      }
    });

    app.get("/latest-models", async (req, res) => {
      const result = await modelsCollection
        .find()
        .sort({ created_at: "desc" })
        .limit(6)
        .toArray();
      res.send(result);
    });

    app.get("/my-models", verifyToken, async (req, res) => {
      const email = req.query.email;
      const result = await modelsCollection
        .find({ created_by: email })
        .toArray();
      res.send(result);
    });

    app.post("/downloads/:id", async (req, res) => {
      const newDownloads = req.body;
      const id = req.params.id;
      const result = await downloadsCollention.insertOne(newDownloads);
      const filter = { _id: new ObjectId(id) };
      const update = {
        $set: {
          downloads: 1,
        },
      };
      const downloadCount = await modelsCollection.updateOne(filter, update);
      res.send({ result, downloadCount });
    });

    app.get("/downloads", verifyToken, async (req, res) => {
      const email = req.query.email;
      const downloaded_by = req.query.downloaded_by;

      const result = await downloadsCollention
        .find({ downloaded_by: email })
        .toArray();
      res.send(result);
    });
    app.get("/search", async (req, res) => {
      const search_text = req.query.search;
      const result = await modelsCollection
        .find({ name: { $regex: search_text, $options: "i" } })
        .toArray();
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
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
