const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");
  posts[id] = {
    id, // why id here
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log("received event", event);
  res.send({});
});

app.listen(4000, () => {
  console.log("once more")
  console.log("This is the change thhat i am doing version 2.0");
  console.log("started on port 4000");
});
