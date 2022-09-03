const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []); // if it is undefined
});

app.post("/posts/:id/comments", async (req, res) => {
  const { content } = req.body;
  const commmentId = randomBytes(4).toString("hex");
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commmentId, content });

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commmentId,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log("received event", event);
  res.send({});
});

app.listen(4001, () => {
  console.log("server is listening on port 4001 ");
});
